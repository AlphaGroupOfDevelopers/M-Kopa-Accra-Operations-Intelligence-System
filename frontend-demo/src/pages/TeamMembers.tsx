import { useMemo, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { Search, Users, TrendingUp, Mail, Phone } from 'lucide-react';
import { subDays, format } from 'date-fns';

export default function TeamMembers() {
  const { agents, salesRecords, shops } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const agentsWithStats = useMemo(() => {
    const last30Days = format(subDays(new Date(), 30), 'yyyy-MM-dd');

    return agents.map(agent => {
      const agentSales = salesRecords
        .filter(r => r.agentId === agent.id && r.date >= last30Days)
        .reduce((sum, r) => sum + r.devicesSold, 0);

      const currentShop = shops.find(s => s.id === agent.currentShopId);

      return {
        ...agent,
        totalSales: agentSales,
        avgDailySales: (agentSales / 30).toFixed(1),
        currentShopName: currentShop?.name || 'Unknown',
      };
    }).sort((a, b) => b.totalSales - a.totalSales);
  }, [agents, salesRecords, shops]);

  const filteredAgents = agentsWithStats.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.currentShopName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Team Members</h1>
          <p className="text-gray-600 mt-1">Manage and view agent profiles and performance</p>
        </div>
        <div className="flex items-center bg-blue-50 px-4 py-2 rounded-lg">
          <Users className="text-blue-600 mr-2" size={20} />
          <span className="text-blue-800 font-semibold">{agents.length} Active Agents</span>
        </div>
      </div>

      {/* Search */}
      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name, email, or shop..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map(agent => (
          <Link key={agent.id} to={`/team-members/${agent.id}`}>
            <div className="card hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#39B54A] to-[#1F3E35] rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {agent.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="ml-3">
                    <h3 className="font-bold text-gray-800">{agent.name}</h3>
                    <p className="text-sm text-gray-600">{agent.currentShopName}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  agent.status === 'active' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {agent.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail size={14} className="mr-2" />
                  {agent.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone size={14} className="mr-2" />
                  {agent.phone}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600">30-Day Sales</p>
                    <p className="text-xl font-bold text-gray-800">{agent.totalSales}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Daily Avg</p>
                    <p className="text-xl font-bold text-gray-800">{agent.avgDailySales}</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredAgents.length === 0 && (
        <div className="card text-center py-12">
          <Users className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-600">No agents found matching your search</p>
        </div>
      )}
    </div>
  );
}

