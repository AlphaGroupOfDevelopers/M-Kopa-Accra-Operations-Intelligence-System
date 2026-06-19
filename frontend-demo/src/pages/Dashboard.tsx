import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { format, subDays, startOfDay, isAfter } from 'date-fns';
import { TrendingUp, TrendingDown, Users, Store, AlertTriangle, Award } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { salesRecords, agents, shops } = useApp();

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
        .filter(r => r.agentId === agent.id && r.date >= last7Days)
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Performance Dashboard</h1>
        <p className="text-gray-600 mt-1">Real-time overview of sales and operations</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Today's Sales</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{stats.todaySales}</p>
            </div>
            <div className={`p-3 rounded-full ${stats.growthRate >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
              {stats.growthRate >= 0 ? (
                <TrendingUp className="text-green-600" size={24} />
              ) : (
                <TrendingDown className="text-red-600" size={24} />
              )}
            </div>
          </div>
          <p className={`text-sm mt-2 ${stats.growthRate >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {stats.growthRate >= 0 ? '+' : ''}{stats.growthRate.toFixed(1)}% from yesterday
          </p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Last 7 Days</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{stats.last7DaysSales}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <BarChart size={24} className="text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Avg: {(stats.last7DaysSales / 7).toFixed(1)} devices/day
          </p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Agents</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{agents.length}</p>
            </div>
            <div className="p-3 rounded-full bg-purple-100">
              <Users className="text-purple-600" size={24} />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Across {shops.length} shops</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Silent Shops</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{stats.silentShops.length}</p>
            </div>
            <div className="p-3 rounded-full bg-orange-100">
              <AlertTriangle className="text-orange-600" size={24} />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">No reports today</p>
        </div>
      </div>

      {/* Sales Trend Chart */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-800 mb-4">14-Day Sales Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={stats.trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#39B54A" strokeWidth={2} name="Devices Sold" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Shop Rankings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center mb-4">
            <Award className="text-yellow-500 mr-2" size={24} />
            <h2 className="text-xl font-bold text-gray-800">Top Performing Shops (7 Days)</h2>
          </div>
          <div className="space-y-3">
            {stats.shopPerformance.slice(0, 5).map((item, index) => (
              <Link key={item.shop.id} to={`/shops/${item.shop.id}`}>
                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                      index === 0 ? 'bg-yellow-100 text-yellow-700' :
                      index === 1 ? 'bg-gray-100 text-gray-700' :
                      index === 2 ? 'bg-orange-100 text-orange-700' :
                      'bg-gray-50 text-gray-600'
                    } font-bold`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{item.shop.name}</p>
                      <p className="text-sm text-gray-600">{item.shop.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-800">{item.sales}</p>
                    <p className="text-xs text-gray-600">devices</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Agent Rankings */}
        <div className="card">
          <div className="flex items-center mb-4">
            <Users className="text-blue-500 mr-2" size={24} />
            <h2 className="text-xl font-bold text-gray-800">Top Performing Agents (7 Days)</h2>
          </div>
          <div className="space-y-3">
            {stats.agentPerformance.slice(0, 5).map((item, index) => (
              <Link key={item.agent.id} to={`/team-members/${item.agent.id}`}>
                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                      index === 0 ? 'bg-yellow-100 text-yellow-700' :
                      index === 1 ? 'bg-gray-100 text-gray-700' :
                      index === 2 ? 'bg-orange-100 text-orange-700' :
                      'bg-gray-50 text-gray-600'
                    } font-bold`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{item.agent.name}</p>
                      <p className="text-sm text-gray-600">{item.agent.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-800">{item.sales}</p>
                    <p className="text-xs text-gray-600">devices</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

