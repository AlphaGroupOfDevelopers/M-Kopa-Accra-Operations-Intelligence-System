import { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, 
  Users, 
  Store, 
  TrendingUp, 
  LogOut,
  Menu,
  X,
  Moon,
  Sun,
  Lightbulb,
  FileText,
  Briefcase,
  Home
} from 'lucide-react';
import './Layout.css';

export default function Layout() {
  const { logout, currentUser } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check initial system/saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/executive', icon: LayoutDashboard, label: 'Executive Dashboard' },
    { path: '/operations-intelligence', icon: Briefcase, label: 'Operations Overview' },
    { path: '/performance-intelligence', icon: TrendingUp, label: 'Sales Performance' },
    { path: '/decision-intelligence', icon: Lightbulb, label: 'Recommendations' },
    { path: '/team-members', icon: Users, label: 'Team Management' },
    { path: '/shops', icon: Store, label: 'Shop Management' },
    { path: '/data-entry', icon: FileText, label: 'Reports' },
  ];

  return (
    <div className="layout-container">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="mobile-toggle"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      <div
        className={`mobile-overlay ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1.5rem 1.5rem 1rem', border: 'none' }}>
          <img src="/logo.png" alt="M-Kopa" style={{ height: '48px', width: 'auto', objectFit: 'contain', border: 'none', outline: 'none' }} />
          <div style={{ marginTop: '0.75rem', textAlign: 'center' }}>
            <h1 className="sidebar-brand" style={{ fontSize: '1.25rem', marginBottom: 0 }}>M-Kopa</h1>
            <p className="sidebar-subtitle" style={{ fontSize: '0.875rem', marginTop: '0.1rem' }}>Operations Center</p>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <span className="user-name">{currentUser?.name || 'User'}</span>
            <span className="user-role">{currentUser?.role || 'Role'}</span>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Wrapper */}
      <div className="main-wrapper">
        <header className="topbar">
          <div className="topbar-left" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
             <img src="/logo.png" alt="M-Kopa" style={{ height: '32px', width: 'auto' }} />
          </div>
          <div className="topbar-right">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </header>
        
        <main className="main-content">
          <Outlet />
        </main>
        
        {/* Bottom Navigation for Mobile */}
        <nav className="bottom-nav">
          <Link to="/" onClick={() => setSidebarOpen(false)} className={`bottom-nav-item ${isActive('/') ? 'active' : ''}`}>
            <Home size={20} />
            <span>Dashboard</span>
          </Link>
          <Link to="/team-members" onClick={() => setSidebarOpen(false)} className={`bottom-nav-item ${isActive('/team-members') ? 'active' : ''}`}>
            <Users size={20} />
            <span>Team</span>
          </Link>
          <Link to="/shops" onClick={() => setSidebarOpen(false)} className={`bottom-nav-item ${isActive('/shops') ? 'active' : ''}`}>
            <Store size={20} />
            <span>Shops</span>
          </Link>
          <Link to="/operations-intelligence" onClick={() => setSidebarOpen(false)} className={`bottom-nav-item ${location.pathname.includes('intelligence') ? 'active' : ''}`}>
            <Lightbulb size={20} />
            <span>Intelligence</span>
          </Link>
          <Link to="/more" onClick={() => setSidebarOpen(false)} className={`bottom-nav-item ${isActive('/more') ? 'active' : ''}`}>
            <Menu size={20} />
            <span>More</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
