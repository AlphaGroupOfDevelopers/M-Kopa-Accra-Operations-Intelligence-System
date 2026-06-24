# Comprehensive Backend Requirements & Schema Updates

This document serves as the single source of truth for the backend developer to implement the revised data schemas, ingestion logic, and operational business rules for the M-Kopa Accra Operations Intelligence System (AOIS).

---

## 1. DSR (Direct Sales Representative) Schema Updates
These changes streamline the DSR profiles to match real-world data collection.

### Database Model (`app/models/dsr.py`) & Schemas (`app/schemas/dsr.py`)
- **[DELETE]** Remove the `national_id` column completely.
- **[DELETE]** Remove `first_name` and `last_name` columns.
- **[NEW]** Add a single `full_name` string column.
- **[MODIFY]** The `account_number` will serve as both the unique identifier for the agent and their Primary Phone Number. 
- **[DELETE]** Remove the standard `phone` column to avoid redundancy.
- **[NEW]** Add a `secondary_number` string column (to map to the "Alternative Contact" from the form).
- **[MODIFY]** `employment_date` remains a Date field in the database.
- **[MODIFY]** `employment_status` must default to `ACTIVE` automatically upon creation.

---

## 2. Shop & Assignment Schema Updates
These changes handle duplicate shop entries and structure team logic.

### Shop Model (`app/models/shop.py`)
- **[DELETE]** Remove `latitude` and `longitude` completely.
- **[MODIFY]** `is_active` must default to `True` automatically.

### Assignment Model (`app/models/assignment.py`)
- **[NEW]** Add a `team_name` string column to the Assignment model. (Because the shop determines the team, the team assignment is inextricably linked to the shop assignment).
- **[MAINTAIN]** Keep the existing `role` string column to track if a DSR is the "Main DSR" or "Supporting DSR".

---

## 3. Data Ingestion & Transformation Logic
When the backend script processes the initial Excel data and future form submissions, it must enforce the following data transformations:

### A. Shop Name Standardization & Deduplication
- **Rule:** The ingestion script must forcefully standardize all shop names into the format: `[Outlet] [Shop Name]` (e.g., "MTN Madina", "Telecel North Industrial Area", "Franko Lapaz").
- **Deduplication:** The raw data contains duplicate rows for the same shop because multiple DSRs (Main and Supporting) operate there. The backend script must check the DSR `role` and merge these into a **single** Shop record in the database, assigning both DSRs to that one Shop ID.

### B. Employment Tenure Calculation
- **Rule:** The form captures "years worked" (an integer/float). The ingestion script must calculate the strict `employment_date` by subtracting the years worked from the current date (`date.today() - timedelta(days=years * 365)`), and store that resulting Date in the database.

### C. Enum Mapping
- **Rule:** The ingestion script must map human-readable form strings (e.g., "Bachelor's Degree") into the strict expected Enums in the database (e.g., `bachelor`). 

---

## 4. Daily Sales Report (Business Rules & API Logic)
The Daily Sales form ingestion logic must strictly adhere to these operational rules:

### A. Unique Identifier for Sales
- The Daily Sales Microsoft/Google Form **MUST** collect the DSR's `account_number`. 
- The backend API will use this `account_number` as the strict lookup key to link the daily sales record to the correct DSR. Name-matching is prohibited.

### B. Automated Floating DSR Attribution (QR Code Method)
- We are adopting the **QR Code Method** to solve floating DSRs. 
- **Implementation:** Every shop will have a unique QR code. The QR code contains a URL to the Daily Sales Form with the `Shop ID` appended as a hidden, pre-filled URL parameter. The backend will read this hidden parameter to attribute the sale to the exact physical shop the DSR was standing in, requiring 0 manual manager intervention.

### C. The "Business Day Cut-off" (6:00 AM Rule)
- **Rule:** DSRs occasionally submit reports past midnight. The backend sales ingestion API must implement a "Business Day Cut-off" at 6:00 AM. 
- **Logic:** Any form submitted between `12:00 AM` and `5:59 AM` must automatically be credited to the **previous calendar day's** sales record.

### D. Duplicate Submission Handling
- **Rule:** If the backend receives two forms submitted by the exact same `account_number` on the exact same `sale_date`, the system must **take the latest one** and overwrite/update the previous entry. It must *not* sum them.

### E. Zero Sales Processing
- DSRs are instructed to submit reports even if they make `0` sales. The backend must cleanly accept and store `0` in the `devices_sold` integer column.

---

## 5. Operations Intelligence Modifications
Updates to the system's analytical features.

### A. Operating-Days Aware (Silent Shop Detection)
- **Rule:** The "Silent Shop Detection" feature (which alerts the manager if a shop hasn't reported) must be explicitly programmed to be **Operating Days Aware**. 
- **Implementation:** It must pause alerts on Sundays or designated public holidays to prevent spamming the Operations Manager with false alerts when shops are legitimately closed.

### B. Historical Transfers
- **Rule:** The system will start with a blank slate for historical transfers. Transfer intelligence will strictly begin tracking from "Day 1" of this system's deployment moving forward. No retroactive transfer scripting is required.
