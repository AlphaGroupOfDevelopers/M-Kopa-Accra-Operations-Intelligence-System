import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { 
  LayoutDashboard, 
  TrendingUp, 
  LogOut,
  Lightbulb,
  FileText,
  User,
  ChevronRight
} from 'lucide-react';
import './MoreMenu.css';

export default function MoreMenu() {
  
  const { logout, currentUser } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { path: '/executive', icon: LayoutDashboard, label: 'Executive Dashboard' },
    { path: '/performance-intelligence', icon: TrendingUp, label: 'Sales Performance' },
    { path: '/decision-intelligence', icon: Lightbulb, label: 'Recommendations' },
    { path: '/data-entry', icon: FileText, label: 'Reports' },
  ];

  return (
    <div className="dashboard-container">
      <div className="more-menu-container">
        {/* Removed more-menu-header per user request */}

        <div className="more-menu-profile">
          <div className="profile-avatar">
            <User size={32} />
          </div>
          <div className="profile-info">
            <h2>{currentUser?.name || 'User'}</h2>
            <p>{currentUser?.role || 'Role'}</p>
          </div>
        </div>

        <div className="more-menu-list">
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <Link key={item.path} to={item.path} className="more-menu-item" style={{ textDecoration: 'none' }}>
                <div className="more-menu-item-left">
                  <Icon size={20} className="more-menu-icon" />
                  <span>{item.label}</span>
                </div>
                <ChevronRight size={20} className="more-menu-chevron" />
              </Link>
            );
          })}
        </div>

        <div className="more-menu-actions">
          <button className="more-menu-logout" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
