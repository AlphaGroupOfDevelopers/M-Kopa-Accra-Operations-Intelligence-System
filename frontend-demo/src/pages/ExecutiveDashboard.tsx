import { useSalesRecords, useAgents, useShops } from '../hooks/useQueries';
import { useMemo } from 'react';
import { AlertTriangle, FileDown, Calendar, Award, TrendingUp } from 'lucide-react';
import { format, subDays, startOfMonth } from 'date-fns';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import './Dashboard.css';
import './ExecutiveDashboard.css';

export default function ExecutiveDashboard() {
  const { data: salesRecords } = useSalesRecords();
  const { data: agents } = useAgents();
  const { data: shops } = useShops();
  

  const executiveData = useMemo(() => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const monthStart = format(startOfMonth(new Date()), 'yyyy-MM-dd');

    // Today's metrics
    const todaySales = salesRecords
      .filter(r => r.date === today)
      .reduce((sum, r) => sum + r.devicesSold, 0);

    const todayReporting = new Set(salesRecords.filter(r => r.date === today).map(r => r.shopId));
    const shopsReporting = todayReporting.size;

    // Best and worst performing shops today
    const shopPerformanceToday = shops.map(shop => {
      const sales = salesRecords
        .filter(r => r.shopId === shop.id && r.date === today)
        .reduce((sum, r) => sum + r.devicesSold, 0);
      return { shop, sales };
    }).sort((a, b) => b.sales - a.sales);

    const bestShop = shopPerformanceToday[0];
    const worstShop = shopPerformanceToday[shopPerformanceToday.length - 1];

    // Month-to-date sales
    const mtdSales = salesRecords
      .filter(r => r.date >= monthStart && r.date <= today)
      .reduce((sum, r) => sum + r.devicesSold, 0);

    // Last 7 days trend
    const last7DaysTrend = [];
    for (let i = 6; i >= 0; i--) {
      const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
      const sales = salesRecords
        .filter(r => r.date === date)
        .reduce((sum, r) => sum + r.devicesSold, 0);
      last7DaysTrend.push({
        date: format(subDays(new Date(), i), 'EEE'),
        sales,
      });
    }

    // Top challenges (last 30 days)
    const last30Days = format(subDays(new Date(), 30), 'yyyy-MM-dd');
    const remarksCounts: Record<string, number> = {};
    salesRecords
      .filter(r => r.date >= last30Days)
      .forEach(record => {
        const remark = record.remarks.toLowerCase();
        if (remark.includes('stock') || remark.includes('shortage')) {
          remarksCounts['Stock Issues'] = (remarksCounts['Stock Issues'] || 0) + 1;
        }
        if (remark.includes('transport') || remark.includes('delay')) {
          remarksCounts['Transport'] = (remarksCounts['Transport'] || 0) + 1;
        }
        if (remark.includes('network') || remark.includes('payment')) {
          remarksCounts['Tech Issues'] = (remarksCounts['Tech Issues'] || 0) + 1;
        }
        if (remark.includes('competition')) {
          remarksCounts['Competition'] = (remarksCounts['Competition'] || 0) + 1;
        }
      });

    const topChallenges = Object.entries(remarksCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 4);

    // Shop performance distribution
    const shopDistribution = shops.map(shop => {
      const sales = salesRecords
        .filter(r => r.shopId === shop.id && r.date >= last30Days)
        .reduce((sum, r) => sum + r.devicesSold, 0);
      return { name: shop.name, value: sales };
    }).sort((a, b) => b.value - a.value);

    return {
      todaySales,
      shopsReporting,
      bestShop,
      worstShop,
      mtdSales,
      last7DaysTrend,
      topChallenges,
      shopDistribution,
    };
  }, [salesRecords, shops]);

  const COLORS = ['#111827', '#39B54A', '#3b82f6', '#8b5cf6', '#ec4899', '#ea580c', '#eab308'];

  const handleExportReport = () => {
    alert('Monthly Operations Review exported successfully!\n\nThis is a demo - in production, this would generate a PDF/Excel report with all metrics.');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="dashboard-title">Executive Dashboard</h1>
          <p className="dashboard-subtitle">Your daily command center for network operations</p>
        </div>
        <button
          onClick={handleExportReport}
          className="btn btn-primary"
        >
          <FileDown size={20} />
          <span>Export Report</span>
        </button>
      </div>

      {/* Key Metrics */}
      <div className="metrics-grid">
        <div className="card metric-card">
          <div className="metric-header">
            <div>
              <p className="metric-label">Today's Sales</p>
              <p className="metric-value">{executiveData.todaySales}</p>
            </div>
            <div className="metric-icon-wrapper icon-green">
              <TrendingUp size={24} />
            </div>
          </div>
          <p className="metric-trend trend-neutral">phones sold</p>
        </div>

        <div className="card metric-card">
          <div className="metric-header">
            <div>
              <p className="metric-label">Shops Reporting</p>
              <p className="metric-value">{executiveData.shopsReporting}/{shops.length}</p>
            </div>
            <div className={`metric-icon-wrapper ${executiveData.shopsReporting === shops.length ? 'icon-green' : 'icon-orange'}`}>
              <AlertTriangle size={24} />
            </div>
          </div>
          <p className="metric-trend trend-neutral">shops active today</p>
        </div>

        <div className="card metric-card">
          <div className="metric-header">
            <div>
              <p className="metric-label">Best Shop Today</p>
              <p className="metric-value" style={{ fontSize: '1.5rem' }}>{executiveData.bestShop?.shop.name || 'N/A'}</p>
            </div>
            <div className="metric-icon-wrapper icon-orange" style={{ color: 'var(--accent-yellow)' }}>
              <Award size={24} />
            </div>
          </div>
          <p className="metric-trend trend-positive">{executiveData.bestShop?.sales || 0} phones</p>
        </div>

        <div className="card metric-card">
          <div className="metric-header">
            <div>
              <p className="metric-label">Month-to-Date</p>
              <p className="metric-value">{executiveData.mtdSales}</p>
            </div>
            <div className="metric-icon-wrapper icon-blue">
              <Calendar size={24} />
            </div>
          </div>
          <p className="metric-trend trend-neutral">total phones</p>
        </div>
      </div>

      {/* 7-Day Trend */}
      <div className="card">
        <h2 className="card-title">What changed since yesterday? (7-Day Trend)</h2>
        <div className="chart-container" style={{ height: '250px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={executiveData.last7DaysTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" axisLine={false} tickLine={false} dy={10} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: 'transparent' }} />
              <Legend />
              <Bar dataKey="sales" fill="var(--accent-green)" radius={[4, 4, 0, 0]} name="Daily Sales" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Shop Performance Distribution & Top Challenges */}
      <div className="rankings-grid">
        <div className="card">
          <h2 className="card-title" style={{ marginBottom: '1rem' }}>Which shops are performing best?</h2>
          <div className="chart-container" style={{ height: '300px', marginTop: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={executiveData.shopDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  stroke="var(--bg-card)"
                  strokeWidth={2}
                >
                  {executiveData.shopDistribution.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h2 className="card-title" style={{ marginBottom: '1rem' }}>What challenges are being reported?</h2>
          {executiveData.topChallenges.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {executiveData.topChallenges.map((challenge, index) => (
                <div key={challenge.name}>
                  <div className="challenge-header">
                    <span className="challenge-name">{challenge.name}</span>
                    <span className="challenge-value">{challenge.value}</span>
                  </div>
                  <div className="progress-bar-container">
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: `${(challenge.value / executiveData.topChallenges[0].value) * 100}%`,
                        backgroundColor: COLORS[index % COLORS.length],
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '3rem 0' }}>No challenges reported</p>
          )}
        </div>
      </div>

      {/* Performance Summary */}
      <div className="card">
        <h2 className="card-title" style={{ marginBottom: '1rem' }}>What needs my attention today?</h2>
        <div className="summary-grid">
          <div>
            <h3 className="summary-section-title">Top Performers</h3>
            <div>
              {executiveData.shopDistribution.slice(0, 3).map((shop, index) => (
                <div key={shop.name} className="top-performer-item">
                  <div className={`top-performer-rank ${
                    index === 0 ? 'rank-gold' : index === 1 ? 'rank-silver' : 'rank-bronze'
                  }`}>
                    {index + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p className="top-performer-name">{shop.name}</p>
                    <p className="top-performer-score">{shop.value} phones</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="summary-section-title">Business Health</h3>
            <ul className="summary-list">
              <li className="summary-list-item">
                <span className="summary-list-icon text-green">✓</span>
                <span>{agents.length} active agents across {shops.length} shops</span>
              </li>
              <li className="summary-list-item">
                <span className="summary-list-icon text-green">✓</span>
                <span>Average {(executiveData.mtdSales / new Date().getDate()).toFixed(1)} phones/day this month</span>
              </li>
              <li className="summary-list-item">
                <span className="summary-list-icon text-blue">ℹ</span>
                <span>Strongest performance in {executiveData.shopDistribution[0]?.name || 'N/A'}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="summary-section-title">What recommendations do I have?</h3>
            <ul className="summary-list">
              {executiveData.shopsReporting < shops.length && (
                <li className="summary-list-item text-orange">
                  <span className="summary-list-icon"><AlertTriangle size={16} /></span>
                  <span>Follow up with {shops.length - executiveData.shopsReporting} silent shop(s)</span>
                </li>
              )}
              {executiveData.topChallenges.length > 0 && (
                <li className="summary-list-item text-green">
                  <span className="summary-list-icon"><AlertTriangle size={16} /></span>
                  <span>Address {executiveData.topChallenges[0].name} ({executiveData.topChallenges[0].value} reports)</span>
                </li>
              )}
              <li className="summary-list-item text-green">
                <span className="summary-list-icon"><Award size={16} /></span>
                <span>Recognize top performers</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

