import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PlusCircle, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import './Dashboard.css';
import './DataEntry.css';

export default function DataEntry() {
  const { agents, shops, addSalesRecord } = useApp();
  const [formData, setFormData] = useState({
    agentId: '',
    devicesSold: '',
    remarks: '',
    date: format(new Date(), 'yyyy-MM-dd'),
  });
  const [submitted, setSubmitted] = useState(false);

  const selectedAgent = agents.find(a => a.id === formData.agentId);
  const assignedShop = selectedAgent ? shops.find(s => s.id === selectedAgent.currentShopId) : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedAgent || !assignedShop) {
      alert('Please select a valid agent');
      return;
    }

    addSalesRecord({
      agentId: formData.agentId,
      shopId: assignedShop.id,
      date: formData.date,
      devicesSold: parseInt(formData.devicesSold),
      remarks: formData.remarks,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        agentId: '',
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
          <p className="data-entry-notice-text">
            <strong>Demo Mode:</strong> This form simulates the Google/Microsoft Forms that agents use to submit daily sales.
            Enter data here to see it immediately reflected in all dashboards and intelligence modules.
          </p>
        </div>

        {submitted ? (
          <div className="data-entry-success">
            <CheckCircle className="data-entry-success-icon" size={64} />
            <h2 className="data-entry-success-title">Sales Report Submitted!</h2>
            <p className="data-entry-success-text">Your data has been recorded and is now visible in all dashboards.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="data-entry-form">
            <div className="form-group">
              <label htmlFor="date" className="form-label">
                Report Date
              </label>
              <input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="agent" className="form-label">
                Agent Name
              </label>
              <select
                id="agent"
                value={formData.agentId}
                onChange={(e) => setFormData({ ...formData, agentId: e.target.value })}
                className="form-input"
                required
              >
                <option value="">Select Agent</option>
                {agents.map(agent => (
                  <option key={agent.id} value={agent.id}>
                    {agent.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedAgent && assignedShop && (
              <div className="form-assigned-shop">
                <p className="form-assigned-text">
                  <strong>Assigned Shop:</strong> {assignedShop.name}
                </p>
                <p className="form-assigned-text" style={{ marginBottom: 0 }}>
                  <strong>Location:</strong> {assignedShop.location}
                </p>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="devicesSold" className="form-label">
                Number of Phones Sold
              </label>
              <input
                id="devicesSold"
                type="number"
                min="0"
                value={formData.devicesSold}
                onChange={(e) => setFormData({ ...formData, devicesSold: e.target.value })}
                className="form-input"
                placeholder="e.g., 5"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="remarks" className="form-label">
                Remarks / Comments
              </label>
              <textarea
                id="remarks"
                value={formData.remarks}
                onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                className="form-input"
                rows={4}
                placeholder="Enter any operational challenges, customer feedback, or notable observations..."
                required
              />
              <p className="form-helper-text">
                Examples: "Good day, all customers satisfied", "Stock shortage - ran out of phones by noon", "Heavy competition from nearby shop"
              </p>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
            >
              <PlusCircle size={20} style={{ marginRight: '0.5rem' }} />
              Submit Sales Report
            </button>
          </form>
        )}
      </div>

      <div className="card">
        <h3 className="card-title" style={{ marginBottom: '1rem' }}>Sample Remarks for Testing</h3>
        <div className="sample-remarks-grid">
          <button
            onClick={() => setFormData({ ...formData, remarks: 'Good day, all customers were satisfied' })}
            className="sample-remark-btn positive"
            type="button"
          >
            ✓ Positive day
          </button>
          <button
            onClick={() => setFormData({ ...formData, remarks: 'Stock shortage - ran out of phones by noon' })}
            className="sample-remark-btn warning"
            type="button"
          >
            ⚠️ Stock shortage
          </button>
          <button
            onClick={() => setFormData({ ...formData, remarks: 'Transport delays affected morning sales' })}
            className="sample-remark-btn warning"
            type="button"
          >
            ⚠️ Transport delays
          </button>
          <button
            onClick={() => setFormData({ ...formData, remarks: 'Network issues with payment system' })}
            className="sample-remark-btn negative"
            type="button"
          >
            ❌ Network issues
          </button>
          <button
            onClick={() => setFormData({ ...formData, remarks: 'Heavy competition from nearby shop' })}
            className="sample-remark-btn warning"
            type="button"
          >
            ⚠️ Competition
          </button>
          <button
            onClick={() => setFormData({ ...formData, remarks: 'Excellent foot traffic today, great customer referrals' })}
            className="sample-remark-btn positive"
            type="button"
          >
            ✓ High traffic
          </button>
        </div>
      </div>
    </div>
  );
}
