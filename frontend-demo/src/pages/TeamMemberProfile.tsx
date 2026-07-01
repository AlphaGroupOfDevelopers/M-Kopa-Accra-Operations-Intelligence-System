import { useSalesRecords, useAgents, useShops, useAssignments } from '../hooks/useQueries';
import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Calendar, GraduationCap, MapPin, User, Hash } from 'lucide-react';
import { format, formatDistance, differenceInDays, differenceInYears } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Dashboard.css';
import './ShopProfile.css'; // Reusing profile styles
import './TeamMemberProfile.css';

export default function TeamMemberProfile() {
  const { agentId } = useParams<{ agentId: string }>();
  const { data: salesRecords } = useSalesRecords();
  const { data: agents } = useAgents();
  const { data: shops } = useShops();
  const { data: assignments } = useAssignments();
  

  const agent = agents.find(a => a.id === agentId);
  const currentShop = shops.find(s => s.id === agent?.currentShopId);

  const agentData = useMemo(() => {
    if (!agent) return null;

    // Get all assignments for this agent
    const agentAssignments = assignments
      .filter(a => a.agentId === agent.id)
      .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

    // Get last 30 days performance per assignment
    const assignmentPerformance = agentAssignments.map(assignment => {
      const shop = shops.find(s => s.id === assignment.shopId);
      const start = new Date(assignment.startDate).getTime();
      const end = assignment.endDate ? new Date(assignment.endDate).getTime() : new Date().getTime();
      
      const daysActive = differenceInDays(end, start) + 1;

      const monthlySales: Record<string, number> = {};

      salesRecords
        .filter(r => {
          if (assignment.role === 'assistant') {
             if (r.shopId !== assignment.shopId) return false;
          } else {
             if (r.agentId !== agent.id || r.shopId !== assignment.shopId) return false;
          }
          const recordTime = new Date(r.date).getTime();
          return recordTime >= start && recordTime <= end;
        })
        .forEach(r => {
          const monthYear = format(new Date(r.date), 'MMM yyyy');
          monthlySales[monthYear] = (monthlySales[monthYear] || 0) + r.devicesSold;
        });

      const assignmentSales = Object.values(monthlySales).reduce((sum, val) => sum + val, 0);
      const monthlySalesArray = Object.entries(monthlySales).map(([month, sales]) => ({ month, sales }));



      return {
        assignment,
        shop,
        sales: assignmentSales,
        monthlySales: monthlySalesArray,
        daysActive,
        avgDaily: daysActive > 0 ? (assignmentSales / daysActive).toFixed(1) : '0',
      };
    });

    // Calculate total sales directly from all sales records to ensure no sales are missed due to missing assignments
    const totalSales = salesRecords
      .filter(r => r.agentId === agent.id)
      .reduce((sum, r) => sum + r.devicesSold, 0);

    // Last 14 days trend
    const trendData = [];
    const currentAssignment = agentAssignments[0];
    for (let i = 13; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = format(date, 'yyyy-MM-dd');
      const sales = salesRecords
        .filter(r => {
          if (currentAssignment && currentAssignment.role === 'assistant') {
            return r.shopId === currentAssignment.shopId && r.date === dateStr;
          }
          return r.agentId === agent.id && r.date === dateStr;
        })
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
      <div className="card" style={{ textAlign: 'center', padding: '3rem 0' }}>
        <p style={{ color: 'var(--text-secondary)' }}>DSR not found</p>
        <Link to="/team-members" style={{ color: 'var(--accent-red)', marginTop: '1rem', display: 'inline-block', textDecoration: 'none' }}>
          Back to Team Members
        </Link>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Link to="/team-members" className="profile-back-link">
        <ArrowLeft size={20} style={{ marginRight: '0.5rem' }} />
        Back to Team Members
      </Link>

      {/* Profile Header */}
      <div className="card">
        <div className="profile-header-card">
          <div className="profile-header-info">
            <div className="agent-header-icon">
              {agent.name.split(' ').map((n: string) => n[0]).join('')}
            </div>
            <div className="profile-header-details">
              <h1 className="profile-title">{agent.name}</h1>
              <p className="profile-subtitle">DSR</p>
              <div className="profile-location">
                <MapPin size={16} style={{ marginRight: '0.25rem' }} />
                <span>{currentShop?.name}</span>
              </div>
            </div>
          </div>
          <span className={`profile-status ${agent.status === 'active' ? 'active' : 'inactive'}`}>
            {agent.status.toUpperCase()}
          </span>
        </div>

        <div className="profile-info-grid">
          <div className="profile-info-item">
            <Mail className="profile-info-icon" size={20} />
            <div>
              <p className="profile-info-label">Email</p>
              <p className="profile-info-value">{agent.email}</p>
            </div>
          </div>
          <div className="profile-info-item">
            <Phone className="profile-info-icon" size={20} />
            <div>
              <p className="profile-info-label">Phone</p>
              <p className="profile-info-value">{agent.phone}</p>
            </div>
          </div>
          <div className="profile-info-item">
            <Calendar className="profile-info-icon" size={20} />
            <div>
              <p className="profile-info-label">Date of Birth</p>
              <p className="profile-info-value">{agent.dateOfBirth && !isNaN(new Date(agent.dateOfBirth).getTime()) ? format(new Date(agent.dateOfBirth), 'MMM dd, yyyy') : 'Unknown'}</p>
            </div>
          </div>
          <div className="profile-info-item">
            <User className="profile-info-icon" size={20} />
            <div>
              <p className="profile-info-label">Age</p>
              <p className="profile-info-value">{agent.dateOfBirth && !isNaN(new Date(agent.dateOfBirth).getTime()) ? differenceInYears(new Date(), new Date(agent.dateOfBirth)) + ' years' : 'Unknown'}</p>
            </div>
          </div>
          <div className="profile-info-item">
            <GraduationCap className="profile-info-icon" size={20} />
            <div>
              <p className="profile-info-label">Education</p>
              <p className="profile-info-value">{agent.education}</p>
            </div>
          </div>
          {agent.digitalAddress && (
            <div className="profile-info-item">
              <Hash className="profile-info-icon" size={20} />
              <div>
                <p className="profile-info-label">Digital Address</p>
                <p className="profile-info-value">{agent.digitalAddress}</p>
              </div>
            </div>
          )}
          {agent.gender && (
            <div className="profile-info-item">
              <User className="profile-info-icon" size={20} />
              <div>
                <p className="profile-info-label">Gender</p>
                <p className="profile-info-value">{agent.gender}</p>
              </div>
            </div>
          )}
          {agent.secondaryNumber && (
            <div className="profile-info-item">
              <Phone className="profile-info-icon" size={20} />
              <div>
                <p className="profile-info-label">Alt. Contact</p>
                <p className="profile-info-value">{agent.secondaryNumber}</p>
              </div>
            </div>
          )}
          {agent.emergencyContactName && (
            <div className="profile-info-item" style={{ gridColumn: '1 / -1' }}>
              <User className="profile-info-icon" size={20} />
              <div>
                <p className="profile-info-label">Emergency Contact</p>
                <p className="profile-info-value">{agent.emergencyContactName}</p>
                {agent.emergencyContactPhone && <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{agent.emergencyContactPhone}</p>}
              </div>
            </div>
          )}
          {agent.notes && (
            <div className="profile-info-item" style={{ gridColumn: '1 / -1' }}>
              <Hash className="profile-info-icon" size={20} />
              <div>
                <p className="profile-info-label">Notes</p>
                <p className="profile-info-value" style={{ fontSize: '0.85rem' }}>{agent.notes}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Performance Stats */}
      <div className="profile-stats-grid">
        <div className="card profile-stat-card">
          <p className="profile-stat-label">Total Career Sales</p>
          <p className="profile-stat-value">{agentData.totalSales}</p>
          <p className="profile-stat-subtext">phones sold</p>
        </div>
        <div className="card profile-stat-card">
          <p className="profile-stat-label">Employment Duration</p>
          <p className="profile-stat-value">
            {agent.employmentDate && !isNaN(new Date(agent.employmentDate).getTime()) ? formatDistance(new Date(agent.employmentDate), new Date(), { addSuffix: false }) : 'Unknown'}
          </p>
          <p className="profile-stat-subtext">since {agent.employmentDate && !isNaN(new Date(agent.employmentDate).getTime()) ? format(new Date(agent.employmentDate), 'MMM yyyy') : 'Unknown'}</p>
        </div>
        <div className="card profile-stat-card">
          <p className="profile-stat-label">Shop Transfers</p>
          <p className="profile-stat-value">{Math.max(0, agentData.agentAssignments.length - 1)}</p>
          <p className="profile-stat-subtext">total transfers</p>
        </div>
      </div>

      {/* Performance Trend */}
      <div className="card">
        <h2 className="card-title">14-Day Performance Trend</h2>
        <div className="chart-scroll-wrapper">
          <div className="chart-container" style={{ height: '250px', minWidth: '500px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={agentData.trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" axisLine={false} tickLine={false} dy={10} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{ stroke: 'var(--border-color)', strokeWidth: 1 }} />
                <Line type="monotone" dataKey="sales" stroke="var(--accent-green)" strokeWidth={3} name="Phones Sold" dot={false} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Assignment History */}
      <div className="card">
        <h2 className="card-title" style={{ marginBottom: '1rem' }}>Shop Assignment History</h2>
        <div className="profile-history-list">
          {(() => {
            const currentAssignments = agentData.agentAssignments.filter(item => !item.assignment.endDate);
            const pastAssignments = agentData.agentAssignments.filter(item => item.assignment.endDate);

            const renderAssignmentItem = (item: any) => {
              const isCurrent = !item.assignment.endDate;
              return (
                <div key={item.assignment.id} className={`profile-history-item ${isCurrent ? 'current' : 'past'}`}>
                  <div className="profile-history-header">
                    <div>
                      <h3 className="profile-history-name">{item.shop?.name || 'Unknown Shop'}</h3>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{item.shop?.location}</p>
                      <div className="profile-history-dates">
                        <Calendar size={14} style={{ marginRight: '0.25rem' }} />
                        <span>
                          {item.assignment.startDate && !isNaN(new Date(item.assignment.startDate).getTime()) ? format(new Date(item.assignment.startDate), 'MMM dd, yyyy') : 'Unknown'} 
                          {item.assignment.endDate 
                            ? (!isNaN(new Date(item.assignment.endDate).getTime()) ? ` - ${format(new Date(item.assignment.endDate), 'MMM dd, yyyy')}` : ' - Unknown')
                            : ' - Present'
                          }
                        </span>
                        <span className="profile-history-days">
                          {item.daysActive} days
                        </span>
                      </div>
                      {item.assignment.reason && (
                        <p className="profile-history-reason">Reason: {item.assignment.reason}</p>
                      )}
                    </div>
                    <div className="profile-history-sales">
                      <p className="profile-history-sales-val">{item.sales}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>total sales</p>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{item.avgDaily}/day avg</p>
                    </div>
                  </div>
                  
                  {/* Monthly Breakdown */}
                  {item.monthlySales.length > 0 && (
                    <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                      <h4 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Monthly Performance</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '0.5rem', maxHeight: '160px', overflowY: 'auto', paddingRight: '0.5rem', scrollbarWidth: 'thin' }}>
                        {item.monthlySales.map((ms: any) => (
                          <div key={ms.month} style={{ backgroundColor: 'var(--bg-main)', padding: '0.5rem', borderRadius: '4px', textAlign: 'center' }}>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{ms.month}</p>
                            <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{ms.sales}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            };

            return (
              <>
                {currentAssignments.length > 0 && (
                  <div className="profile-history-group">
                    <h3 className="profile-history-group-title">Current Assignment</h3>
                    {currentAssignments.map(renderAssignmentItem)}
                  </div>
                )}
                {pastAssignments.length > 0 && (
                  <div className="profile-history-group">
                    <h3 className="profile-history-group-title">Past Assignments</h3>
                    {pastAssignments.map(renderAssignmentItem)}
                  </div>
                )}
              </>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
