import { useMemo, useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldAlert, Activity, RefreshCw } from 'lucide-react';
import { format, subDays } from 'date-fns';
import { runMonteCarloRiskSimulation } from '../utils/intelligenceMath';
import './Dashboard.css';
import './SalesIntelligence.css';

export default function PredictiveIntelligence() {
  const { salesRecords, shops } = useApp();
  const [iterations, setIterations] = useState(1000);

  const predictiveData = useMemo(() => {
    // We calculate a Monte Carlo simulation for network-wide risk
    const dailyTotals = Array.from({ length: 30 }).map((_, i) => {
      const d = format(subDays(new Date(), 29 - i), 'yyyy-MM-dd');
      return salesRecords
        .filter(r => r.date === d)
        .reduce((sum, r) => sum + r.devicesSold, 0);
    });

    const mean = dailyTotals.reduce((a, b) => a + b, 0) / 30;
    const variance = dailyTotals.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / 30;
    const stdDev = Math.sqrt(variance);
    
    // Critical threshold: dropping 15% below recent average
    const criticalThreshold = mean * 30 * 0.85; 
    
    const networkRisk = runMonteCarloRiskSimulation(mean, stdDev, iterations, 30, criticalThreshold);

    // Shop Level Predictions
    const shopPredictions = shops.map(shop => {
      const shopDaily = Array.from({ length: 30 }).map((_, i) => {
        const d = format(subDays(new Date(), 29 - i), 'yyyy-MM-dd');
        return salesRecords
          .filter(r => r.shopId === shop.id && r.date === d)
          .reduce((sum, r) => sum + r.devicesSold, 0);
      });
      
      const sMean = shopDaily.reduce((a, b) => a + b, 0) / 30;
      const sVar = shopDaily.reduce((a, b) => a + Math.pow(b - sMean, 2), 0) / 30;
      const sStd = Math.sqrt(sVar);
      
      const sCrit = sMean * 30 * 0.80; // 20% drop threshold for shops
      const risk = runMonteCarloRiskSimulation(sMean, sStd, iterations, 30, sCrit);
      
      return {
        shop,
        risk
      };
    }).sort((a, b) => b.risk.riskProbability - a.risk.riskProbability);

    return {
      networkRisk,
      shopPredictions,
      mean,
      stdDev
    };
  }, [salesRecords, shops, iterations]);

  return (
    <div className="dashboard-container">
      <div className="bare-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="dashboard-title">Business Insights</h1>
          <p className="dashboard-subtitle">Analyze future business trends and expected performance</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            className="btn btn-primary" 
            onClick={() => setIterations(1000)} // Triggers re-render
          >
            <RefreshCw size={14} /> Refresh Insights
          </button>
        </div>
      </div>

      <div className="sales-momentum-grid" style={{ marginBottom: '2rem' }}>
        <div className="bare-content">
          <div className="ranking-header">
            <h3 className="ranking-title" style={{ fontSize: '1rem' }}>Expected Performance</h3>
            <div className={`metric-icon-wrapper ${predictiveData.networkRisk.riskProbability > 20 ? 'icon-red' : 'icon-green'}`} style={{ padding: '0.5rem' }}>
              <ShieldAlert size={20} />
            </div>
          </div>
          <p className="sales-momentum-value" style={{ color: predictiveData.networkRisk.riskProbability > 20 ? 'var(--accent-red)' : 'var(--accent-green)' }}>
            {predictiveData.networkRisk.riskProbability.toFixed(1)}%
          </p>
          <p className="sales-momentum-label">Estimated risk of sales dropping below target next month</p>
          
          <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Expected Volume</p>
              <p style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)' }}>{predictiveData.networkRisk.avgExpected.toFixed(0)}</p>
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Conservative Estimate</p>
              <p style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--accent-red)' }}>{predictiveData.networkRisk.p10.toFixed(0)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="ranking-header">
          <div className="metric-icon-wrapper icon-orange" style={{ padding: '0.4rem' }}>
            <Activity size={18} />
          </div>
          <h2 className="ranking-title">Shop Performance Outlook</h2>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Expected performance outlook for individual locations.
        </p>

        <div className="op-grid-cols-3">
          {predictiveData.shopPredictions.map((item) => {
            const isHighRisk = item.risk.riskProbability > 25;
            const isMediumRisk = item.risk.riskProbability > 10;
            
            return (
              <div key={item.shop.id} className="sales-shop-card" style={{ 
                borderLeft: `4px solid ${isHighRisk ? 'var(--accent-red)' : isMediumRisk ? 'var(--accent-orange)' : 'var(--accent-green)'}` 
              }}>
                <div className="sales-shop-header">
                  <div>
                    <p className="sales-shop-name">{item.shop.name}</p>
                    <p className="sales-shop-location">Risk: {isHighRisk ? 'HIGH' : isMediumRisk ? 'MEDIUM' : 'LOW'}</p>
                  </div>
                  <div>
                    <p className="sales-shop-growth" style={{ 
                      color: isHighRisk ? 'var(--accent-red)' : isMediumRisk ? 'var(--accent-orange)' : 'var(--accent-green)', 
                      fontSize: '1.25rem',
                      fontWeight: 600
                    }}>
                      {item.risk.riskProbability.toFixed(1)}% Risk
                    </p>
                  </div>
                </div>
                
                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-secondary)' }}>Expected: </span>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.risk.avgExpected.toFixed(0)}</span>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-secondary)' }}>Conservative: </span>
                    <span style={{ fontWeight: 600, color: 'var(--accent-red)' }}>{item.risk.p10.toFixed(0)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
