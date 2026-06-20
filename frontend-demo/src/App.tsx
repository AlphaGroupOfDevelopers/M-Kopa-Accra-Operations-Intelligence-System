import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TeamMembers from './pages/TeamMembers';
import TeamMemberProfile from './pages/TeamMemberProfile';
import Shops from './pages/Shops';
import ShopProfile from './pages/ShopProfile';
import PerformanceIntelligence from './pages/PerformanceIntelligence';
import OperationsIntelligence from './pages/OperationsIntelligence';
import ExecutiveDashboard from './pages/ExecutiveDashboard';
import DataEntry from './pages/DataEntry';
import MoreMenu from './pages/MoreMenu';

import DecisionIntelligence from './pages/DecisionIntelligence';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useApp();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="team-members" element={<TeamMembers />} />
          <Route path="team-members/:agentId" element={<TeamMemberProfile />} />
          <Route path="shops" element={<Shops />} />
          <Route path="shops/:shopId" element={<ShopProfile />} />
          <Route path="operations-intelligence" element={<OperationsIntelligence />} />
          <Route path="performance-intelligence" element={<PerformanceIntelligence />} />
          <Route path="decision-intelligence" element={<DecisionIntelligence />} />
          <Route path="executive" element={<ExecutiveDashboard />} />
          <Route path="data-entry" element={<DataEntry />} />
          <Route path="more" element={<MoreMenu />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
