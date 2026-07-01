import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import Layout from './components/Layout';

const Login = React.lazy(() => import('./pages/Login'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const TeamMembers = React.lazy(() => import('./pages/TeamMembers'));
const TeamMemberProfile = React.lazy(() => import('./pages/TeamMemberProfile'));
const Shops = React.lazy(() => import('./pages/Shops'));
const ShopProfile = React.lazy(() => import('./pages/ShopProfile'));
const PerformanceIntelligence = React.lazy(() => import('./pages/PerformanceIntelligence'));
const OperationsIntelligence = React.lazy(() => import('./pages/OperationsIntelligence'));
const ExecutiveDashboard = React.lazy(() => import('./pages/ExecutiveDashboard'));
const MoreMenu = React.lazy(() => import('./pages/MoreMenu'));
const DecisionIntelligence = React.lazy(() => import('./pages/DecisionIntelligence'));
const ForgotPassword = React.lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = React.lazy(() => import('./pages/ResetPassword'));

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAppContext();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

const LoadingFallback = () => (
  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'var(--bg-main)' }}>
    <img src="/logo.png" alt="M-Kopa" style={{ height: '48px', width: 'auto', marginBottom: '24px' }} />
    <div style={{ 
      width: '40px', 
      height: '40px', 
      border: '3px solid rgba(0, 200, 83, 0.2)', 
      borderRadius: '50%', 
      borderTopColor: 'var(--accent-green)', 
      animation: 'spin 1s ease-in-out infinite' 
    }} />
    <style>
      {`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}
    </style>
  </div>
);

function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
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
            <Route path="team-members/:dsrId" element={<TeamMemberProfile />} />
            <Route path="shops" element={<Shops />} />
            <Route path="shops/:shopId" element={<ShopProfile />} />
            <Route path="operations-intelligence" element={<OperationsIntelligence />} />
            <Route path="performance-intelligence" element={<PerformanceIntelligence />} />
            <Route path="decision-intelligence" element={<DecisionIntelligence />} />
            <Route path="executive" element={<ExecutiveDashboard />} />
            <Route path="more" element={<MoreMenu />} />
          </Route>
        </Routes>
      </Suspense>
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
