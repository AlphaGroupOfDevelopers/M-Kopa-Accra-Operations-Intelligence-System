import { useAgents, useShops, useAddSalesRecord } from '../hooks/useQueries';
import { useState } from 'react';
import { PlusCircle, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import './Dashboard.css';
import './DataEntry.css';

export default function DataEntry() {
  const { data: agents } = useAgents();
  const { data: shops } = useShops();
  const addSalesRecordMutation = useAddSalesRecord();
  
  const [formData, setFormData] = useState({
    dsrId: '',
    devicesSold: '',
    remarks: '',
    date: format(new Date(), 'yyyy-MM-dd'),
  });
  const [submitted, setSubmitted] = useState(false);

  const selectedAgent = agents.find(a => a.id === formData.dsrId);
  const assignedShop = selectedAgent ? shops.find(s => s.id === selectedAgent.currentShopId) : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedAgent || !assignedShop) {
      alert('Please select a valid agent');
      return;
    }

    addSalesRecordMutation.mutate({
      dsrId: formData.dsrId,
      shopId: assignedShop.id,
      date: formData.date,
      devicesSold: parseInt(formData.devicesSold),
      remarks: formData.remarks,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        dsrId: '',
        devicesSold: '',
        remarks: '',
        date: format(new Date(), 'yyyy-MM-dd'),
      });
    }, 2000);
  };

  return (
    <div className="data-entry-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Daily Sales Data Entry</h1>
        <p className="dashboard-subtitle">Simulate agent sales report submission</p>
      </div>

      <div className="card">
        <div className="data-entry-notice">
          <div className="notice-icon">ℹ️</div>
          <div className="notice-content">
            <h4>Demo Data Entry</h4>
            <p>In the real app, DSRs (Direct Sales Representatives) use a mobile interface to submit this data. This page simulates that submission for testing the real-time dashboards.</p>
          </div>
        </div>

        {submitted ? (
          <div className="success-state">
            <CheckCircle size={48} className="success-icon" />
            <h3>Sales Record Submitted!</h3>
            <p>The dashboard has been updated in real-time.</p>
            <button 
              className="btn btn-primary"
              onClick={() => setSubmitted(false)}
            >
              Submit Another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="data-entry-form">
            <div className="form-group">
              <label>Select Agent</label>
              <select 
                required
                value={formData.dsrId}
                onChange={(e) => setFormData({...formData, dsrId: e.target.value})}
                className="form-control"
              >
                <option value="">-- Choose Agent --</option>
                {agents.filter(a => a.status === 'active').map(agent => (
                  <option key={agent.id} value={agent.id}>
                    {agent.name} ({agent.currentShopId || 'Unassigned'})
                  </option>
                ))}
              </select>
            </div>

            {selectedAgent && (
              <div className="form-group assigned-shop-info">
                <label>Assigned Shop</label>
                <div className="read-only-field">
                  {assignedShop ? assignedShop.name : 'No shop assigned'}
                </div>
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label>Sales Date</label>
                <input 
                  type="date" 
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Devices Sold</label>
                <input 
                  type="number" 
                  min="0"
                  required
                  value={formData.devicesSold}
                  onChange={(e) => setFormData({...formData, devicesSold: e.target.value})}
                  className="form-control"
                  placeholder="e.g. 5"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Remarks / Notes (Optional)</label>
              <textarea 
                value={formData.remarks}
                onChange={(e) => setFormData({...formData, remarks: e.target.value})}
                className="form-control"
                placeholder="Any special notes about today's sales..."
                rows={3}
              />
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="btn btn-primary btn-block"
                disabled={!formData.dsrId || !formData.devicesSold || addSalesRecordMutation.isPending}
              >
                <PlusCircle size={18} />
                {addSalesRecordMutation.isPending ? 'Submitting...' : 'Submit Sales Data'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
