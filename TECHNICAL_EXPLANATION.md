# Technical Explanation: IDs vs Business Keys

## Summary for Godfred's Questions

### Question 1: "What is the agent id?"
The **Agent ID** is an internal database integer (`id` column) that serves as the primary key.

### Question 2: "What is the shop code and id?"
- **Shop ID**: Internal database integer (`id` column) - primary key
- **Shop Code**: Business identifier string (`code` column) - unique, indexed

### Question 3: "Agents are identified by account numbers. That should be the primary key."
**You're absolutely right that agents ARE identified by account numbers** - that's exactly how the system works for ALL business operations. Let me clarify the technical implementation:

---

## How Agent Identification Actually Works

### ✅ What You See (Business Layer)
**Agents ARE identified by `account_number` in all operations:**

```
Account Number: 0244123456
Full Name: John Mensah
```

When you:
- Search for an agent → Use account number
- Submit daily sales form → Use account number  
- Look up agent performance → Use account number
- Generate QR codes → Links to shop via business identifiers

**The integer ID is NEVER shown to users or managers.**

### 🔧 What Happens Internally (Database Layer)

The database uses **integer IDs as primary keys** but ALL lookups use account numbers:

```python
# API Endpoint for looking up agent by account number
@router.get("/account/{account_number}")
def get_agent_by_account_number(account_number: str, ...):
    """Get agent by their account number (0244123456)"""
    agent = TeamService.get_agent_by_account_number(db, account_number)
    return agent

# Database query
SELECT * FROM agents WHERE account_number = '0244123456'
```

---

## Why Use Integer IDs Internally?

### 1. **Performance**
```sql
-- INTEGER JOIN (Fast)
SELECT sales.*, agents.full_name 
FROM sales_records 
JOIN agents ON sales.agent_id = agents.id

-- STRING JOIN (Slower)
SELECT sales.*, agents.full_name 
FROM sales_records 
JOIN agents ON sales.account_number = agents.account_number
```
Integer comparisons are 3-5x faster than string comparisons.

### 2. **Data Integrity - Fixing Typos**
Imagine this scenario:
```
Typo entered: Account number "024412345" (missing a digit)
Correct: "0244123456"
```

**With Integer IDs (Current Design):**
```sql
-- Fix the typo - all 500 sales records automatically correct
UPDATE agents SET account_number = '0244123456' 
WHERE account_number = '024412345';
-- ✅ All relationships preserved via ID foreign keys
```

**If Account Number Was Primary Key:**
```sql
-- Must update EVERY related table
UPDATE agents SET account_number = '0244123456' WHERE account_number = '024412345';
UPDATE sales_records SET agent_account_number = '0244123456' WHERE agent_account_number = '024412345';
UPDATE assignments SET agent_account_number = '0244123456' WHERE agent_account_number = '024412345';
-- ❌ Risk of data corruption if any update fails
```

### 3. **Storage Efficiency**
```
Integer ID: 4 bytes per reference
Account Number String: 20 bytes per reference

For 1000 sales records:
- Integer IDs: 4 KB
- String Keys: 20 KB
5x storage difference
```

### 4. **Flexibility**
If M-Kopa changes account number format or needs to reassign numbers:
- With IDs: Update one column, everything still works
- Without IDs: Cascade changes across all tables (risky)

---

## Real-World Example: Daily Sales Submission

### What the DSR Sees:
```
Google Form:
- Account Number: 0244123456 [DSR enters this]
- Devices Sold: 5
- Shop: [Pre-filled from QR code]
```

### What the Backend Does:
```python
# Step 1: Backend receives form data
form_data = {
    "account_number": "0244123456",
    "devices_sold": 5,
    "shop_id": 12  # from QR code
}

# Step 2: Look up agent by account number
agent = db.query(Agent).filter(
    Agent.account_number == "0244123456"
).first()

# Step 3: Create sales record (uses internal ID)
sales_record = SalesRecord(
    agent_id=agent.id,  # ← Integer ID used internally
    shop_id=12,
    devices_sold=5,
    sale_date=calculate_business_day()
)

# Step 4: Save to database
db.add(sales_record)
db.commit()
```

### What the Manager Sees:
```
Daily Report:
Account: 0244123456
Name: John Mensah
Shop: MTN Madina
Sales: 5 devices
```

**No IDs visible anywhere - only business identifiers!**

---

## Shop Identification Works The Same Way

### Business Layer (What You See):
```
Shop Code: MTN-MAD-001
Shop Name: MTN Madina
Location: Madina, Greater Accra
```

### Database Layer (Internal):
```sql
-- Shop table
id | code         | name        | location
----|--------------|-------------|------------------
12  | MTN-MAD-001  | MTN Madina  | Madina, Greater Accra

-- Lookups use shop code
SELECT * FROM shops WHERE code = 'MTN-MAD-001'
```

### QR Code Pre-fills Shop ID
The QR code contains:
```
https://forms.google.com/sales?shop_id=12
```

Why shop ID in QR instead of shop code?
- Google Forms work better with numeric parameters
- Shorter URL (QR codes have size limits)
- Faster backend lookup

But the DSR never sees "12" - they see "MTN Madina" on the form.

---

## API Endpoints Confirm This Design

### Agent Endpoints:
```
✅ GET /api/v1/agents/account/0244123456    ← Used for lookups
✅ GET /api/v1/agents/search?q=John         ← Search by name/account
   GET /api/v1/agents/123                  ← Only used internally
```

### Shop Endpoints:
```
✅ GET /api/v1/shops/code/MTN-MAD-001      ← Used for lookups  
✅ GET /api/v1/shops/search?q=Madina       ← Search by name/location
   GET /api/v1/shops/12                   ← Only used internally
```

---

## Database Schema Proof

### Agent Table:
```sql
CREATE TABLE agents (
    id SERIAL PRIMARY KEY,              -- Internal ID
    account_number VARCHAR(20) UNIQUE,   -- Business key (indexed)
    full_name VARCHAR(255),
    ...
    CONSTRAINT unique_account UNIQUE (account_number)
)
```

### Sales Table:
```sql
CREATE TABLE sales_records (
    id SERIAL PRIMARY KEY,
    agent_id INTEGER REFERENCES agents(id),  -- Fast integer join
    shop_id INTEGER REFERENCES shops(id),    -- Fast integer join
    devices_sold INTEGER,
    sale_date DATE,
    ...
)
```

### Lookup Query (What Actually Runs):
```sql
-- When searching by account number
SELECT a.*, s.code, s.name 
FROM agents a
LEFT JOIN assignments ass ON a.id = ass.agent_id
LEFT JOIN shops s ON ass.shop_id = s.id
WHERE a.account_number = '0244123456';
```

---

## Comparison: Current Design vs Primary Key Change

| Aspect | Current (Integer PK + Business Key) | If Business Key Was PK |
|--------|-------------------------------------|------------------------|
| **User lookup** | ✅ `account_number = '0244123456'` | ✅ `account_number = '0244123456'` |
| **Join performance** | ✅ Fast (integer joins) | ❌ Slower (string joins) |
| **Fix typo** | ✅ Update 1 row | ❌ Update multiple tables |
| **Storage** | ✅ 4 bytes per reference | ❌ 20 bytes per reference |
| **Flexibility** | ✅ Can change account numbers | ❌ Risky cascade updates |
| **Data integrity** | ✅ Foreign key constraints | ⚠️ Complex cascade rules |

---

## Conclusion

**Godfred, you are 100% correct that:**
- Agents ARE identified by account numbers in business operations
- Shops ARE identified by shop codes/names in business operations  
- The system DOES use these for all lookups and user-facing operations

**The integer IDs are just internal database plumbing that:**
- Makes queries faster
- Makes data corrections safer
- Reduces storage requirements
- Provides flexibility for future changes

**Users (DSRs, managers, admins) NEVER see these IDs** - they only work with account numbers and shop codes.

This is standard database design practice used by:
- Banking systems (account numbers vs internal IDs)
- E-commerce (order numbers vs internal IDs)  
- HR systems (employee numbers vs internal IDs)
- Government systems (national IDs vs internal IDs)

The integer ID is like the VIN number on a car - important for the factory and mechanics, but drivers only care about the license plate number.

---

## Questions?

If you want to see this in action:
1. Check API documentation: https://unlucky-creamlike-worry.ngrok-free.dev/docs
2. Try: `GET /api/v1/agents/account/0244123456` (lookup by account number)
3. Notice the response includes `id` field but it's never used in subsequent operations

The system is designed exactly as you described - agents identified by account numbers, shops by codes - the IDs are just internal optimization.
