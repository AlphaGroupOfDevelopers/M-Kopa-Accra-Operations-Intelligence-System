import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { TrendingUp, Target, Award, Zap } from 'lucide-react';
import { format, subDays } from 'date-fns';
import { calculateSPI, calculateAEC } from '../utils/intelligenceMath';
import './Dashboard.css';
import './SalesIntelligence.css';

export default function PerformanceIntelligence() {
  const { salesRecords, shops, agents } = useApp();

  const performance = useMemo(() => {
    const last30Days = format(subDays(new Date(), 30), 'yyyy-MM-dd');
    const previous30Days = format(subDays(new Date(), 60), 'yyyy-MM-dd');

    const recentRecords = salesRecords.filter(r => r.date >= last30Days);
    const previousRecords = salesRecords.filter(r => r.date >= previous30Days && r.date < last30Days);

    // Get max values for normalization
    const maxSales = Math.max(...shops.map(shop => 
      recentRecords.filter(r => r.shopId === shop.id).reduce((sum, r) => sum + r.devicesSold, 0)
    ), 1);
    
    const shopVariances = shops.map(shop => {
      const dailySales = Array.from({ length: 30 }).map((_, i) => {
        const d = format(subDays(new Date(), 29 - i), 'yyyy-MM-dd');
        return recentRecords.filter(r => r.shopId === shop.id && r.date === d).reduce((sum, r) => sum + r.devicesSold, 0);
      });
      const mean = dailySales.reduce((a, b) => a + b, 0) / 30;
      return dailySales.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / 30;
    });
    const maxVariance = Math.max(...shopVariances, 1);

    // 1. Shop Performance Index (SPI)
    const shopPerformance = shops.map((shop, index) => {
      const sales = recentRecords.filter(r => r.shopId === shop.id).reduce((sum, r) => sum + r.devicesSold, 0);
      const prevSales = previousRecords.filter(r => r.shopId === shop.id).reduce((sum, r) => sum + r.devicesSold, 0);
      
      const growthRate = prevSales > 0 ? ((sales - prevSales) / prevSales) * 100 : 0;
      const variance = shopVariances[index];
      
      // Calculate compliance (days reported / 30)
      const daysReported = new Set(recentRecords.filter(r => r.shopId === shop.id).map(r => r.date)).size;
      const compliance = daysReported / 30;

      const spi = calculateSPI(sales, maxSales, growthRate, variance, maxVariance, compliance);

      // 3. Opportunity Score = (Growth * Consistency) / Risk
      const consistency = maxVariance > 0 ? (1 - (variance / maxVariance)) * 100 : 100;
      const risk = (1.01 - compliance) * 100; // Inverse compliance
      const opportunityScore = Math.max(0, Math.round(((Math.max(1, growthRate) * consistency) / Math.max(1, risk)) / 10));

      return {
        shop,
        spi,
        sales,
        growthRate,
        compliance: compliance * 100,
        opportunityScore
      };
    }).sort((a, b) => b.spi - a.spi);

    // 2. Agent Effectiveness Coefficient (AEC)
    const agentEffectiveness = agents.map(agent => {
      const sales = recentRecords.filter(r => r.agentId === agent.id).reduce((sum, r) => sum + r.devicesSold, 0);
      const shop = shops.find(s => s.id === agent.currentShopId);
      
      // Expected sales based on shop traffic multiplier
      const expectedPotential = (shop?.baseTraffic || 1) * 60; // Base expectation 60/month
      const aec = calculateAEC(sales, expectedPotential);

      return {
        agent,
        shop,
        sales,
        expectedPotential,
        aec
      };
    }).sort((a, b) => b.aec - a.aec);

    // 4. Momentum Meter (Statistical EMA over last 14 days vs prior 14 days)
    const last14 = format(subDays(new Date(), 14), 'yyyy-MM-dd');
    const prior14 = format(subDays(new Date(), 28), 'yyyy-MM-dd');
    
    const l14Sales = salesRecords.filter(r => r.date >= last14).reduce((sum, r) => sum + r.devicesSold, 0);
    const p14Sales = salesRecords.filter(r => r.date >= prior14 && r.date < last14).reduce((sum, r) => sum + r.devicesSold, 0);
    
    const momentum = l14Sales - p14Sales;

    return {
      shopPerformance,
      agentEffectiveness,
      momentum
    };
  }, [salesRecords, shops, agents]);

  return (
    <div className="dashboard-container">
      <div className="bare-header">
        <h1 className="dashboard-title">Sales Performance</h1>
        <p className="dashboard-subtitle">Analyze shop and team performance trends</p>
      </div>

      <div className="sales-momentum-grid" style={{ marginBottom: '2rem' }}>
        <div className="bare-content">
          <div className="ranking-header">
            <h3 className="ranking-title" style={{ fontSize: '1rem' }}>Network Sales Momentum</h3>
            <div className={`metric-icon-wrapper ${performance.momentum >= 0 ? 'icon-green' : 'icon-red'}`} style={{ padding: '0.4rem' }}>
              <Zap size={18} />
            </div>
          </div>
          <p className="sales-momentum-value">
            {performance.momentum >= 0 ? '+' : ''}{performance.momentum} phones
          </p>
          <p className="sales-momentum-label">Compared to previous 14 days</p>
        </div>
      </div>

      <div className="op-grid-cols-2">
        {/* Shop Performance */}
        <div className="card">
          <div className="ranking-header">
            <div className="metric-icon-wrapper icon-blue" style={{ padding: '0.4rem' }}>
              <Target size={18} />
            </div>
            <h2 className="ranking-title">Top Performing Shops</h2>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Ranked by sales volume, growth, and consistency.
          </p>
          <div className="sales-ranking-list">
            {performance.shopPerformance.map((item, index) => (
              <div key={item.shop.id} className="sales-ranking-item">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div className={`sales-ranking-rank ${
                    index === 0 ? 'rank-first' :
                    index === 1 ? 'rank-second' :
                    index === 2 ? 'rank-third' :
                    'rank-other'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="sales-shop-name">{item.shop.name}</p>
                    <p className="sales-shop-location" style={{ display: 'flex', gap: '0.5rem' }}>
                      <span>Grw: {item.growthRate.toFixed(1)}%</span>
                      <span>|</span>
                      <span>Cmp: {item.compliance.toFixed(0)}%</span>
                    </p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p className="sales-shop-growth" style={{ color: 'var(--accent-blue)', fontSize: '1.25rem' }}>
                    {item.spi}
                  </p>
                  <p className="sales-shop-growth-label">Perf Score</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agent Effectiveness */}
        <div className="card">
          <div className="ranking-header">
            <div className="metric-icon-wrapper icon-purple" style={{ padding: '0.4rem' }}>
              <Award size={18} />
            </div>
            <h2 className="ranking-title">Top Performing Sales Reps</h2>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Ranked by sales volume vs expected location potential.
          </p>
          <div className="sales-ranking-list">
            {performance.agentEffectiveness.slice(0, 6).map((item, index) => (
              <div key={item.agent.id} className="sales-ranking-item">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div className={`sales-ranking-rank ${
                    index === 0 ? 'rank-first' :
                    index === 1 ? 'rank-second' :
                    index === 2 ? 'rank-third' :
                    'rank-other'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="sales-shop-name">{item.agent.name}</p>
                    <p className="sales-shop-location">{item.shop?.name}</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p className="sales-shop-growth" style={{ color: item.aec >= 1 ? 'var(--accent-green)' : 'var(--accent-orange)', fontSize: '1.25rem' }}>
                    {item.aec.toFixed(2)}
                  </p>
                  <p className="sales-shop-growth-label">Effectiveness</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Growth Opportunities */}
      <div className="bare-content" style={{ marginTop: '1.5rem' }}>
        <div className="ranking-header">
          <div className="metric-icon-wrapper icon-green" style={{ padding: '0.4rem' }}>
            <TrendingUp size={18} />
          </div>
          <h2 className="ranking-title">Growth Opportunities</h2>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Shops showing strong improvement and growth potential.
        </p>
        <div className="op-grid-cols-3">
          {performance.shopPerformance.sort((a, b) => b.opportunityScore - a.opportunityScore).map(item => (
            <div key={item.shop.id} className="sales-shop-card growing">
              <div className="sales-shop-header">
                <div>
                  <p className="sales-shop-name">{item.shop.name}</p>
                  <p className="sales-shop-location">Growth Score</p>
                </div>
                <div>
                  <p className="sales-shop-growth" style={{ color: 'var(--accent-green)', fontSize: '1.5rem' }}>
                    {item.opportunityScore}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
