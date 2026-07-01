import { useSalesRecords, useAgents, useShops } from '../hooks/useQueries';
import { useMemo } from 'react';
import { format, subDays } from 'date-fns';
import { TrendingUp, TrendingDown, Users, AlertTriangle, Award } from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Link } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
  const { data: salesRecords } = useSalesRecords();
  const { data: agents } = useAgents();
  const { data: shops } = useShops();
  

  const stats = useMemo(() => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const yesterday = format(subDays(new Date(), 1), 'yyyy-MM-dd');
    const last7Days = format(subDays(new Date(), 7), 'yyyy-MM-dd');
    const last30Days = format(subDays(new Date(), 30), 'yyyy-MM-dd');

    // Today's sales
    const todaySales = salesRecords
      .filter(r => r.date === today)
      .reduce((sum, r) => sum + r.devicesSold, 0);

    // Yesterday's sales
    const yesterdaySales = salesRecords
      .filter(r => r.date === yesterday)
      .reduce((sum, r) => sum + r.devicesSold, 0);

    // Last 7 days
    const last7DaysSales = salesRecords
      .filter(r => r.date >= last7Days)
      .reduce((sum, r) => sum + r.devicesSold, 0);

    // Last 30 days
    const last30DaysSales = salesRecords
      .filter(r => r.date >= last30Days)
      .reduce((sum, r) => sum + r.devicesSold, 0);

    // Growth rate
    const growthRate = yesterdaySales > 0 
      ? ((todaySales - yesterdaySales) / yesterdaySales * 100)
      : 0;

    // Shop performance
    const shopPerformance = shops.map(shop => {
      const shopSales = salesRecords
        .filter(r => r.shopId === shop.id && r.date >= last7Days)
        .reduce((sum, r) => sum + r.devicesSold, 0);
      return { shop, sales: shopSales };
    }).sort((a, b) => b.sales - a.sales);

    // Agent performance
    const agentPerformance = agents.map(agent => {
      const agentSales = salesRecords
        .filter(r => r.dsrId === agent.id && r.date >= last7Days)
        .reduce((sum, r) => sum + r.devicesSold, 0);
      return { agent, sales: agentSales };
    }).sort((a, b) => b.sales - a.sales);

    // Silent shops (no sales today)
    const todayShopsReported = new Set(
      salesRecords.filter(r => r.date === today).map(r => r.shopId)
    );
    const silentShops = shops.filter(shop => !todayShopsReported.has(shop.id));

    // Last 14 days trend
    const trendData = [];
    for (let i = 13; i >= 0; i--) {
      const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
      const sales = salesRecords
        .filter(r => r.date === date)
        .reduce((sum, r) => sum + r.devicesSold, 0);
      trendData.push({
        date: format(subDays(new Date(), i), 'MMM dd'),
        sales,
      });
    }

    return {
      todaySales,
      yesterdaySales,
      last7DaysSales,
      last30DaysSales,
      growthRate,
      shopPerformance,
      agentPerformance,
      silentShops,
      trendData,
    };
  }, [salesRecords, agents, shops]);

  // Read theme variable if needed, but CSS handles dark mode variables
  // Area gradient for Recharts
  const chartGradient = (
    <defs>
      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="var(--accent-green)" stopOpacity={0.3}/>
        <stop offset="95%" stopColor="var(--accent-green)" stopOpacity={0}/>
      </linearGradient>
    </defs>
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Performance Dashboard</h1>
        <p className="dashboard-subtitle">Real-time overview of sales and operations</p>
      </div>

      {/* Key Metrics */}
      <div className="metrics-grid">
        <div className="card metric-card">
          <div className="metric-header">
            <div>
              <p className="metric-label">Today's Sales</p>
              <p className="metric-value">{stats.todaySales}</p>
            </div>
            <div className={`metric-icon-wrapper ${stats.growthRate >= 0 ? 'icon-green' : 'icon-red'}`}>
              {stats.growthRate >= 0 ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
            </div>
          </div>
          <p className={`metric-trend ${stats.growthRate >= 0 ? 'trend-positive' : 'trend-negative'}`}>
            {stats.growthRate >= 0 ? '+' : ''}{stats.growthRate.toFixed(1)}% from yesterday
          </p>
        </div>

        <div className="card metric-card">
          <div className="metric-header">
            <div>
              <p className="metric-label">Last 7 Days</p>
              <p className="metric-value">{stats.last7DaysSales}</p>
            </div>
            <div className="metric-icon-wrapper icon-blue">
              <TrendingUp size={24} />
            </div>
          </div>
          <p className="metric-trend trend-neutral">
            Avg: {(stats.last7DaysSales / 7).toFixed(1)} phones/day
          </p>
        </div>

        <div className="card metric-card">
          <div className="metric-header">
            <div>
              <p className="metric-label">Active DSRs</p>
              <p className="metric-value">{agents.length}</p>
            </div>
            <div className="metric-icon-wrapper icon-purple">
              <Users size={24} />
            </div>
          </div>
          <p className="metric-trend trend-neutral">Across {shops.length} shops</p>
        </div>

        <div className="card metric-card">
          <div className="metric-header">
            <div>
              <p className="metric-label">Silent Shops</p>
              <p className="metric-value">{stats.silentShops.length}</p>
            </div>
            <div className="metric-icon-wrapper icon-orange">
              <AlertTriangle size={24} />
            </div>
          </div>
          <p className="metric-trend trend-neutral">No reports today</p>
        </div>
      </div>

      {/* Sales Trend Chart */}
      <div className="card">
        <h2 className="card-title">14-Day Sales Trend</h2>
        <div className="scrollable-container">
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                {chartGradient}
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" axisLine={false} tickLine={false} dy={10} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="var(--accent-green)" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorSales)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Shop Rankings */}
      <div className="rankings-grid">
        <div className="card">
          <div className="ranking-header">
            <div className="metric-icon-wrapper icon-orange" style={{ padding: '0.5rem' }}>
              <Award size={20} />
            </div>
            <h2 className="ranking-title">Top Shops (7 Days)</h2>
          </div>
          <div className="ranking-list">
            {stats.shopPerformance.slice(0, 5).map((item, index) => (
              <Link key={item.shop.id} to={`/shops/${item.shop.id}`} className="ranking-item">
                <div className="ranking-item-left">
                  <div className={`rank-badge ${
                    index === 0 ? 'rank-1' :
                    index === 1 ? 'rank-2' :
                    index === 2 ? 'rank-3' : 'rank-other'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="ranking-name">{item.shop.name}</p>
                    <p className="ranking-sub">{item.shop.location}</p>
                  </div>
                </div>
                <div className="ranking-item-right">
                  <p className="ranking-score">{item.sales}</p>
                  <p className="ranking-score-label">devices</p>
                </div>
              </Link>
            ))}
          </div>
          <Link to="/shops" className="see-more-link">See All Shops</Link>
        </div>

        {/* Agent Rankings */}
        <div className="card">
          <div className="ranking-header">
            <div className="metric-icon-wrapper icon-blue" style={{ padding: '0.5rem' }}>
              <Users size={20} />
            </div>
            <h2 className="ranking-title">Top DSRs (7 Days)</h2>
          </div>
          <div className="ranking-list">
            {stats.agentPerformance.slice(0, 5).map((item, index) => (
              <Link key={item.agent.id} to={`/team-members/${item.agent.id}`} className="ranking-item">
                <div className="ranking-item-left">
                  <div className={`rank-badge ${
                    index === 0 ? 'rank-1' :
                    index === 1 ? 'rank-2' :
                    index === 2 ? 'rank-3' : 'rank-other'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="ranking-name">{item.agent.name}</p>
                    <p className="ranking-sub">{item.agent.email}</p>
                  </div>
                </div>
                <div className="ranking-item-right">
                  <p className="ranking-score">{item.sales}</p>
                  <p className="ranking-score-label">devices</p>
                </div>
              </Link>
            ))}
          </div>
          <Link to="/team-members" className="see-more-link">See All DSRs</Link>
        </div>
      </div>
    </div>
  );
}

