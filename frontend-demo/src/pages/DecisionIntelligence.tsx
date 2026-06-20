import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { GitMerge, Brain, ArrowRight, TrendingUp } from 'lucide-react';
import { calculateAEC } from '../utils/intelligenceMath';
import { format, subDays } from 'date-fns';
import './Dashboard.css';
import './DecisionIntelligence.css';

export default function DecisionIntelligence() {
  const { salesRecords, shops, agents } = useApp();

  const decisions = useMemo(() => {
    const last30Days = format(subDays(new Date(), 30), 'yyyy-MM-dd');
    const recentRecords = salesRecords.filter(r => r.date >= last30Days);

    // 1. Calculate base performance
    const shopMetrics = shops.map(shop => {
      const sales = recentRecords.filter(r => r.shopId === shop.id).reduce((sum, r) => sum + r.devicesSold, 0);
      const expectedPotential = (shop.baseTraffic || 1) * 60;
      return { shop, sales, expectedPotential };
    });

    const agentMetrics = agents.map(agent => {
      const sales = recentRecords.filter(r => r.agentId === agent.id).reduce((sum, r) => sum + r.devicesSold, 0);
      const currentShop = shops.find(s => s.id === agent.currentShopId);
      const expectedPotential = (currentShop?.baseTraffic || 1) * 60;
      const aec = calculateAEC(sales, expectedPotential);
      return { agent, currentShop, sales, expectedPotential, aec };
    });

    // 2. Identify Transfer Opportunities (Hungarian Algorithm Mock / Greedy Match)
    // Find highest AEC agents in lowest potential shops
    const topAgents = agentMetrics.filter(a => a.aec > 1.2).sort((a, b) => b.aec - a.aec);
    // Find lowest AEC agents (or understaffed) in highest potential shops
    const highPotentialShops = shopMetrics.filter(s => s.expectedPotential > 60).sort((a, b) => b.expectedPotential - a.expectedPotential);

    const recommendedTransfers: any[] = [];

    // Simple greedy approach for demo purposes
    for (const agent of topAgents) {
      if (recommendedTransfers.length >= 3) break; // Limit to top 3 recommendations
      
      const targetShop = highPotentialShops.find(s => 
        s.shop.id !== agent.currentShop?.id && 
        !recommendedTransfers.find(t => t.toShop.id === s.shop.id)
      );

      if (targetShop && agent.currentShop) {
        // Calculate Expected ROI
        // If agent moves to higher potential shop, expected sales = AEC * new Potential
        const currentExpected = agent.sales;
        const newExpectedSales = agent.aec * targetShop.expectedPotential;
        const variance = newExpectedSales - currentExpected;
        
        if (variance > 0) {
          recommendedTransfers.push({
            agent: agent.agent,
            fromShop: agent.currentShop,
            toShop: targetShop.shop,
            currentSales: agent.sales,
            expectedSales: agent.expectedPotential,
            projectedLift: variance
          });
        }
      }
    }

    return {
      recommendedTransfers
    };
  }, [salesRecords, shops, agents]);

  return (
    <div className="dashboard-container">
      <div className="bare-header di-header">
        <div>
          <h1 className="dashboard-title">Recommendations</h1>
          <p className="dashboard-subtitle">Suggested actions to improve business outcomes</p>
        </div>
      </div>

      <div className="bare-content">
        <div className="ranking-header">
          <div className="metric-icon-wrapper icon-blue" style={{ padding: '0.4rem' }}>
            <Brain size={18} />
          </div>
          <h2 className="ranking-title">Transfer Impact</h2>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Expected impact of recommended staff transfers on shop performance.
        </p>

        {decisions.recommendedTransfers.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {decisions.recommendedTransfers.map((transfer, index) => (
              <div key={index} className="di-transfer-card">
                <div className="di-transfer-left">
                  {/* Agent Info */}
                  <div className="di-transfer-agent">
                    <p style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1.125rem' }}>{transfer.agent.name}</p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                      Recent Sales: <span style={{ color: 'var(--accent-green)', fontWeight: 600 }}>{transfer.currentSales}</span> (Target: {transfer.expectedSales})
                    </p>
                  </div>

                  {/* Transfer Flow */}
                  <div className="di-transfer-flow">
                    <div className="di-transfer-location">
                      <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>From</p>
                      <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{transfer.fromShop.name}</p>
                    </div>
                    <ArrowRight size={20} style={{ color: 'var(--accent-blue)', flexShrink: 0 }} />
                    <div className="di-transfer-location">
                      <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>To</p>
                      <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{transfer.toShop.name}</p>
                    </div>
                  </div>
                </div>

                {/* Financial Impact */}
                <div className="di-transfer-impact">
                  <p className="di-impact-header">
                    <TrendingUp size={14} /> Expected Lift
                  </p>
                  <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-green)' }}>
                    +{transfer.projectedLift.toFixed(0)} phones
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-secondary)' }}>
            <GitMerge size={48} style={{ margin: '0 auto', marginBottom: '1rem', opacity: 0.2 }} />
            <p>Team allocation is currently optimal.</p>
            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>No high-impact transfer opportunities detected.</p>
          </div>
        )}
      </div>
    </div>
  );
}
