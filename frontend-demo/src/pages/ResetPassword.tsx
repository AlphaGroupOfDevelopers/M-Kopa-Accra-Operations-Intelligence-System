import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../services/api';
import { Eye, EyeOff } from 'lucide-react';
import './Login.css';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setError('Invalid or missing reset token.');
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!token) {
      setError('Invalid or missing reset token.');
      return;
    }

    if (newPassword.length !== 5 || confirmPassword.length !== 5) {
      setError('Password must be exactly 5 digits');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      await api.post('/auth/reset-password', {
        token: token,
        new_password: newPassword,
      });
      
      setSuccess('Password reset successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (err: any) {
      setError(err.response?.data?.detail || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-native-container">
      <div className="login-native-topbar">
        <span className="login-native-top-title">Reset Password</span>
      </div>

      <div className="login-native-content">
        <div className="login-native-logo-wrapper">
          <img src="/logo.png" alt="M-Kopa" className="login-native-logo" />
        </div>

        <h1 className="login-native-heading" style={{ fontSize: '20px' }}>CREATE NEW PASSWORD</h1>

        <form onSubmit={handleSubmit} className="login-native-form">
          <div className="login-native-input-group">
            <label className="login-native-label">New 5-Digit Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="login-native-input"
                placeholder="12345"
                maxLength={5}
                required
              />
              <button 
                type="button" 
                className="login-native-eye-btn"
                style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)' }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="login-native-input-group">
            <label className="login-native-label">Confirm Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="login-native-input"
                placeholder="12345"
                maxLength={5}
                required
              />
              <button 
                type="button" 
                className="login-native-eye-btn"
                style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)' }}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && <div className="login-native-error">{error}</div>}
          {success && <div className="login-native-error" style={{ color: 'green', backgroundColor: '#e6ffe6' }}>{success}</div>}

          <button type="submit" className="login-native-btn" disabled={loading || !token}>
            {loading ? 'Updating...' : 'Update Password'}
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
