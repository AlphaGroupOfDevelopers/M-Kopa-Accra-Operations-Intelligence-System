import { useSalesRecords, useAgents, useShops } from '../hooks/useQueries';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Store, MapPin, Users, TrendingUp } from 'lucide-react';
import { subDays, format } from 'date-fns';
import './Dashboard.css';
import './Shops.css';

export default function Shops() {
  const { data: salesRecords } = useSalesRecords();
  const { data: agents } = useAgents();
  const { data: shops } = useShops();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('high');

  const shopsWithStats = useMemo(() => {
    const last7Days = format(subDays(new Date(), 7), 'yyyy-MM-dd');

    return shops.map(shop => {
      const shopSales = salesRecords
        .filter(r => r.shopId === shop.id && r.date >= last7Days)
        .reduce((sum, r) => sum + r.devicesSold, 0);

      const currentAgents = agents.filter(a => a.currentShopId === shop.id);

      const shopHistory = salesRecords.filter(r => r.shopId === shop.id);
      const avgDaily = shopHistory.length > 0 
        ? (shopHistory.reduce((sum, r) => sum + r.devicesSold, 0) / shopHistory.length).toFixed(1)
        : '0';

      return {
        ...shop,
        totalSales: shopSales,
        agentCount: currentAgents.length,
        avgDailySales: avgDaily,
      };
    }).sort((a, b) => sortOrder === 'high' ? b.totalSales - a.totalSales : a.totalSales - b.totalSales);
  }, [shops, salesRecords, agents, sortOrder]);

  const filteredShops = shopsWithStats.filter(shop =>
    shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shop.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shop.shopCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="dashboard-title">Shop Intelligence</h1>
          <p className="dashboard-subtitle">Monitor shop performance and team composition</p>
        </div>
        <div className="shops-header-actions">
          <Store size={20} style={{ marginRight: '0.5rem' }} />
          <span>{shops.length} Active Shops</span>
        </div>
      </div>

      {/* Search */}
      <div className="card">
        <div className="shops-search-wrapper" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
            <Search className="shops-search-icon" size={20} />
            <input
              type="text"
              placeholder="Search by shop name, location, or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="shops-search-input"
            />
          </div>
          <select 
            value={sortOrder} 
            onChange={(e) => setSortOrder(e.target.value)} 
            className="shops-search-input" 
            style={{ width: 'auto', paddingLeft: '1rem', cursor: 'pointer' }}
          >
            <option value="high">High Selling</option>
            <option value="low">Low Selling</option>
          </select>
        </div>
      </div>

      {/* Shops Grid */}
      <div className="shops-grid">
        {filteredShops.map((shop, index) => (
          <Link key={shop.id} to={`/shops/${shop.id}`} style={{ textDecoration: 'none' }}>
            <div className="card shop-card">
              <div className="shop-card-header">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div className={`shop-card-icon ${
                    index === 0 ? 'gold' :
                    index === 1 ? 'silver' :
                    index === 2 ? 'bronze' :
                    'default'
                  }`}>
                    <Store size={24} />
                  </div>
                  <div className="shop-card-info-wrapper">
                    <h3 className="shop-card-title">{shop.name}</h3>
                    <p className="shop-card-code">{shop.shopCode}</p>
                  </div>
                </div>
                <span className={`shop-status-badge ${shop.status === 'active' ? 'active' : 'inactive'}`}>
                  {shop.status}
                </span>
              </div>

              <div className="shop-info-list">
                <div className="shop-info-item">
                  <MapPin size={14} className="shop-info-icon" />
                  {shop.location}
                </div>
                <div className="shop-info-item">
                  <Users size={14} className="shop-info-icon" />
                  {shop.agentCount} Active Agents
                </div>
              </div>

              <div className="shop-stats-grid">
                <div>
                  <p className="shop-stat-label">7-Day Sales</p>
                  <p className="shop-stat-value">{shop.totalSales}</p>
                </div>
                <div>
                  <p className="shop-stat-label">Daily Avg</p>
                  <p className="shop-stat-value">{shop.avgDailySales}</p>
                </div>
              </div>

              {index < 3 && sortOrder === 'high' && (
                <div className="shop-top-performer">
                  <TrendingUp size={14} style={{ marginRight: '0.25rem' }} />
                  Top {index + 1} Performer
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {filteredShops.length === 0 && (
        <div className="card shops-empty-state">
          <Store className="shops-empty-icon" size={48} />
          <p className="shops-empty-text">No shops found matching your search</p>
        </div>
      )}
    </div>
  );
}
