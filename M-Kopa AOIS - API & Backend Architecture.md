# M-Kopa AOIS - API & Backend Architecture

This document represents the technical architecture of the API and Backend layers for the M-Kopa Accra Operations Intelligence System (AOIS), as derived from the system's technical specifications.

## 1. System Architecture Diagram

The following diagram illustrates the layered structure of the system, showing the interaction between external services, the integration layer, business logic, and the data storage layer.

```mermaid
graph TD
    subgraph API_Layer [API Layer]
        R_API[Reports API]
        S_API[Sales API]
        SH_API[Shop API]
        T_API[Team Member API]
        AUTH[Auth Service - JWT/OAuth2]
    end

    subgraph Integration_Layer [Integration Layer]
        MS_CONN[Microsoft Forms Connector]
        GF_CONN[Google Forms Connector]
        REP_GEN[Report Generator - PDF/Excel]
    end

    subgraph External_Services [External Services]
        MS_API[Microsoft Forms API]
        GF_API[Google Forms API]
    end

    subgraph Business_Logic_Layer [Business Logic Layer]
        FORE[Forecaster Service]
        PERF[Performance Engine]
        ANLY[Analytics Engine]
        S_SRV[Sales Service]
        SH_SRV[Shop Service]
        T_SRV[Team Service]
    end

    subgraph Data_Layer [Data Layer]
        FILE[File Storage - PDF/Excel Reports]
        CACHE[Redis Cache]
        DB[(PostgreSQL Database)]
    end

    %% Connections
    MS_API <--> MS_CONN
    GF_API <--> GF_CONN
    
    MS_CONN --> S_SRV
    GF_CONN --> S_SRV
    REP_GEN --> FILE
    
    S_API --> S_SRV
    SH_API --> SH_SRV
    T_API --> T_SRV
    R_API --> REP_GEN
    
    S_SRV --> PERF
    S_SRV --> ANLY
    S_SRV --> FORE
    
    PERF & ANLY & FORE --> DB
    S_SRV & SH_SRV & T_SRV --> DB
    S_SRV & SH_SRV & T_SRV --> CACHE
    
    AUTH -.-> API_Layer
```

## 2. Layer Descriptions

### 2.1. API Layer
The entry point for the frontend application. It exposes specific endpoints for different business domains and handles security through the **Auth Service** using JWT or OAuth2.

### 2.2. Integration Layer
Responsible for communication with external platforms.
*   **Connectors**: Sync data from Google and Microsoft Forms into the internal Sales Service.
*   **Report Generator**: Handles the creation of PDF and Excel documents for export.

### 2.3. Business Logic Layer
The core intelligence of the system.
*   **Engages/Engines**: The Performance, Analytics, and Forecaster engines process raw data into management insights.
*   **Domain Services**: The Sales, Shop, and Team services manage the primary business entities and logic.

### 2.4. Data Layer
The foundation for data persistence and performance.
*   **PostgreSQL**: The primary relational database for all operational and historical data.
*   **Redis Cache**: Used for high-speed data retrieval to ensure a responsive user experience.
*   **File Storage**: A dedicated storage area for generated reports and static assets.
