import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ArrowLeft, MapPin, Store, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function ShopProfile() {
  const { shopId } = useParams<{ shopId: string }>();
  const { shops, agents, assignments, salesRecords } = useApp();

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
      const daysActive = assignment.endDate
        ? Math.ceil((new Date(assignment.endDate).getTime() - new Date(assignment.startDate).getTime()) / (1000 * 60 * 60 * 24))
        : Math.ceil((new Date().getTime() - new Date(assignment.startDate).getTime()) / (1000 * 60 * 60 * 24));

      const assignmentSales = salesRecords
        .filter(r => r.agentId === assignment.agentId && r.shopId === shop.id)
        .reduce((sum, r) => sum + r.devicesSold, 0);

      return {
        assignment,
        agent,
        daysActive,
        sales: assignmentSales,
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
      <div className="card text-center py-12">
        <p className="text-gray-600">Shop not found</p>
        <Link to="/shops" className="text-red-600 hover:text-red-700 mt-4 inline-block">
          Back to Shops
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link to="/shops" className="flex items-center text-gray-600 hover:text-gray-800">
        <ArrowLeft size={20} className="mr-2" />
        Back to Shops
      </Link>

      {/* Shop Header */}
      <div className="card">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center text-white">
              <Store size={40} />
            </div>
            <div className="ml-6">
              <h1 className="text-3xl font-bold text-gray-800">{shop.name}</h1>
              <p className="text-gray-600 mt-1">{shop.shopCode}</p>
              <div className="flex items-center mt-2">
                <MapPin size={16} className="text-gray-500 mr-1" />
                <span className="text-sm text-gray-600">{shop.location}, {shop.region}</span>
              </div>
            </div>
          </div>
          <span className={`px-4 py-2 rounded-full font-semibold ${
            shop.status === 'active' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-gray-100 text-gray-700'
          }`}>
            {shop.status.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <p className="text-sm text-gray-600">Total Sales (All Time)</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{shopData.totalSales}</p>
          <p className="text-xs text-gray-600 mt-1">devices sold</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600">Current Team Size</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{shopData.currentAgents.length}</p>
          <p className="text-xs text-gray-600 mt-1">active agents</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600">Total Staff History</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{shopData.allAgentsWhoWorkedHere.length}</p>
          <p className="text-xs text-gray-600 mt-1">agents worked here</p>
        </div>
      </div>

      {/* Sales Trend */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-800 mb-4">30-Day Sales Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={shopData.trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#39B54A" strokeWidth={2} name="Devices Sold" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Current Team Performance */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Current Team Performance</h2>
        {shopData.agentPerformance.length > 0 ? (
          <div className="space-y-3">
            {shopData.agentPerformance.map((item) => (
              <Link key={item.agent.id} to={`/team-members/${item.agent.id}`}>
                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center text-white font-bold">
                      {item.agent.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold text-gray-800">{item.agent.name}</p>
                      <p className="text-sm text-gray-600">{item.agent.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-gray-800">{item.sales}</p>
                    <p className="text-xs text-gray-600">total sales</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center py-6">No current team members</p>
        )}
      </div>

      {/* Staff Tenure History */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Staff Tenure & Performance History</h2>
        <div className="space-y-3">
          {shopData.staffTenure.map(item => (
            <div key={item.assignment.id} className="border-l-4 border-[#39B54A] pl-4 py-2">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <h3 className="font-bold text-gray-800">{item.agent?.name || 'Unknown Agent'}</h3>
                    <span className={`ml-3 px-2 py-1 text-xs rounded-full ${
                      item.status === 'Current' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <Calendar size={14} className="mr-1" />
                    <span>
                      {format(new Date(item.assignment.startDate), 'MMM dd, yyyy')} 
                      {item.assignment.endDate 
                        ? ` - ${format(new Date(item.assignment.endDate), 'MMM dd, yyyy')}`
                        : ' - Present'
                      }
                    </span>
                    <span className="ml-3 text-xs bg-gray-100 px-2 py-1 rounded">
                      {item.daysActive} days
                    </span>
                  </div>
                  {item.assignment.reason && (
                    <p className="text-xs text-gray-600 mt-1 italic">Reason: {item.assignment.reason}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-800">{item.sales}</p>
                  <p className="text-xs text-gray-600">devices sold</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.daysActive > 0 ? (item.sales / item.daysActive).toFixed(1) : '0'}/day
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

