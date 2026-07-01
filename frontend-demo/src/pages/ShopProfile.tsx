import { useSalesRecords, useAgents, useShops, useAssignments } from '../hooks/useQueries';
import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Store, Calendar } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import './Dashboard.css';
import './ShopProfile.css';

export default function ShopProfile() {
  const { shopId } = useParams<{ shopId: string }>();
  const { data: salesRecords } = useSalesRecords();
  const { data: agents } = useAgents();
  const { data: shops } = useShops();
  const { data: assignments } = useAssignments();
  

  const shop = shops.find(s => s.id === shopId);

  const shopData = useMemo(() => {
    if (!shop) return null;

    // Current agents
    const currentAgents = agents.filter(a => a.currentShopId === shop.id);

    // All assignments for this shop
    const shopAssignments = assignments.filter(a => a.shopId === shop.id);

    // Historical agents
    const historicalAgentIds = new Set(shopAssignments.map(a => a.agentId));
    const allAgentsWhoWorkedHere = agents.filter(a => historicalAgentIds.has(a.id));

    // Total sales
    const totalSales = salesRecords
      .filter(r => r.shopId === shop.id)
      .reduce((sum, r) => sum + r.devicesSold, 0);

    // Current agents performance
    const agentPerformance = currentAgents.map(agent => {
      const agentSales = salesRecords
        .filter(r => r.agentId === agent.id && r.shopId === shop.id)
        .reduce((sum, r) => sum + r.devicesSold, 0);
      return {
        agent,
        sales: agentSales,
      };
    }).sort((a, b) => b.sales - a.sales);

    // Last 30 days trend
    const trendData = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = format(date, 'yyyy-MM-dd');
      const sales = salesRecords
        .filter(r => r.shopId === shop.id && r.date === dateStr)
        .reduce((sum, r) => sum + r.devicesSold, 0);
      trendData.push({
        date: format(date, 'MMM dd'),
        sales,
      });
    }

    // Historical staff tenure
    const staffTenure = shopAssignments.map(assignment => {
      const agent = agents.find(a => a.id === assignment.agentId);
      const start = new Date(assignment.startDate).getTime();
      const end = assignment.endDate ? new Date(assignment.endDate).getTime() : new Date().getTime();
      const daysActive = differenceInDays(end, start) + 1;

      // Group sales by month using shop sales for the period (credits both main and assistant)
      const monthlySales: Record<string, number> = {};
      
      salesRecords
        .filter(r => {
          if (r.shopId !== shop.id) return false;
          const recordTime = new Date(r.date).getTime();
          return recordTime >= start && recordTime <= end;
        })
        .forEach(r => {
          const monthYear = format(new Date(r.date), 'MMM yyyy');
          monthlySales[monthYear] = (monthlySales[monthYear] || 0) + r.devicesSold;
        });

      const totalSales = Object.values(monthlySales).reduce((sum, val) => sum + val, 0);
      const monthlySalesArray = Object.entries(monthlySales).map(([month, sales]) => ({ month, sales }));

      return {
        assignment,
        agent,
        daysActive,
        sales: totalSales,
        monthlySales: monthlySalesArray,
        status: assignment.endDate ? 'Past' : 'Current',
      };
    }).sort((a, b) => b.sales - a.sales);

    return {
      currentAgents,
      allAgentsWhoWorkedHere,
      totalSales,
      agentPerformance,
      trendData,
      staffTenure,
    };
  }, [shop, agents, assignments, salesRecords]);

  if (!shop || !shopData) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3rem 0' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Shop not found</p>
        <Link to="/shops" style={{ color: 'var(--accent-red)', marginTop: '1rem', display: 'inline-block', textDecoration: 'none' }}>
          Back to Shops
        </Link>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Link to="/shops" className="profile-back-link">
        <ArrowLeft size={20} style={{ marginRight: '0.5rem' }} />
        Back to Shops
      </Link>

      {/* Shop Header */}
      <div className="card">
        <div className="profile-header-card">
          <div className="profile-header-info">
            <div className="profile-header-icon">
              <Store size={40} />
            </div>
            <div className="profile-header-details">
              <h1 className="profile-title">{shop.name}</h1>
              <p className="profile-subtitle" style={{ textTransform: 'capitalize' }}>{shop.status} Shop</p>
            </div>
          </div>
          <span className={`profile-status ${shop.status === 'active' ? 'active' : 'inactive'}`}>
            {shop.status.toUpperCase()}
          </span>
        </div>

        <div className="profile-info-grid">
          <div className="profile-info-item">
            <Store className="profile-info-icon" size={20} />
            <div>
              <p className="profile-info-label">Shop Code</p>
              <p className="profile-info-value">{shop.shopCode}</p>
            </div>
          </div>
          <div className="profile-info-item">
            <MapPin className="profile-info-icon" size={20} />
            <div>
              <p className="profile-info-label">Location</p>
              <p className="profile-info-value">{shop.location}</p>
            </div>
          </div>
          <div className="profile-info-item">
            <MapPin className="profile-info-icon" size={20} />
            <div>
              <p className="profile-info-label">Region</p>
              <p className="profile-info-value">{shop.region}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Stats */}
      <div className="profile-stats-grid">
        <div className="card profile-stat-card">
          <p className="profile-stat-label">Total Sales (All Time)</p>
          <p className="profile-stat-value">{shopData.totalSales}</p>
          <p className="profile-stat-subtext">phones sold</p>
        </div>
        <div className="card profile-stat-card">
          <p className="profile-stat-label">Current Team Size</p>
          <p className="profile-stat-value">{shopData.currentAgents.length}</p>
          <p className="profile-stat-subtext">active agents</p>
        </div>
        <div className="card profile-stat-card">
          <p className="profile-stat-label">Total Staff History</p>
          <p className="profile-stat-value">{shopData.allAgentsWhoWorkedHere.length}</p>
          <p className="profile-stat-subtext">agents worked here</p>
        </div>
      </div>

      {/* Sales Trend */}
      <div className="card">
        <h2 className="card-title">30-Day Sales Trend</h2>
        <div className="chart-scroll-wrapper">
          <div className="chart-container" style={{ height: '300px', minWidth: '500px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={shopData.trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" axisLine={false} tickLine={false} dy={10} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{ stroke: 'var(--border-color)', strokeWidth: 1 }} />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="var(--accent-green)" strokeWidth={3} name="Phones Sold" dot={false} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Current Team Performance */}
      <div className="card">
        <h2 className="card-title" style={{ marginBottom: '1rem' }}>Current Team Performance</h2>
        {shopData.agentPerformance.length > 0 ? (
          <div className="profile-team-list">
            {shopData.agentPerformance.map((item) => (
              <Link key={item.agent.id} to={`/team-members/${item.agent.id}`} className="profile-team-item">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="profile-team-avatar">
                    {item.agent.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="profile-team-info">
                    <p className="profile-team-name">{item.agent.name}</p>
                    <p className="profile-team-email">{item.agent.email}</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p className="profile-team-sales">{item.sales}</p>
                  <p className="profile-team-sales-label">total sales</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '1.5rem 0' }}>No current team members</p>
        )}
      </div>

      {/* Staff Tenure History */}
      <div className="card">
        <h2 className="card-title" style={{ marginBottom: '1rem' }}>Staff Tenure & Performance History</h2>
        <div className="profile-history-list">
          {(() => {
            const currentStaff = shopData.staffTenure.filter(item => item.status === 'Current');
            const pastStaff = shopData.staffTenure.filter(item => item.status === 'Past');

            const renderHistoryItem = (item: any) => (
              <div key={item.assignment.id} className={`profile-history-item ${item.status === 'Current' ? 'current' : 'past'}`}>
                <div className="profile-history-header">
                  <div>
                    <div className="profile-history-agent">
                      <h3 className="profile-history-name">{item.agent?.name || 'Unknown Agent'}</h3>
                      <span className={`profile-history-status ${item.status === 'Current' ? 'current' : 'past'}`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="profile-history-dates">
                      <Calendar size={14} style={{ marginRight: '0.25rem' }} />
                      <span>
                        {format(new Date(item.assignment.startDate), 'MMM dd, yyyy')} 
                        {item.assignment.endDate 
                          ? ` - ${format(new Date(item.assignment.endDate), 'MMM dd, yyyy')}`
                          : ' - Present'
                        }
                      </span>
                      <span className="profile-history-days">
                        {item.daysActive} days
                      </span>
                    </div>
                    {item.assignment.reason && (
                      <p className="profile-history-reason">Reason: {item.assignment.reason}</p>
                    )}
                  </div>
                  <div className="profile-history-sales">
                    <p className="profile-history-sales-val">{item.sales}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>phones sold</p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                      {item.daysActive > 0 ? (item.sales / item.daysActive).toFixed(1) : '0'}/day
                    </p>
                  </div>
                </div>
                
                {/* Monthly Breakdown */}
                {item.monthlySales.length > 0 && (
                  <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                    <h4 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Monthly Performance</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '0.5rem', maxHeight: '160px', overflowY: 'auto', paddingRight: '0.5rem', scrollbarWidth: 'thin' }}>
                      {item.monthlySales.map((ms: any) => (
                        <div key={ms.month} style={{ backgroundColor: 'var(--bg-main)', padding: '0.5rem', borderRadius: '4px', textAlign: 'center' }}>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{ms.month}</p>
                          <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{ms.sales}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );

            return (
              <>
                {currentStaff.length > 0 && (
                  <div className="profile-history-group">
                    <h3 className="profile-history-group-title">Current Team</h3>
                    {currentStaff.map(renderHistoryItem)}
                  </div>
                )}
                {pastStaff.length > 0 && (
                  <div className="profile-history-group">
                    <h3 className="profile-history-group-title">Past Team</h3>
                    {pastStaff.map(renderHistoryItem)}
                  </div>
                )}
              </>
            );
          })()}
        </div>
      </div>
    </div>
  );
}

