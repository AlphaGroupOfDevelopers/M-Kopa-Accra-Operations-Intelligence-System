# Schema Updates Summary

**Date:** June 25, 2026  
**Status:** ✅ Models Updated (Migration Pending)

---

## Changes Made

### 1. **Agent/DSR Model** (`app/models/agent.py`)

**Removed:**
- ❌ `employee_id` → Replaced with `account_number`
- ❌ `first_name` → Replaced with `full_name`
- ❌ `last_name` → Replaced with `full_name`
- ❌ `phone` → Merged into `account_number`
- ❌ `national_id` → Removed completely

**Added:**
- ✅ `account_number` (String 20) - Serves as unique identifier AND primary phone
- ✅ `full_name` (String 255) - Single name field
- ✅ `secondary_number` (String 20) - Alternative contact

**Modified:**
- ✅ `employment_status` - Now has `server_default="active"`

---

### 2. **Shop Model** (`app/models/shop.py`)

**Removed:**
- ❌ `latitude` - GPS coordinate removed
- ❌ `longitude` - GPS coordinate removed

**Modified:**
- ✅ `is_active` - Now has `server_default="true"`

---

### 3. **Assignment Model** (`app/models/assignment.py`)

**Added:**
- ✅ `team_name` (String 100) - Team assignment tracking

**Existing:**
- ✅ `role` - Kept for "Main DSR" vs "Supporting DSR"

---

### 4. **Agent Schemas** (`app/schemas/agent.py`)

**Updated all schemas to match new model:**
- AgentBase: Uses `account_number`, `full_name`, `secondary_number`
- AgentCreate: Updated fields
- AgentUpdate: Updated fields
- AgentRead: Removed computed `full_name` property (now a direct field)
- AgentListItem: Updated to show `account_number` instead of `employee_id`

---

### 5. **Team Service** (`app/services/team_service.py`)

**Method Changes:**
- ✅ `get_agent_by_employee_id()` → `get_agent_by_account_number()`
- ✅ `create_agent()` - Now checks `account_number` for duplicates
- ✅ `search_agents()` - Now searches by `full_name` and `account_number`

---

### 6. **API Endpoints** (`app/api/v1/endpoints/agents.py`)

**Endpoint Changes:**
- ✅ `/employee/{employee_id}` → `/account/{account_number}`

---

## Next Steps

### Required: Database Migration

Create Alembic migration to apply these schema changes:

```bash
cd backend
alembic revision --autogenerate -m "Update agent schema to use account_number"
alembic upgrade head
```

**Migration will:**
1. Drop columns: `employee_id`, `first_name`, `last_name`, `phone`, `national_id`
2. Add columns: `account_number`, `full_name`, `secondary_number`
3. Drop columns from shops: `latitude`, `longitude`
4. Add column to assignments: `team_name`
5. Add server defaults for `employment_status` and `is_active`

---

### Update Google Sheets Integration

The integration service needs updates to match new schema:

**File:** `app/services/integrations/google_sheets_service.py`

**Changes needed:**
```python
# Line ~125: Update field extraction
def _extract_account_number(self, row_dict: Dict[str, Any]) -> str:
    """Extract account number (phone) from row."""
    for field in ['account number', 'phone number', 'phone', 'mobile']:
        if field in row_dict:
            phone = str(row_dict[field]).strip()
            phone = phone.replace(' ', '').replace('-', '')
            return phone
    raise ValueError("Account number field not found")

# Line ~190: Update agent lookup
agent = db.query(Agent).filter(Agent.account_number == account_number).first()
if not agent:
    logger.warning(f"Agent not found for account number: {account_number}")
    return None
```

---

## Testing Checklist

After migration:

- [ ] Create new agent with `account_number`
- [ ] Verify `employment_status` defaults to `ACTIVE`
- [ ] Verify shop `is_active` defaults to `True`
- [ ] Create assignment with `team_name`
- [ ] Test agent lookup by `account_number`
- [ ] Test agent search by `full_name`
- [ ] Test Google Sheets sync with new fields
- [ ] Generate QR codes with Shop ID
- [ ] Test sales record creation via account number

---

## Breaking Changes

⚠️ **API Changes:**
- Endpoint `/agents/employee/{id}` → `/agents/account/{number}`
- Request/Response bodies now use `account_number`, `full_name`
- Frontend needs updates to match new field names

⚠️ **Data Migration:**
- Existing data needs transformation:
  - `employee_id` → `account_number` (if phone-based)
  - `first_name + last_name` → `full_name`
  - `phone` → Already in `account_number`

---

## Implementation Plan Alignment

✅ **Completed from Implementation Plan:**
1. DSR Schema Updates - Account number, full name, secondary number
2. Shop Schema Updates - Removed GPS coordinates
3. Assignment Schema Updates - Added team_name
4. Employment status defaults to ACTIVE
5. Shop is_active defaults to True

🚧 **Still Needed:**
1. Google Sheets integration updates (business day cutoff, duplicate handling)
2. Shop name standardization logic
3. Employment tenure calculation from "years worked"
4. Enum mapping for education levels
5. QR code pre-fill with Shop ID (not shop name)
6. Silent shop detection with operating days awareness

---

## Files Modified

1. `backend/app/models/agent.py`
2. `backend/app/models/shop.py`
3. `backend/app/models/assignment.py`
4. `backend/app/schemas/agent.py`
5. `backend/app/services/team_service.py`
6. `backend/app/api/v1/endpoints/agents.py`

---

**Status:** Ready for migration generation and database update.
