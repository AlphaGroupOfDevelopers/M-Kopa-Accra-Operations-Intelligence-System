import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PlusCircle, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

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
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Daily Sales Data Entry</h1>
        <p className="text-gray-600 mt-1">Simulate agent sales report submission</p>
      </div>

      <div className="card">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            <strong>Demo Mode:</strong> This form simulates the Google/Microsoft Forms that agents use to submit daily sales.
            Enter data here to see it immediately reflected in all dashboards and intelligence modules.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-12">
            <CheckCircle className="mx-auto text-green-600 mb-4" size={64} />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Sales Report Submitted!</h2>
            <p className="text-gray-600">Your data has been recorded and is now visible in all dashboards.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                Report Date
              </label>
              <input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="agent" className="block text-sm font-medium text-gray-700 mb-2">
                Agent Name
              </label>
              <select
                id="agent"
                value={formData.agentId}
                onChange={(e) => setFormData({ ...formData, agentId: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Assigned Shop:</strong> {assignedShop.name}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Location:</strong> {assignedShop.location}
                </p>
              </div>
            )}

            <div>
              <label htmlFor="devicesSold" className="block text-sm font-medium text-gray-700 mb-2">
                Number of Devices Sold
              </label>
              <input
                id="devicesSold"
                type="number"
                min="0"
                value={formData.devicesSold}
                onChange={(e) => setFormData({ ...formData, devicesSold: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="e.g., 5"
                required
              />
            </div>

            <div>
              <label htmlFor="remarks" className="block text-sm font-medium text-gray-700 mb-2">
                Remarks / Comments
              </label>
              <textarea
                id="remarks"
                value={formData.remarks}
                onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                rows={4}
                placeholder="Enter any operational challenges, customer feedback, or notable observations..."
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Examples: "Good day, all customers satisfied", "Stock shortage - ran out of devices by noon", "Heavy competition from nearby shop"
              </p>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center btn-primary"
            >
              <PlusCircle size={20} className="mr-2" />
              Submit Sales Report
            </button>
          </form>
        )}
      </div>

      <div className="card">
        <h3 className="font-bold text-gray-800 mb-3">Sample Remarks for Testing</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            onClick={() => setFormData({ ...formData, remarks: 'Good day, all customers were satisfied' })}
            className="text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg text-sm transition-colors"
          >
            ✓ Positive day
          </button>
          <button
            onClick={() => setFormData({ ...formData, remarks: 'Stock shortage - ran out of devices by noon' })}
            className="text-left p-3 bg-orange-50 hover:bg-orange-100 rounded-lg text-sm transition-colors"
          >
            ⚠️ Stock shortage
          </button>
          <button
            onClick={() => setFormData({ ...formData, remarks: 'Transport delays affected morning sales' })}
            className="text-left p-3 bg-orange-50 hover:bg-orange-100 rounded-lg text-sm transition-colors"
          >
            ⚠️ Transport delays
          </button>
          <button
            onClick={() => setFormData({ ...formData, remarks: 'Network issues with payment system' })}
            className="text-left p-3 bg-red-50 hover:bg-red-100 rounded-lg text-sm transition-colors"
          >
            ❌ Network issues
          </button>
          <button
            onClick={() => setFormData({ ...formData, remarks: 'Heavy competition from nearby shop' })}
            className="text-left p-3 bg-orange-50 hover:bg-orange-100 rounded-lg text-sm transition-colors"
          >
            ⚠️ Competition
          </button>
          <button
            onClick={() => setFormData({ ...formData, remarks: 'Excellent foot traffic today, great customer referrals' })}
            className="text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg text-sm transition-colors"
          >
            ✓ High traffic
          </button>
        </div>
      </div>
    </div>
  );
}
