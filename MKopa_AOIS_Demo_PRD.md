# M-Kopa Accra Operations Intelligence System (AOIS) - Comprehensive Demo Product Requirements Document (PRD)

## 1. Introduction

This Comprehensive Demo Product Requirements Document (PRD) outlines the scope, objectives, and key features for a full demonstration of the M-Kopa Accra Operations Intelligence System (AOIS). The purpose of this demonstration is to showcase the complete value proposition of AOIS to the client, demonstrating its ability to transform raw sales data into comprehensive and actionable operational intelligence for the Operations Manager, covering all aspects outlined in the original Product Requirements Document.

## 2. Demo Objectives

The primary objectives of this demo are to:

*   **Illustrate Full Value**: Clearly demonstrate how AOIS centralizes data, provides extensive visibility, and generates deep insights across all operational aspects for the Operations Manager.
*   **Showcase All Functionality**: Highlight every feature outlined in the original PRD, addressing all identified pain points and intelligence requirements.
*   **Engage the Client**: Provide an interactive experience that allows the client to understand the system's comprehensive benefits firsthand.
*   **Validate Architectural Approach**: Implicitly confirm the robustness, scalability, and completeness of the proposed architecture and technology stack.
*   **Gather Feedback**: Create a foundation for further discussion and refinement based on client input.

## 3. Demo Scope: Comprehensive Feature Set

This demo will encompass all features detailed in the original M-Kopa Accra Operations Intelligence System PRD. It will prioritize demonstrating the end-to-end flow from data ingestion through all layers of intelligence (Sales, Operations, Executive) to comprehensive reporting.

**In-Scope for Demo (All Features from Original PRD):**

### 3.1. Core Modules

*   **Team Member Database**: Demonstrate viewing personal, educational, employment, current shop assignment, historical assignments, and transfer history for agents.
*   **Shop Intelligence**: Showcase shop profiles, current and historical team members, historical performance records, transfer records, and performance trend tracking for individual shops.
*   **Team Member Shop History**: Display a timeline of all shop assignments, assignment dates, transfer dates, duration at each shop, and performance history per shop for a selected agent.
*   **Shop History Management**: Illustrate the ability to view all staff that have worked in a shop, historical shop performance comparisons, and staff tenure analysis.

### 3.2. Daily Sales Collection & Ingestion

*   **Automated Daily Sales Report Ingestion**: Show how agents' Google/Microsoft Forms submissions (including DSR Account Number, Number of Devices Sold, Remarks) are automatically captured, processed, and associated with reporting date and assigned shop.

### 3.3. Sales Intelligence

*   **Performance Dashboard**: Display comprehensive daily, weekly, and monthly sales figures, detailed shop rankings, agent rankings, and overall sales trend analysis.
*   **Sales Momentum Meter**: Demonstrate the tracking of growth rate, decline rate, and performance trend detection.
*   **Opportunity Detector**: Showcase how the system identifies growing shops, detects emerging sales opportunities, and highlights high-growth locations.
*   **Performance Forecasting**: Illustrate predicted monthly performance, expected sales trends, and early warning indicators.

### 3.4. Operations Intelligence

*   **Challenge Intelligence**: Demonstrate analysis of agent remarks, grouping of recurring operational challenges, and generation of issue summaries and trends.
*   **Silent Shop Detection**: Show how the system detects missing reports and alerts the manager to shops with no recent activity.
*   **Transfer Intelligence**: Illustrate comparison of performance before and after transfers, measurement of transfer effectiveness, and analysis of impact on shops and individuals.
*   **Shop Dependency Index**: Demonstrate detection of shops relying heavily on one performer and highlighting of operational risk concentrations.
*   **Shop Success Formula**: Showcase discovery of patterns associated with successful shops and identification of operational factors linked to performance.

### 3.5. Executive Intelligence

*   **Executive Dashboard**: Display total devices sold today, best-performing shop, lowest-performing shop, shops reporting, overall sales trends, and a summary of operational challenges.
*   **Monthly Operations Review Generator**: Demonstrate automated monthly report generation, including top-performing shops, lowest-performing shops, growth trends, transfer outcomes, and operational challenge summaries.

### 3.6. Non-Functional Aspects (Demonstrable)

*   **Responsive Web-based Interface**: Demonstrate the UI adapting to different screen sizes.
*   **Secure Authentication**: Briefly show the login process for the manager.
*   **Export Reports to PDF and Excel**: Illustrate the ability to export various reports.
*   **Fast Search and Filtering Capabilities**: Demonstrate quick data retrieval and filtering on dashboards and lists.

## 4. Key Features and User Flows for Demo

This section details the specific features to be demonstrated and the user flows the Operations Manager will experience. Each feature will be presented with a clear narrative and expected outcome.

### 4.1. Automated Daily Sales Report Ingestion

**Description:** Demonstrate the seamless process of how daily sales data, submitted by agents via Google or Microsoft Forms, is automatically captured and processed.

**User Flow:**
1.  **Agent (Simulated):** A pre-filled Google Form (or Microsoft Form) link is provided. The presenter (acting as an agent) submits a few sample sales reports for different shops and agents, including diverse `Remarks`.
2.  **System (Backend):** Briefly explain that webhooks (or scheduled polling) capture this data, which is then processed by the Data Ingestion Service and stored in PostgreSQL.
3.  **Operations Manager (Demo UI):** Navigate to the main dashboard to show that the newly submitted data is immediately (or near-immediately) reflected in the sales figures and relevant intelligence modules.

**Expected Outcome:** Client observes real-time (or near real-time) data updates, validating the automation of data collection.

### 4.2. Performance Dashboard & Sales Momentum Meter

**Description:** Showcase the centralized dashboard providing an overview of daily, weekly, and monthly sales performance, detailed shop and agent rankings, trend analysis, and the Sales Momentum Meter.

**User Flow:**
1.  **Operations Manager (Demo UI):** Access the main dashboard.
2.  **View Overall Sales:** Highlight total devices sold for the day, week, and month.
3.  **Shop & Agent Rankings:** Display sections showing top and lowest performing shops and agents based on selected metrics.
4.  **Trend Analysis:** Point out visual trends in sales data.
5.  **Sales Momentum Meter:** Explain and demonstrate the tracking of growth/decline rates and performance trend detection, showing how it provides early indicators.
6.  **Filtering:** Demonstrate dynamic filtering by date range, shop, or agent.

**Expected Outcome:** Client understands how the system provides immediate, comprehensive visibility into overall and granular sales performance and proactive trend detection.

### 4.3. Team Member & Shop Intelligence

**Description:** Demonstrate the ability to drill down into detailed information for team members and shops, including historical data and performance tracking.

**User Flow:**
1.  **Operations Manager (Demo UI):** From the dashboard or a dedicated menu, navigate to a Team Member or Shop profile.
2.  **Team Member Profile:** Show personal, educational, employment info, current assignment, and a timeline of historical assignments and transfers with durations and performance history per shop.
3.  **Shop Profile:** Display shop details, current and historical team members, historical performance records, transfer records, and performance trend tracking for that specific shop.
4.  **Shop History Management:** Illustrate viewing all staff that have worked in a shop, historical performance comparisons, and staff tenure analysis.

**Expected Outcome:** Client sees the capability to access detailed historical and current data for effective team and shop management.

### 4.4. Opportunity Detector & Performance Forecasting

**Description:** Showcase how the system proactively identifies sales opportunities and provides future performance predictions.

**User Flow:**
1.  **Operations Manager (Demo UI):** Navigate to the Sales Intelligence section.
2.  **Opportunity Detector:** Display a list or map view highlighting growing shops, emerging sales opportunities, and high-growth locations.
3.  **Performance Forecasting:** Show predicted monthly performance, expected sales trends, and any early warning indicators for potential underperformance.

**Expected Outcome:** Client understands the system's proactive capabilities in identifying growth areas and potential risks.

### 4.5. Operations Intelligence Modules

**Description:** Demonstrate the advanced operational insights provided by the system.

**User Flow:**
1.  **Operations Manager (Demo UI):** Navigate to the Operations Intelligence section.
2.  **Challenge Intelligence:** Display analysis of agent `Remarks`, grouped recurring operational challenges, and generated issue summaries and trends.
3.  **Silent Shop Detection:** Show alerts for shops with missing reports or no recent activity.
4.  **Transfer Intelligence:** Illustrate comparison of performance before and after transfers, measuring effectiveness and impact.
5.  **Shop Dependency Index:** Highlight shops relying heavily on one performer and associated risk concentrations.
6.  **Shop Success Formula:** Present identified patterns and operational factors linked to successful shops.

**Expected Outcome:** Client appreciates the system's ability to diagnose operational issues, optimize resource allocation, and identify best practices.

### 4.6. Executive Dashboard & Monthly Operations Review Generator

**Description:** Showcase the high-level overview for executives and the automated generation of comprehensive monthly reports.

**User Flow:**
1.  **Operations Manager (Demo UI):** Navigate to the Executive Dashboard.
2.  **Executive Dashboard View:** Display total devices sold today, best/lowest-performing shops, shops reporting status, overall sales trends, and a summary of operational challenges.
3.  **Monthly Operations Review Generator:** Demonstrate triggering the automated generation of a monthly report, showing its comprehensive content (top/lowest shops, growth trends, transfer outcomes, challenge summaries).

**Expected Outcome:** Client sees how the system supports high-level decision-making and automates critical reporting tasks.

### 4.7. Report Export (PDF/Excel)

**Description:** Illustrate the system's capability to export various reports in professional PDF and Excel formats.

**User Flow:**
1.  **Operations Manager (Demo UI):** From any relevant dashboard or report view, select an export option.
2.  **Select Report Type & Format:** Choose a report (e.g., Sales Performance, Monthly Review) and select PDF or Excel.
3.  **Generate & Download:** Click to generate and simulate a download of the selected report.

**Expected Outcome:** Client confirms the system's ability to produce shareable reports for offline analysis or presentations.

## 5. Data Requirements and Mock Data Strategy

To make the demo realistic and impactful, a well-structured mock data strategy is crucial. The data should tell a compelling story that highlights all the system's capabilities.

### 5.1. Data Entities

*   **Agents:** A sufficient number of agents (e.g., 15-20) with unique names and varied performance profiles.
*   **Shops:** 5-7 distinct MTN offices/shops in Accra, with varied performance and characteristics.
*   **Sales Data:** Daily sales records for each agent, including `Agent Name`, `Number of Devices Sold`, and `Remarks`. Remarks should be diverse to support Challenge Intelligence.
*   **Assignments:** Comprehensive historical and current assignments of agents to shops, including multiple transfers for some agents.
*   **Performance Data:** Simulated performance metrics for agents and shops over an extended period (e.g., 6-12 months) to support trend analysis, forecasting, and transfer intelligence.

### 5.2. Mock Data Narrative

The mock data should be meticulously designed to illustrate every feature:

*   **Varied Performance:** Data should clearly show high, medium, and low performers among agents and shops.
*   **Sales Momentum Shifts:** Include clear upward and downward trends for various shops/agents over different periods.
*   **Opportunities:** Data patterns indicating growing shops or emerging sales opportunities.
*   **Forecasting Scenarios:** Data that allows for plausible predictions and early warning indicators.
*   **Operational Challenges:** A rich set of `Remarks` that can be grouped into recurring challenges (e.g., "stock issues," "transport delays," "customer complaints").
*   **Silent Shops:** Simulate periods of no reporting activity for certain shops.
*   **Transfer Impact:** Data for several agents showing performance changes (positive and negative) before and after transfers between shops.
*   **Dependency:** Data indicating shops where performance is heavily reliant on a single agent.
*   **Success Patterns:** Data that can be analyzed to reveal common factors among high-performing shops.
*   **Historical Depth:** Sufficient historical data to demonstrate the 
full scope of historical tracking and trend analysis.

### 5.3. Data Generation Approach

*   **Scripted Generation:** Develop a robust Python script to generate a synthetic dataset that adheres to the narrative above. This script should create data for agents, shops, assignments, and daily sales reports over a period of 6-12 months.
*   **Database Seeding:** The generated mock data will be used to populate the demo environment's PostgreSQL database.
*   **Forms Simulation:** For the live demo, prepare several pre-configured Google/Microsoft Forms links. These forms should be set up to submit data that immediately impacts the dashboards, demonstrating real-time ingestion. Consider having a few 
pre-filled forms ready to quickly showcase different scenarios (e.g., a high sales day, a day with many 'stock shortage' remarks).

### 5.4. Data Volume

*   **Agents:** 15-20
*   **Shops:** 5-7
*   **Daily Sales Records:** Approximately 6-12 months of historical data for each agent-shop combination, with varied sales per agent per day. This will create a sufficiently rich dataset to demonstrate all intelligence modules (e.g., 15 agents * 5 shops * 365 days * 2 sales/day = ~54,750 records, which is manageable for a demo and provides ample historical depth).

## 6. Demo Environment Requirements

*   **Cloud-based Deployment:** A dedicated, fully functional instance of the AOIS architecture deployed on a cloud provider (e.g., AWS, GCP), mirroring the production environment as closely as possible.
*   **Pre-populated Database:** The PostgreSQL database must be comprehensively pre-populated with the mock data as per the strategy above, covering all historical scenarios.
*   **Accessible Forms:** Live Google/Microsoft Forms links for agents to submit data, configured to feed into the demo system.
*   **Stable Internet Connection:** Essential for accessing the web-based UI and forms.
*   **Presentation Tools:** A screen-sharing tool, a clear audio setup, and potentially a secondary monitor for the presenter to manage the demo flow and notes.
*   **Performance:** The demo environment should be provisioned to ensure smooth and responsive performance, avoiding any lag that could detract from the presentation.

## 7. Success Metrics for the Demo

*   **Client Engagement:** Active participation, insightful questions, and positive feedback from the client throughout the demo.
*   **Clarity of Value Proposition:** Client clearly articulates how AOIS solves their operational intelligence challenges and expresses interest in specific features.
*   **Feature Demonstration:** All in-scope features are demonstrated smoothly, effectively, and without technical glitches.
*   **Technical Stability:** The demo environment performs reliably without errors, crashes, or significant delays.
*   **Alignment with PRD:** The client confirms that the demonstrated system aligns with their understanding of the original PRD requirements.

## 8. Demo Script Outline

A detailed demo script will be developed to guide the presenter through each feature, ensuring a consistent message and smooth transitions. It will include:

1.  **Introduction (5 min):** Briefly set the stage, reiterate the problem AOIS solves, and provide a high-level overview of the system.
2.  **Data Ingestion (10 min):** Live submission of a sales report via form, showing immediate impact on the dashboard and explaining the backend process.
3.  **Sales Intelligence Walkthrough (20 min):**
    *   Dashboard overview: Highlight key metrics, overall sales, shop/agent rankings.
    *   Sales Momentum Meter: Demonstrate trend tracking.
    *   Opportunity Detector: Showcase identification of growing shops/opportunities.
    *   Performance Forecasting: Present predicted performance and early warnings.
4.  **Team Member & Shop Intelligence Drill-down (15 min):**
    *   Navigate to a specific Team Member profile, showing historical assignments and performance.
    *   Navigate to a specific Shop profile, showing details, team, and historical performance.
    *   Illustrate Shop History Management.
5.  **Operations Intelligence Insights (15 min):**
    *   Challenge Intelligence: Show analysis of remarks and issue summaries.
    *   Silent Shop Detection: Demonstrate alerts.
    *   Transfer Intelligence: Compare pre/post-transfer performance.
    *   Shop Dependency Index: Highlight risk concentrations.
    *   Shop Success Formula: Present identified patterns.
6.  **Executive Overview & Reporting (10 min):**
    *   Executive Dashboard: High-level metrics and summaries.
    *   Monthly Operations Review Generator: Demonstrate automated report generation.
    *   Report Export: Illustrate PDF/Excel export for various reports.
7.  **Q&A (15 min):** Open floor for client questions and discussion.
8.  **Next Steps (5 min):** Discuss potential next phases, gather specific feedback, and outline follow-up actions.
