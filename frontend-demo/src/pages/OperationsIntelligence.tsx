import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { AlertTriangle, MessageSquare, RefreshCw, Users, Target } from 'lucide-react';
import { format, subDays } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function OperationsIntelligence() {
  const { salesRecords, shops, agents, assignments } = useApp();

  const operations = useMemo(() => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const last7Days = format(subDays(new Date(), 7), 'yyyy-MM-dd');
    const last30Days = format(subDays(new Date(), 30), 'yyyy-MM-dd');

    // Challenge Intelligence - Analyze remarks
    const remarksCounts: Record<string, number> = {};
    const recentRecords = salesRecords.filter(r => r.date >= last30Days);
    
    recentRecords.forEach(record => {
      const remark = record.remarks.toLowerCase();
      // Categorize remarks
      if (remark.includes('stock') || remark.includes('shortage')) {
        remarksCounts['Stock Shortage'] = (remarksCounts['Stock Shortage'] || 0) + 1;
      }
      if (remark.includes('transport') || remark.includes('delay')) {
        remarksCounts['Transport Delays'] = (remarksCounts['Transport Delays'] || 0) + 1;
      }
      if (remark.includes('network') || remark.includes('payment')) {
        remarksCounts['Network/Payment Issues'] = (remarksCounts['Network/Payment Issues'] || 0) + 1;
      }
      if (remark.includes('competition') || remark.includes('competitor')) {
        remarksCounts['Competition'] = (remarksCounts['Competition'] || 0) + 1;
      }
      if (remark.includes('power') || remark.includes('outage')) {
        remarksCounts['Power Outage'] = (remarksCounts['Power Outage'] || 0) + 1;
      }
      if (remark.includes('complaint')) {
        remarksCounts['Customer Complaints'] = (remarksCounts['Customer Complaints'] || 0) + 1;
      }
      if (remark.includes('security')) {
        remarksCounts['Security Concerns'] = (remarksCounts['Security Concerns'] || 0) + 1;
      }
      if (remark.includes('training') || remark.includes('need')) {
        remarksCounts['Training Needs'] = (remarksCounts['Training Needs'] || 0) + 1;
      }
    });

    const challengesData = Object.entries(remarksCounts)
      .map(([challenge, count]) => ({ challenge, count }))
      .sort((a, b) => b.count - a.count);

    // Silent Shop Detection
    const todayReporting = new Set(salesRecords.filter(r => r.date === today).map(r => r.shopId));
    const silentShops = shops.filter(shop => !todayReporting.has(shop.id));

    // Transfer Intelligence
    const transferredAgents = assignments.filter(a => a.endDate).map(transfer => {
      const agent = agents.find(ag => ag.id === transfer.agentId);
      const fromShop = shops.find(s => s.id === transfer.shopId);
      
      // Sales before transfer
      const beforeSales = salesRecords.filter(r =>
        r.agentId === transfer.agentId &&
        r.shopId === transfer.shopId &&
        r.date >= format(subDays(new Date(transfer.endDate!), 30), 'yyyy-MM-dd') &&
        r.date <= transfer.endDate!
      ).reduce((sum, r) => sum + r.devicesSold, 0);

      // Find next assignment
      const nextAssignment = assignments.find(a =>
        a.agentId === transfer.agentId &&
        a.startDate > (transfer.endDate || '')
      );

      const afterSales = nextAssignment ? salesRecords.filter(r =>
        r.agentId === transfer.agentId &&
        r.shopId === nextAssignment.shopId &&
        r.date >= nextAssignment.startDate &&
        r.date <= format(subDays(new Date(nextAssignment.startDate), -30), 'yyyy-MM-dd')
      ).reduce((sum, r) => sum + r.devicesSold, 0) : 0;

      const impact = beforeSales > 0 ? ((afterSales - beforeSales) / beforeSales * 100) : 0;

      return {
        agent,
        fromShop,
        toShop: nextAssignment ? shops.find(s => s.id === nextAssignment.shopId) : null,
        beforeSales,
        afterSales,
        impact,
        transferDate: transfer.endDate,
      };
    }).filter(t => t.toShop).slice(-10);

    // Shop Dependency Index - Shops relying heavily on one agent
    const shopDependency = shops.map(shop => {
      const shopAgentSales = agents
        .filter(a => a.currentShopId === shop.id)
        .map(agent => {
          const sales = salesRecords
            .filter(r => r.agentId === agent.id && r.shopId === shop.id && r.date >= last30Days)
            .reduce((sum, r) => sum + r.devicesSold, 0);
          return { agent, sales };
        })
        .sort((a, b) => b.sales - a.sales);

      const totalSales = shopAgentSales.reduce((sum, item) => sum + item.sales, 0);
      const topPerformerSales = shopAgentSales[0]?.sales || 0;
      const dependencyIndex = totalSales > 0 ? (topPerformerSales / totalSales * 100) : 0;

      return {
        shop,
        topPerformer: shopAgentSales[0],
        dependencyIndex,
        totalSales,
        agentCount: shopAgentSales.length,
      };
    }).filter(s => s.dependencyIndex > 60 && s.agentCount > 1)
      .sort((a, b) => b.dependencyIndex - a.dependencyIndex);

    // Shop Success Formula - Common factors among top performers
    const topShops = shops.map(shop => {
      const sales = salesRecords
        .filter(r => r.shopId === shop.id && r.date >= last30Days)
        .reduce((sum, r) => sum + r.devicesSold, 0);
      const agentCount = agents.filter(a => a.currentShopId === shop.id).length;
      return { shop, sales, agentCount, avgPerAgent: agentCount > 0 ? sales / agentCount : 0 };
    }).sort((a, b) => b.sales - a.sales).slice(0, 3);

    return {
      challengesData,
      silentShops,
      transferredAgents,
      shopDependency,
      topShops,
    };
  }, [salesRecords, shops, agents, assignments]);

  const COLORS = ['#39B54A', '#2E9339', '#6CCB82', '#ca8a04', '#65a30d', '#16a34a', '#059669'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Operations Intelligence</h1>
        <p className="text-gray-600 mt-1">Operational insights and challenge analysis</p>
      </div>

      {/* Challenge Intelligence */}
      <div className="card">
        <div className="flex items-center mb-4">
          <MessageSquare className="text-orange-600 mr-2" size={24} />
          <h2 className="text-xl font-bold text-gray-800">Challenge Intelligence (30 Days)</h2>
        </div>
        {operations.challengesData.length > 0 ? (
          <>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={operations.challengesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="challenge" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" name="Occurrences">
                  {operations.challengesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {operations.challengesData.slice(0, 6).map((item, index) => (
                <div key={item.challenge} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div 
                      className="w-4 h-4 rounded mr-3"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm font-semibold text-gray-800">{item.challenge}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-800">{item.count}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-gray-600 text-center py-6">No challenges detected</p>
        )}
      </div>

      {/* Silent Shop Detection */}
      <div className="card">
        <div className="flex items-center mb-4">
          <AlertTriangle className="text-red-600 mr-2" size={24} />
          <h2 className="text-xl font-bold text-gray-800">Silent Shop Detection</h2>
        </div>
        {operations.silentShops.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {operations.silentShops.map(shop => (
              <div key={shop.id} className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="font-semibold text-gray-800">{shop.name}</p>
                <p className="text-sm text-gray-600 mt-1">{shop.location}</p>
                <p className="text-xs text-red-600 mt-2 font-semibold">No reports today</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-green-600 font-semibold">✓ All shops reporting today</p>
          </div>
        )}
      </div>

      {/* Transfer Intelligence */}
      <div className="card">
        <div className="flex items-center mb-4">
          <RefreshCw className="text-blue-600 mr-2" size={24} />
          <h2 className="text-xl font-bold text-gray-800">Transfer Intelligence</h2>
        </div>
        {operations.transferredAgents.length > 0 ? (
          <div className="space-y-3">
            {operations.transferredAgents.map((transfer, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-gray-800">{transfer.agent?.name}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {transfer.fromShop?.name} → {transfer.toShop?.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Transfer Date: {transfer.transferDate ? format(new Date(transfer.transferDate), 'MMM dd, yyyy') : 'Unknown'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xl font-bold ${transfer.impact >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {transfer.impact >= 0 ? '+' : ''}{transfer.impact.toFixed(1)}%
                    </p>
                    <p className="text-xs text-gray-600">impact</p>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Before: {transfer.beforeSales} devices</p>
                  </div>
                  <div>
                    <p className="text-gray-600">After: {transfer.afterSales} devices</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center py-6">No recent transfers to analyze</p>
        )}
      </div>

      {/* Shop Dependency Index */}
      <div className="card">
        <div className="flex items-center mb-4">
          <Users className="text-purple-600 mr-2" size={24} />
          <h2 className="text-xl font-bold text-gray-800">Shop Dependency Index</h2>
        </div>
        <p className="text-sm text-gray-600 mb-4">Shops heavily reliant on a single performer</p>
        {operations.shopDependency.length > 0 ? (
          <div className="space-y-3">
            {operations.shopDependency.map(item => (
              <div key={item.shop.id} className="p-4 bg-purple-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-gray-800">{item.shop.name}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Top Performer: {item.topPerformer?.agent.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Team Size: {item.agentCount} agents
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-purple-600">{item.dependencyIndex.toFixed(0)}%</p>
                    <p className="text-xs text-gray-600">of total sales</p>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${item.dependencyIndex}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    ⚠️ High dependency risk - Consider team rebalancing
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center py-6">No high-dependency shops detected</p>
        )}
      </div>

      {/* Shop Success Formula */}
      <div className="card">
        <div className="flex items-center mb-4">
          <Target className="text-green-600 mr-2" size={24} />
          <h2 className="text-xl font-bold text-gray-800">Shop Success Formula</h2>
        </div>
        <p className="text-sm text-gray-600 mb-4">Common patterns in top-performing shops</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {operations.topShops.map((item, index) => (
            <div key={item.shop.id} className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <span className="ml-2 font-bold text-gray-800">{item.shop.name}</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Sales:</span>
                  <span className="font-bold text-gray-800">{item.sales}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Team Size:</span>
                  <span className="font-bold text-gray-800">{item.agentCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg/Agent:</span>
                  <span className="font-bold text-green-600">{item.avgPerAgent.toFixed(1)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm font-semibold text-blue-900">Success Factors:</p>
          <ul className="mt-2 space-y-1 text-sm text-blue-800">
            <li>✓ Balanced team composition (2-3 agents per shop)</li>
            <li>✓ High average sales per agent</li>
            <li>✓ Consistent daily performance</li>
            <li>✓ Low operational challenges reported</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

