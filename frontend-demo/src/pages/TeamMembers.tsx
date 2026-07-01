import { useSalesRecords, useAgents, useShops } from '../hooks/useQueries';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, Mail, Phone } from 'lucide-react';
import { subDays, format } from 'date-fns';
import './Dashboard.css';
import './Shops.css'; // For shops-grid, search classes
import './TeamMembers.css';

export default function TeamMembers() {
  const { data: salesRecords } = useSalesRecords();
  const { data: agents } = useAgents();
  const { data: shops } = useShops();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('high');
  const [genderFilter, setGenderFilter] = useState('all');

  const agentsWithStats = useMemo(() => {
    const last7Days = format(subDays(new Date(), 7), 'yyyy-MM-dd');

    return agents.map(agent => {
      const agentSales = salesRecords
        .filter(r => r.agentId === agent.id && r.date >= last7Days)
        .reduce((sum, r) => sum + r.devicesSold, 0);

      const currentShop = shops.find(s => s.id === agent.currentShopId);

      return {
        ...agent,
        totalSales: agentSales,
        avgDailySales: (agentSales / 7).toFixed(1),
        currentShopName: currentShop?.name || 'Unknown',
      };
    }).sort((a, b) => {
      if (sortOrder === 'youngest' || sortOrder === 'oldest') {
        const dateA = (a.dateOfBirth && !isNaN(new Date(a.dateOfBirth).getTime())) ? new Date(a.dateOfBirth).getTime() : (sortOrder === 'youngest' ? 0 : Infinity);
        const dateB = (b.dateOfBirth && !isNaN(new Date(b.dateOfBirth).getTime())) ? new Date(b.dateOfBirth).getTime() : (sortOrder === 'youngest' ? 0 : Infinity);
        return sortOrder === 'youngest' ? dateB - dateA : dateA - dateB;
      }
      return sortOrder === 'high' ? b.totalSales - a.totalSales : a.totalSales - b.totalSales;
    });
  }, [agents, salesRecords, shops, sortOrder]);

  const filteredAgents = agentsWithStats.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.currentShopName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGender = genderFilter === 'all' || (agent.gender && agent.gender.toLowerCase() === genderFilter);
    return matchesSearch && matchesGender;
  });

  return (
    <div className="dashboard-container">
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="dashboard-title">Team Members</h1>
          <p className="dashboard-subtitle">Manage and view DSR profiles and performance</p>
        </div>
        <div className="team-header-actions">
          <Users size={20} style={{ marginRight: '0.5rem' }} />
          <span>{agents.length} Active DSRs</span>
        </div>
      </div>

      {/* Search */}
      <div className="card">
        <div className="shops-search-wrapper" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
            <Search className="shops-search-icon" size={20} />
            <input
              type="text"
              placeholder="Search by name, email, or shop..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="shops-search-input"
            />
          </div>
          <select 
            value={genderFilter} 
            onChange={(e) => setGenderFilter(e.target.value)} 
            className="shops-search-input" 
            style={{ width: 'auto', paddingLeft: '1rem', cursor: 'pointer' }}
          >
            <option value="all">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <select 
            value={sortOrder} 
            onChange={(e) => setSortOrder(e.target.value)} 
            className="shops-search-input" 
            style={{ width: 'auto', paddingLeft: '1rem', cursor: 'pointer' }}
          >
            <option value="high">High Selling</option>
            <option value="low">Low Selling</option>
            <option value="youngest">Youngest</option>
            <option value="oldest">Oldest</option>
          </select>
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
                  Born {agent.dateOfBirth && !isNaN(new Date(agent.dateOfBirth).getTime()) ? format(new Date(agent.dateOfBirth), 'MMM dd, yyyy') : 'Unknown'}
                </div>
              </div>

              <div className="team-agent-stats">
                <div>
                  <p className="shop-stat-label">7-Day Sales</p>
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
          <p className="team-empty-text">No DSRs found matching your search</p>
        </div>
      )}
    </div>
  );
}
