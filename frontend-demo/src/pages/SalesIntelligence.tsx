import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { TrendingUp, TrendingDown, Target, Award, AlertCircle } from 'lucide-react';
import { format, subDays, subMonths } from 'date-fns';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function SalesIntelligence() {
  const { salesRecords, shops, agents } = useApp();

  const intelligence = useMemo(() => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const last7Days = format(subDays(new Date(), 7), 'yyyy-MM-dd');
    const last30Days = format(subDays(new Date(), 30), 'yyyy-MM-dd');
    const last60Days = format(subDays(new Date(), 60), 'yyyy-MM-dd');

    // Sales Momentum Meter
    const last30DaysSales = salesRecords.filter(r => r.date >= last30Days).reduce((sum, r) => sum + r.devicesSold, 0);
    const previous30DaysSales = salesRecords
      .filter(r => r.date >= last60Days && r.date < last30Days)
      .reduce((sum, r) => sum + r.devicesSold, 0);
    const growthRate = previous30DaysSales > 0 
      ? ((last30DaysSales - previous30DaysSales) / previous30DaysSales * 100)
      : 0;

    // Opportunity Detector - Growing shops
    const growingShops = shops.map(shop => {
      const recentSales = salesRecords
        .filter(r => r.shopId === shop.id && r.date >= last7Days)
        .reduce((sum, r) => sum + r.devicesSold, 0);
      const previousWeekSales = salesRecords
        .filter(r => {
          const date = new Date(r.date);
          const compareStart = subDays(new Date(), 14);
          const compareEnd = subDays(new Date(), 7);
          return r.shopId === shop.id && date >= compareStart && date < compareEnd;
        })
        .reduce((sum, r) => sum + r.devicesSold, 0);
      
      const growth = previousWeekSales > 0 
        ? ((recentSales - previousWeekSales) / previousWeekSales * 100)
        : 0;

      return {
        shop,
        recentSales,
        previousWeekSales,
        growth,
      };
    }).filter(s => s.growth > 10).sort((a, b) => b.growth - a.growth);

    // Declining shops
    const decliningShops = shops.map(shop => {
      const recentSales = salesRecords
        .filter(r => r.shopId === shop.id && r.date >= last7Days)
        .reduce((sum, r) => sum + r.devicesSold, 0);
      const previousWeekSales = salesRecords
        .filter(r => {
          const date = new Date(r.date);
          const compareStart = subDays(new Date(), 14);
          const compareEnd = subDays(new Date(), 7);
          return r.shopId === shop.id && date >= compareStart && date < compareEnd;
        })
        .reduce((sum, r) => sum + r.devicesSold, 0);
      
      const decline = previousWeekSales > 0 
        ? ((recentSales - previousWeekSales) / previousWeekSales * 100)
        : 0;

      return {
        shop,
        recentSales,
        previousWeekSales,
        decline,
      };
    }).filter(s => s.decline < -10).sort((a, b) => a.decline - b.decline);

    // Performance Forecasting - Next 30 days prediction
    const avgDailySalesLast30Days = last30DaysSales / 30;
    const predicted30DaysSales = Math.round(avgDailySalesLast30Days * 30 * (1 + growthRate / 100));

    // Shop rankings
    const shopRankings = shops.map(shop => {
      const sales = salesRecords
        .filter(r => r.shopId === shop.id && r.date >= last30Days)
        .reduce((sum, r) => sum + r.devicesSold, 0);
      return { shop, sales };
    }).sort((a, b) => b.sales - a.sales);

    // Monthly trend (last 6 months)
    const monthlyTrend = [];
    for (let i = 5; i >= 0; i--) {
      const monthStart = format(subMonths(new Date(), i), 'yyyy-MM-01');
      const monthEnd = i === 0 ? format(new Date(), 'yyyy-MM-dd') : format(subMonths(new Date(), i - 1), 'yyyy-MM-01');
      const sales = salesRecords
        .filter(r => r.date >= monthStart && r.date < monthEnd)
        .reduce((sum, r) => sum + r.devicesSold, 0);
      monthlyTrend.push({
        month: format(subMonths(new Date(), i), 'MMM yyyy'),
        sales,
      });
    }

    return {
      growthRate,
      growingShops,
      decliningShops,
      predicted30DaysSales,
      last30DaysSales,
      shopRankings,
      monthlyTrend,
    };
  }, [salesRecords, shops]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Sales Intelligence</h1>
        <p className="text-gray-600 mt-1">Advanced analytics and performance insights</p>
      </div>

      {/* Sales Momentum Meter */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-gray-700">Sales Momentum</h3>
            {intelligence.growthRate >= 0 ? (
              <TrendingUp className="text-green-600" size={24} />
            ) : (
              <TrendingDown className="text-red-600" size={24} />
            )}
          </div>
          <p className="text-3xl font-bold text-gray-800">
            {intelligence.growthRate >= 0 ? '+' : ''}{intelligence.growthRate.toFixed(1)}%
          </p>
          <p className="text-sm text-gray-600 mt-1">vs previous 30 days</p>
          <div className="mt-3 pt-3 border-t">
            <p className={`text-sm font-semibold ${
              intelligence.growthRate >= 10 ? 'text-green-600' :
              intelligence.growthRate >= 0 ? 'text-blue-600' :
              intelligence.growthRate >= -10 ? 'text-orange-600' :
              'text-red-600'
            }`}>
              {intelligence.growthRate >= 10 ? 'Strong Growth' :
               intelligence.growthRate >= 0 ? 'Positive Trend' :
               intelligence.growthRate >= -10 ? 'Slight Decline' :
               'Declining'}
            </p>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-gray-700">Last 30 Days</h3>
            <Target className="text-blue-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-gray-800">{intelligence.last30DaysSales}</p>
          <p className="text-sm text-gray-600 mt-1">devices sold</p>
          <div className="mt-3 pt-3 border-t">
            <p className="text-sm text-gray-600">
              Avg: {(intelligence.last30DaysSales / 30).toFixed(1)} devices/day
            </p>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-gray-700">30-Day Forecast</h3>
            <Award className="text-purple-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-gray-800">{intelligence.predicted30DaysSales}</p>
          <p className="text-sm text-gray-600 mt-1">projected sales</p>
          <div className="mt-3 pt-3 border-t">
            <p className="text-sm text-gray-600">
              Based on current trend
            </p>
          </div>
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-800 mb-4">6-Month Sales Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={intelligence.monthlyTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#39B54A" name="Devices Sold" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Opportunity Detector */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center mb-4">
            <TrendingUp className="text-green-600 mr-2" size={24} />
            <h2 className="text-xl font-bold text-gray-800">Growing Shops</h2>
          </div>
          {intelligence.growingShops.length > 0 ? (
            <div className="space-y-3">
              {intelligence.growingShops.map(item => (
                <div key={item.shop.id} className="p-3 bg-green-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-800">{item.shop.name}</p>
                      <p className="text-sm text-gray-600">{item.shop.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-green-600">+{item.growth.toFixed(1)}%</p>
                      <p className="text-xs text-gray-600">growth</p>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    <span>{item.previousWeekSales} → {item.recentSales} devices</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-6">No significant growth detected</p>
          )}
        </div>

        <div className="card">
          <div className="flex items-center mb-4">
            <AlertCircle className="text-red-600 mr-2" size={24} />
            <h2 className="text-xl font-bold text-gray-800">Declining Shops</h2>
          </div>
          {intelligence.decliningShops.length > 0 ? (
            <div className="space-y-3">
              {intelligence.decliningShops.map(item => (
                <div key={item.shop.id} className="p-3 bg-red-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-800">{item.shop.name}</p>
                      <p className="text-sm text-gray-600">{item.shop.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-red-600">{item.decline.toFixed(1)}%</p>
                      <p className="text-xs text-gray-600">decline</p>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    <span>{item.previousWeekSales} → {item.recentSales} devices</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-6">No significant declines detected</p>
          )}
        </div>
      </div>

      {/* Shop Rankings */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Shop Performance Rankings (30 Days)</h2>
        <div className="space-y-2">
          {intelligence.shopRankings.map((item, index) => (
            <div key={item.shop.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 font-bold ${
                  index === 0 ? 'bg-yellow-100 text-yellow-700' :
                  index === 1 ? 'bg-gray-200 text-gray-700' :
                  index === 2 ? 'bg-orange-100 text-orange-700' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {index + 1}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{item.shop.name}</p>
                  <p className="text-sm text-gray-600">{item.shop.location}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-gray-800">{item.sales}</p>
                <p className="text-xs text-gray-600">devices</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

