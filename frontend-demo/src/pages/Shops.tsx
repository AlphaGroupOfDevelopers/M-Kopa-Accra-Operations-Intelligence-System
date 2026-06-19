import { useMemo, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { Search, Store, MapPin, Users, TrendingUp } from 'lucide-react';
import { subDays, format } from 'date-fns';

export default function Shops() {
  const { shops, salesRecords, agents, assignments } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const shopsWithStats = useMemo(() => {
    const last30Days = format(subDays(new Date(), 30), 'yyyy-MM-dd');

    return shops.map(shop => {
      const shopSales = salesRecords
        .filter(r => r.shopId === shop.id && r.date >= last30Days)
        .reduce((sum, r) => sum + r.devicesSold, 0);

      const currentAgents = agents.filter(a => a.currentShopId === shop.id);

      const shopHistory = salesRecords.filter(r => r.shopId === shop.id);
      const avgDaily = shopHistory.length > 0 
        ? (shopHistory.reduce((sum, r) => sum + r.devicesSold, 0) / shopHistory.length).toFixed(1)
        : '0';

      return {
        ...shop,
        totalSales: shopSales,
        agentCount: currentAgents.length,
        avgDailySales: avgDaily,
      };
    }).sort((a, b) => b.totalSales - a.totalSales);
  }, [shops, salesRecords, agents]);

  const filteredShops = shopsWithStats.filter(shop =>
    shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shop.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shop.shopCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Shop Intelligence</h1>
          <p className="text-gray-600 mt-1">Monitor shop performance and team composition</p>
        </div>
        <div className="flex items-center bg-green-50 px-4 py-2 rounded-lg">
          <Store className="text-green-600 mr-2" size={20} />
          <span className="text-green-800 font-semibold">{shops.length} Active Shops</span>
        </div>
      </div>

      {/* Search */}
      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by shop name, location, or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Shops Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredShops.map((shop, index) => (
          <Link key={shop.id} to={`/shops/${shop.id}`}>
            <div className="card hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold ${
                    index === 0 ? 'bg-yellow-500' :
                    index === 1 ? 'bg-gray-400' :
                    index === 2 ? 'bg-orange-500' :
                    'bg-gradient-to-br from-green-500 to-green-700'
                  }`}>
                    <Store size={24} />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-bold text-gray-800">{shop.name}</h3>
                    <p className="text-xs text-gray-600">{shop.shopCode}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  shop.status === 'active' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {shop.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin size={14} className="mr-2" />
                  {shop.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users size={14} className="mr-2" />
                  {shop.agentCount} Active Agents
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600">30-Day Sales</p>
                    <p className="text-xl font-bold text-gray-800">{shop.totalSales}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Daily Avg</p>
                    <p className="text-xl font-bold text-gray-800">{shop.avgDailySales}</p>
                  </div>
                </div>
              </div>

              {index < 3 && (
                <div className="mt-3 flex items-center text-xs text-yellow-600 font-semibold">
                  <TrendingUp size={14} className="mr-1" />
                  Top {index + 1} Performer
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {filteredShops.length === 0 && (
        <div className="card text-center py-12">
          <Store className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-600">No shops found matching your search</p>
        </div>
      )}
    </div>
  );
}
