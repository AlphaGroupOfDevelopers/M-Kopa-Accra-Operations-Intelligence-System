import { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, 
  Users, 
  Store, 
  TrendingUp, 
  Settings, 
  LogOut,
  BarChart3,
  PlusCircle,
  Menu,
  X
} from 'lucide-react';

export default function Layout() {
  const { logout, currentUser } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/team-members', icon: Users, label: 'Team Members' },
    { path: '/shops', icon: Store, label: 'Shops' },
    { path: '/sales-intelligence', icon: TrendingUp, label: 'Sales Intelligence' },
    { path: '/operations-intelligence', icon: Settings, label: 'Operations' },
    { path: '/executive', icon: BarChart3, label: 'Executive' },
    { path: '/data-entry', icon: PlusCircle, label: 'Data Entry' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#39B54A] text-white rounded-lg shadow-lg"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-gradient-to-b from-[#39B54A] to-[#1F3E35] text-white
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6">
          <h1 className="text-2xl font-bold">M-Kopa AOIS</h1>
          <p className="text-sm text-green-100 mt-1">Accra Operations Intelligence</p>
        </div>
        
        <nav className="mt-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center px-6 py-3 transition-colors ${
                  isActive(item.path)
                    ? 'bg-[#2E9339] border-l-4 border-white'
                    : 'hover:bg-[#2E9339]'
                }`}
              >
                <Icon size={20} className="mr-3" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-64 p-6 border-t border-green-800">
          <div className="mb-3">
            <p className="text-sm font-semibold">{currentUser?.name}</p>
            <p className="text-xs text-green-100">{currentUser?.role}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center text-sm hover:text-green-100 transition-colors"
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-4 lg:p-8 pt-16 lg:pt-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
