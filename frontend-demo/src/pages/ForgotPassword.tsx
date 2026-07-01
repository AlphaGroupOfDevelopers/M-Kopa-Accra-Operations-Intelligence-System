import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import './Login.css';

export default function ForgotPassword() {
  const [accountNumber, setAccountNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!accountNumber) {
      setError('Please enter your account number');
      return;
    }

    try {
      setLoading(true);
      const response = await api.post('/auth/forgot-password', {
        account_number: accountNumber,
      });
      
      const { reset_token } = response.data;
      if (reset_token) {
        // Direct redirect for operations convenience
        navigate(`/reset-password?token=${reset_token}`);
      } else {
        setError('Failed to generate reset token. Please try again.');
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-native-container">
      <div className="login-native-topbar">
        <span className="login-native-top-title">Password Recovery</span>
      </div>

      <div className="login-native-content">
        <div className="login-native-logo-wrapper">
          <img src="/logo.png" alt="M-Kopa" className="login-native-logo" />
        </div>

        <h1 className="login-native-heading" style={{ fontSize: '20px' }}>FORGOT PASSWORD</h1>

        <form onSubmit={handleSubmit} className="login-native-form">
          <div className="login-native-input-group">
            <label className="login-native-label">Account Number</label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="login-native-input"
              placeholder="e.g., 263713288"
              required
            />
          </div>

          {error && <div className="login-native-error">{error}</div>}

          <button type="submit" className="login-native-submit" disabled={loading}>
            {loading ? 'Processing...' : 'Reset Password'}
          </button>
          
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <span 
              className="login-native-forgot" 
              onClick={() => navigate('/login')}
              style={{ cursor: 'pointer', color: '#666' }}
            >
              Back to Login
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
