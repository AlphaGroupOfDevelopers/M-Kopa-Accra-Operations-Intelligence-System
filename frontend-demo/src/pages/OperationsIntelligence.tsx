import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { AlertTriangle, MessageSquare, Activity } from 'lucide-react';
import { format, subDays } from 'date-fns';
import { clusterRemarksNLP, calculateZScore } from '../utils/intelligenceMath';
import './Dashboard.css';
import './OperationsIntelligence.css';

export default function OperationsIntelligence() {
  const { salesRecords, shops } = useApp();

  const operations = useMemo(() => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const last30Days = format(subDays(new Date(), 30), 'yyyy-MM-dd');

    // 1. Silent Shop Detection (Compliance)
    const todayReporting = new Set(salesRecords.filter(r => r.date === today).map(r => r.shopId));
    const silentShops = shops.filter(shop => !todayReporting.has(shop.id));

    // 2. Challenge Intelligence (NLP Vectorization Mock)
    const recentRemarks = salesRecords
      .filter(r => r.date >= last30Days && r.remarks)
      .map(r => r.remarks);
      
    const nlpClusters = clusterRemarksNLP(recentRemarks);

    // 3. Anomaly Detection (Z-Score)
    const anomalyAlerts = shops.map(shop => {
      // Get chronological daily sales for the shop
      const dailyTotals = Array.from({ length: 30 }).map((_, i) => {
        const d = format(subDays(new Date(), 29 - i), 'yyyy-MM-dd');
        return salesRecords
          .filter(r => r.shopId === shop.id && r.date === d)
          .reduce((sum, r) => sum + r.devicesSold, 0);
      });

      // We compare the most recent 3 days against the previous 27 days
      if (dailyTotals.length < 30) return null;
      
      const history = dailyTotals.slice(0, 27);
      const recentAvg = dailyTotals.slice(27, 30).reduce((a, b) => a + b, 0) / 3;
      
      const zScore = calculateZScore(recentAvg, history);
      
      return {
        shop,
        zScore,
        recentAvg,
        historicalAvg: history.reduce((a, b) => a + b, 0) / history.length
      };
    }).filter((a): a is NonNullable<typeof a> => a !== null && a.zScore <= -1.5) // Only negative anomalies (drops)
      .sort((a, b) => a.zScore - b.zScore);

    return {
      silentShops,
      nlpClusters,
      anomalyAlerts
    };
  }, [salesRecords, shops]);

  return (
    <div className="dashboard-container">
      <div className="bare-header">
        <h1 className="dashboard-title">Operations Overview</h1>
        <p className="dashboard-subtitle">Monitor shop activity, performance shifts, and field team feedback</p>
      </div>

      <div className="op-grid-cols-2">
        {/* Missing Reports */}
        <div className="card">
          <div className="ranking-header">
            <div className="metric-icon-wrapper icon-red" style={{ padding: '0.4rem' }}>
              <AlertTriangle size={18} />
            </div>
            <h2 className="ranking-title">Missing Reports</h2>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Shops that have not submitted today's sales report.
          </p>
          {operations.silentShops.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {operations.silentShops.map(shop => (
                <div key={shop.id} className="op-alert-box" style={{ borderLeft: '4px solid var(--accent-red)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p className="op-alert-title">{shop.name}</p>
                    <p style={{ color: 'var(--accent-red)', fontWeight: 600, fontSize: '0.8rem' }}>Attention Needed</p>
                  </div>
                  <p className="op-alert-sub">{shop.location}</p>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              <p style={{ color: 'var(--accent-green)', fontWeight: 600 }}>✓ 100% System Compliance</p>
            </div>
          )}
        </div>

        {/* Performance Alerts */}
        <div className="card">
          <div className="ranking-header">
            <div className="metric-icon-wrapper icon-orange" style={{ padding: '0.4rem' }}>
              <Activity size={18} />
            </div>
            <h2 className="ranking-title">Performance Alerts</h2>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Shops showing unusual changes in sales performance.
          </p>
          {operations.anomalyAlerts.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {operations.anomalyAlerts.map(alert => (
                <div key={alert.shop.id} className="op-alert-box" style={{ borderLeft: '4px solid var(--accent-orange)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <p className="op-alert-title">{alert.shop.name}</p>
                    <div style={{ textAlign: 'right' }}>
                      <span className="badge badge-black" style={{ backgroundColor: 'var(--accent-orange)', color: 'white' }}>
                        Investigate Drop
                      </span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <p style={{ color: 'var(--text-secondary)' }}>
                      Expected: <span style={{ color: 'var(--text-primary)' }}>{alert.historicalAvg.toFixed(1)}/day</span>
                    </p>
                    <p style={{ color: 'var(--text-secondary)' }}>
                      Actual: <span style={{ color: 'var(--accent-red)', fontWeight: 700 }}>{alert.recentAvg.toFixed(1)}/day</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              <p style={{ color: 'var(--text-secondary)' }}>No statistical anomalies detected</p>
            </div>
          )}
        </div>
      </div>

      {/* Common Field Challenges */}
      <div className="bare-content" style={{ marginTop: '1rem' }}>
        <div className="ranking-header">
          <div className="metric-icon-wrapper icon-purple" style={{ padding: '0.4rem' }}>
            <MessageSquare size={18} />
          </div>
          <h2 className="ranking-title">Common Field Challenges</h2>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Most frequently reported issues from sales teams.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          {operations.nlpClusters.map((cluster, index) => (
            <div key={index} style={{ 
              backgroundColor: 'var(--bg-secondary)', 
              borderRadius: '0.5rem', 
              padding: '1.25rem',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {cluster.clusterName}
                </h3>
                <span style={{ 
                  color: 'var(--accent-purple)', 
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}>
                  {cluster.size} reports
                </span>
              </div>
              <div style={{ 
                borderLeft: '2px solid var(--accent-purple)', 
                paddingLeft: '0.75rem',
                fontStyle: 'italic',
                color: 'var(--text-secondary)',
                fontSize: '0.875rem'
              }}>
                "{cluster.sample}"
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

