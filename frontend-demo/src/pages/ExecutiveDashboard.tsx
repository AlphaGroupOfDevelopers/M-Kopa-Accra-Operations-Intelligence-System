import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { TrendingUp, Award, AlertTriangle, FileDown, Calendar } from 'lucide-react';
import { format, subDays, startOfMonth, endOfMonth } from 'date-fns';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

export default function ExecutiveDashboard() {
  const { salesRecords, shops, agents } = useApp();

  const executiveData = useMemo(() => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const monthStart = format(startOfMonth(new Date()), 'yyyy-MM-dd');
    const monthEnd = format(endOfMonth(new Date()), 'yyyy-MM-dd');

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
      return { name: shop.name.split(' ')[0], value: sales };
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

  const COLORS = ['#dc2626', '#ea580c', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'];

  const handleExportReport = () => {
    alert('Monthly Operations Review exported successfully!\n\nThis is a demo - in production, this would generate a PDF/Excel report with all metrics.');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Executive Dashboard</h1>
          <p className="text-gray-600 mt-1">High-level operational overview and insights</p>
        </div>
        <button
          onClick={handleExportReport}
          className="flex items-center btn-primary"
        >
          <FileDown size={20} className="mr-2" />
          Export Monthly Report
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-gray-600">Today's Sales</h3>
            <TrendingUp className="text-[#39B54A]" size={20} />
          </div>
          <p className="text-4xl font-bold text-gray-800">{executiveData.todaySales}</p>
          <p className="text-xs text-gray-600 mt-1">devices sold</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-gray-600">Shops Reporting</h3>
            <AlertTriangle className={executiveData.shopsReporting === shops.length ? 'text-green-600' : 'text-orange-600'} size={20} />
          </div>
          <p className="text-4xl font-bold text-gray-800">{executiveData.shopsReporting}/{shops.length}</p>
          <p className="text-xs text-gray-600 mt-1">shops active today</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-gray-600">Best Shop Today</h3>
            <Award className="text-yellow-500" size={20} />
          </div>
          <p className="text-lg font-bold text-gray-800">{executiveData.bestShop?.shop.name.split(' ')[0] || 'N/A'}</p>
          <p className="text-2xl font-bold text-green-600">{executiveData.bestShop?.sales || 0} devices</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-gray-600">Month-to-Date</h3>
            <Calendar className="text-blue-600" size={20} />
          </div>
          <p className="text-4xl font-bold text-gray-800">{executiveData.mtdSales}</p>
          <p className="text-xs text-gray-600 mt-1">total devices</p>
        </div>
      </div>

      {/* 7-Day Trend */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-800 mb-4">7-Day Sales Trend</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={executiveData.last7DaysTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#39B54A" name="Daily Sales" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Shop Performance Distribution & Top Challenges */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Shop Performance (30 Days)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={executiveData.shopDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {executiveData.shopDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Top Operational Challenges</h2>
          {executiveData.topChallenges.length > 0 ? (
            <div className="space-y-4">
              {executiveData.topChallenges.map((challenge, index) => (
                <div key={challenge.name}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-semibold text-gray-700">{challenge.name}</span>
                    <span className="text-sm font-bold text-gray-800">{challenge.value}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${(challenge.value / executiveData.topChallenges[0].value) * 100}%`,
                        backgroundColor: COLORS[index],
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-12">No challenges reported</p>
          )}
        </div>
      </div>

      {/* Performance Summary */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Monthly Operations Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Top Performers</h3>
            <div className="space-y-2">
              {executiveData.shopDistribution.slice(0, 3).map((shop, index) => (
                <div key={shop.name} className="flex items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2 ${
                    index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">{shop.name}</p>
                    <p className="text-xs text-gray-600">{shop.value} devices</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Key Insights</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>{agents.length} active agents across {shops.length} shops</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Average {(executiveData.mtdSales / new Date().getDate()).toFixed(1)} devices/day this month</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">ℹ</span>
                <span>Strongest performance in {executiveData.shopDistribution[0]?.name || 'N/A'}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Action Items</h3>
            <ul className="space-y-2 text-sm">
              {executiveData.shopsReporting < shops.length && (
                <li className="flex items-start text-orange-600">
                  <AlertTriangle size={16} className="mr-2 flex-shrink-0 mt-0.5" />
                  <span>Follow up with {shops.length - executiveData.shopsReporting} silent shop(s)</span>
                </li>
              )}
              {executiveData.topChallenges.length > 0 && (
                <li className="flex items-start text-[#39B54A]">
                  <AlertTriangle size={16} className="mr-2 flex-shrink-0 mt-0.5" />
                  <span>Address {executiveData.topChallenges[0].name} ({executiveData.topChallenges[0].value} reports)</span>
                </li>
              )}
              <li className="flex items-start text-green-600">
                <Award size={16} className="mr-2 flex-shrink-0 mt-0.5" />
                <span>Recognize top performers</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

