# M-Kopa AOIS Frontend Demo

## Accra Operations Intelligence System - Demonstration Version

This is a **frontend-only demo** built to showcase all features from the M-Kopa AOIS Product Requirements Document. It operates with mock data and local state management, requiring no backend infrastructure.

### 🎯 Demo Objectives

- Demonstrate complete value proposition of AOIS
- Showcase all features from the PRD
- Provide interactive experience with realistic data
- Allow data entry that immediately reflects across all dashboards

### ✨ Key Features

#### 1. **Performance Dashboard**
- Real-time sales metrics
- 14-day trend visualization
- Top performing shops and agents
- Silent shop detection

#### 2. **Team Member Intelligence**
- Complete agent profiles with employment history
- Shop assignment timeline with performance per location
- Transfer history and impact analysis
- Individual performance trends

#### 3. **Shop Intelligence**
- Detailed shop profiles
- Current and historical team composition
- Staff tenure analysis
- Shop-specific performance trends

#### 4. **Sales Intelligence**
- Sales Momentum Meter (growth/decline tracking)
- Opportunity Detector (growing shops)
- Performance Forecasting (30-day predictions)
- Shop rankings and comparisons

#### 5. **Operations Intelligence**
- Challenge Intelligence (recurring operational issues)
- Silent Shop Detection (missing reports)
- Transfer Intelligence (before/after performance)
- Shop Dependency Index (risk concentration)
- Shop Success Formula (best practices)

#### 6. **Executive Dashboard**
- High-level KPIs
- 7-day sales trend
- Shop performance distribution
- Top operational challenges
- Monthly operations summary
- Export monthly reports (simulated)

#### 7. **Data Entry**
- Simulate agent sales submissions
- Immediate dashboard updates
- Pre-filled sample remarks for testing

### 🚀 Getting Started

The demo is already running! It's accessible at: **http://localhost:5173/**

#### Login
- **Email:** Any email address (e.g., manager@mkopa.com)
- **Password:** Any password
- This is demo mode - authentication is bypassed

### 📊 Mock Data

The demo includes:
- **15 agents** with varied performance profiles
- **7 MTN shops** across Accra
- **6 months** of historical sales data (~2,700 records)
- Realistic transfer history
- Diverse operational challenges in remarks

### 🎮 How to Use the Demo

1. **Login** with any credentials
2. **Explore the Dashboard** - See today's metrics and trends
3. **Visit Team Members** - Click on any agent to see their full profile and history
4. **Check Shops** - View shop performance and team composition
5. **Sales Intelligence** - Analyze momentum, opportunities, and forecasts
6. **Operations Intelligence** - Review challenges, transfers, and dependencies
7. **Executive View** - See high-level summary and export reports
8. **Data Entry** - Submit new sales data and watch it update everywhere!

### 🔄 Testing Data Entry

1. Go to **Data Entry** page
2. Select an agent
3. Enter devices sold
4. Add remarks (use quick-fill buttons for common scenarios)
5. Submit the form
6. Navigate back to dashboards to see immediate updates

### 📱 Responsive Design

The interface is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile devices

### 🛠 Technology Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **React Router** - Navigation
- **date-fns** - Date manipulation
- **Lucide React** - Icons

### 📁 Project Structure

```
src/
├── components/
│   └── Layout.tsx          # Main layout with sidebar
├── context/
│   └── AppContext.tsx      # Global state management
├── data/
│   └── mockData.ts         # Mock data generation
├── pages/
│   ├── Dashboard.tsx       # Main dashboard
│   ├── TeamMembers.tsx     # Agent list
│   ├── TeamMemberProfile.tsx
│   ├── Shops.tsx           # Shop list
│   ├── ShopProfile.tsx
│   ├── SalesIntelligence.tsx
│   ├── OperationsIntelligence.tsx
│   ├── ExecutiveDashboard.tsx
│   ├── DataEntry.tsx
│   └── Login.tsx
├── App.tsx                 # Root component with routing
├── main.tsx               # Entry point
└── index.css              # Global styles
```

### 🎨 Color Scheme

- **Primary:** Red (#dc2626) - M-Kopa branding
- **Success:** Green (#10b981)
- **Warning:** Orange (#f59e0b)
- **Info:** Blue (#3b82f6)

### 🔮 Future Enhancements (Production Version)

When moving to production with real backend:

1. Replace mock data with API calls
2. Implement real authentication with JWT
3. Add data persistence to database
4. Implement real PDF/Excel export
5. Add real-time notifications
6. Integrate with Google/Microsoft Forms webhooks
7. Add advanced filtering and search
8. Implement role-based access control

### 📝 Notes

- All data is stored in browser memory (resets on page refresh)
- No backend or database required
- Perfect for demonstrations and stakeholder presentations
- Data updates are instant and visible across all views

### 🎓 Demo Tips

- Start with the Dashboard to show overall metrics
- Use Data Entry to demonstrate real-time updates
- Show Team Member profiles to highlight historical tracking
- Visit Sales Intelligence to show predictive capabilities
- Use Operations Intelligence to demonstrate problem detection
- End with Executive Dashboard for high-level summary

### 📞 Support

For questions about this demo, contact the development team.

---

**Built for M-Kopa Operations Team** | Demo Version | 2026
