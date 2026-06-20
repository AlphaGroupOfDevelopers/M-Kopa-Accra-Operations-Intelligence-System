import { useMemo, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { Search, Users, Mail, Phone } from 'lucide-react';
import { subDays, format } from 'date-fns';
import './Dashboard.css';
import './Shops.css'; // For shops-grid, search classes
import './TeamMembers.css';

export default function TeamMembers() {
  const { agents, salesRecords, shops } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const agentsWithStats = useMemo(() => {
    const last30Days = format(subDays(new Date(), 30), 'yyyy-MM-dd');

    return agents.map(agent => {
      const agentSales = salesRecords
        .filter(r => r.agentId === agent.id && r.date >= last30Days)
        .reduce((sum, r) => sum + r.devicesSold, 0);

      const currentShop = shops.find(s => s.id === agent.currentShopId);

      return {
        ...agent,
        totalSales: agentSales,
        avgDailySales: (agentSales / 30).toFixed(1),
        currentShopName: currentShop?.name || 'Unknown',
      };
    }).sort((a, b) => b.totalSales - a.totalSales);
  }, [agents, salesRecords, shops]);

  const filteredAgents = agentsWithStats.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.currentShopName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="dashboard-title">Team Members</h1>
          <p className="dashboard-subtitle">Manage and view agent profiles and performance</p>
        </div>
        <div className="team-header-actions">
          <Users size={20} style={{ marginRight: '0.5rem' }} />
          <span>{agents.length} Active Agents</span>
        </div>
      </div>

      {/* Search */}
      <div className="card">
        <div className="shops-search-wrapper">
          <Search className="shops-search-icon" size={20} />
          <input
            type="text"
            placeholder="Search by name, email, or shop..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="shops-search-input"
          />
        </div>
      </div>

      {/* Agents Grid */}
      <div className="shops-grid">
        {filteredAgents.map(agent => (
          <Link key={agent.id} to={`/team-members/${agent.id}`} style={{ textDecoration: 'none' }}>
            <div className="card team-agent-card">
              <div className="team-agent-header">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="team-agent-avatar">
                    {agent.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="team-agent-info">
                    <h3 className="team-agent-name">{agent.name}</h3>
                    <p className="team-agent-shop">{agent.currentShopName}</p>
                  </div>
                </div>
                <span className={`shop-status-badge ${agent.status === 'active' ? 'active' : 'inactive'}`}>
                  {agent.status}
                </span>
              </div>

              <div className="team-agent-details">
                <div className="team-agent-detail-item">
                  <Mail size={14} style={{ marginRight: '0.5rem' }} />
                  {agent.email}
                </div>
                <div className="team-agent-detail-item">
                  <Phone size={14} style={{ marginRight: '0.5rem' }} />
                  {agent.phone}
                </div>
                <div className="team-agent-detail-item" style={{ width: '100%', marginTop: '0.25rem' }}>
                  <span style={{ marginRight: '0.5rem' }}>🎂</span>
                  Born {format(new Date(agent.dateOfBirth), 'MMM dd, yyyy')}
                </div>
              </div>

              <div className="team-agent-stats">
                <div>
                  <p className="shop-stat-label">30-Day Sales</p>
                  <p className="shop-stat-value">{agent.totalSales}</p>
                </div>
                <div>
                  <p className="shop-stat-label">Daily Avg</p>
                  <p className="shop-stat-value">{agent.avgDailySales}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredAgents.length === 0 && (
        <div className="card team-empty-state">
          <Users className="team-empty-icon" size={48} />
          <p className="team-empty-text">No agents found matching your search</p>
        </div>
      )}
    </div>
  );
}

