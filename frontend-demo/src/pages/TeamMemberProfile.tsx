import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Mail, Phone, Calendar, GraduationCap, MapPin } from 'lucide-react';
import { format, formatDistance } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function TeamMemberProfile() {
  const { agentId } = useParams<{ agentId: string }>();
  const { agents, shops, assignments, salesRecords } = useApp();

  const agent = agents.find(a => a.id === agentId);
  const currentShop = shops.find(s => s.id === agent?.currentShopId);

  const agentData = useMemo(() => {
    if (!agent) return null;

    // Get all assignments for this agent
    const agentAssignments = assignments
      .filter(a => a.agentId === agent.id)
      .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

    // Calculate total sales
    const totalSales = salesRecords
      .filter(r => r.agentId === agent.id)
      .reduce((sum, r) => sum + r.devicesSold, 0);

    // Get last 30 days performance per assignment
    const assignmentPerformance = agentAssignments.map(assignment => {
      const shop = shops.find(s => s.id === assignment.shopId);
      const assignmentSales = salesRecords
        .filter(r => r.agentId === agent.id && r.shopId === assignment.shopId)
        .reduce((sum, r) => sum + r.devicesSold, 0);

      const daysActive = assignment.endDate
        ? Math.ceil((new Date(assignment.endDate).getTime() - new Date(assignment.startDate).getTime()) / (1000 * 60 * 60 * 24))
        : Math.ceil((new Date().getTime() - new Date(assignment.startDate).getTime()) / (1000 * 60 * 60 * 24));

      return {
        assignment,
        shop,
        sales: assignmentSales,
        daysActive,
        avgDaily: daysActive > 0 ? (assignmentSales / daysActive).toFixed(1) : '0',
      };
    });

    // Last 14 days trend
    const trendData = [];
    for (let i = 13; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = format(date, 'yyyy-MM-dd');
      const sales = salesRecords
        .filter(r => r.agentId === agent.id && r.date === dateStr)
        .reduce((sum, r) => sum + r.devicesSold, 0);
      trendData.push({
        date: format(date, 'MMM dd'),
        sales,
      });
    }

    return {
      totalSales,
      agentAssignments: assignmentPerformance,
      trendData,
    };
  }, [agent, assignments, salesRecords, shops]);

  if (!agent || !agentData) {
    return (
      <div className="card text-center py-12">
        <p className="text-gray-600">Agent not found</p>
        <Link to="/team-members" className="text-red-600 hover:text-red-700 mt-4 inline-block">
          Back to Team Members
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link to="/team-members" className="flex items-center text-gray-600 hover:text-gray-800">
        <ArrowLeft size={20} className="mr-2" />
        Back to Team Members
      </Link>

      {/* Profile Header */}
      <div className="card">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[#39B54A] to-[#1F3E35] rounded-full flex items-center justify-center text-white font-bold text-2xl">
              {agent.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="ml-6">
              <h1 className="text-3xl font-bold text-gray-800">{agent.name}</h1>
              <p className="text-gray-600 mt-1">Sales Agent</p>
              <div className="flex items-center mt-2">
                <MapPin size={16} className="text-gray-500 mr-1" />
                <span className="text-sm text-gray-600">{currentShop?.name}</span>
              </div>
            </div>
          </div>
          <span className={`px-4 py-2 rounded-full font-semibold ${
            agent.status === 'active' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-gray-100 text-gray-700'
          }`}>
            {agent.status.toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <div className="flex items-center">
            <Mail className="text-gray-400 mr-3" size={20} />
            <div>
              <p className="text-xs text-gray-600">Email</p>
              <p className="text-sm font-semibold text-gray-800">{agent.email}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Phone className="text-gray-400 mr-3" size={20} />
            <div>
              <p className="text-xs text-gray-600">Phone</p>
              <p className="text-sm font-semibold text-gray-800">{agent.phone}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Calendar className="text-gray-400 mr-3" size={20} />
            <div>
              <p className="text-xs text-gray-600">Date of Birth</p>
              <p className="text-sm font-semibold text-gray-800">{format(new Date(agent.dateOfBirth), 'MMM dd, yyyy')}</p>
            </div>
          </div>
          <div className="flex items-center">
            <GraduationCap className="text-gray-400 mr-3" size={20} />
            <div>
              <p className="text-xs text-gray-600">Education</p>
              <p className="text-sm font-semibold text-gray-800">{agent.education}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <p className="text-sm text-gray-600">Total Career Sales</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{agentData.totalSales}</p>
          <p className="text-xs text-gray-600 mt-1">devices sold</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600">Employment Duration</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {formatDistance(new Date(agent.employmentDate), new Date(), { addSuffix: false })}
          </p>
          <p className="text-xs text-gray-600 mt-1">since {format(new Date(agent.employmentDate), 'MMM yyyy')}</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600">Shop Transfers</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{agentData.agentAssignments.length - 1}</p>
          <p className="text-xs text-gray-600 mt-1">total transfers</p>
        </div>
      </div>

      {/* Performance Trend */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-800 mb-4">14-Day Performance Trend</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={agentData.trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sales" stroke="#39B54A" strokeWidth={2} name="Devices Sold" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Assignment History */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Shop Assignment History</h2>
        <div className="space-y-4">
          {agentData.agentAssignments.map(item => (
            <div key={item.assignment.id} className="border-l-4 border-[#39B54A] pl-4 py-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-800">{item.shop?.name || 'Unknown Shop'}</h3>
                  <p className="text-sm text-gray-600">{item.shop?.location}</p>
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
                  <p className="text-xs text-gray-600">total sales</p>
                  <p className="text-sm text-gray-600 mt-1">{item.avgDaily}/day avg</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

