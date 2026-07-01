import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Eye, EyeOff } from 'lucide-react';
import './Login.css';

export default function Login() {
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!accountNumber || !password) {
      setError('Please enter both account number and password');
      return;
    }

    if (password.length !== 5) {
      setError('Password must be exactly 5 digits');
      return;
    }
    
    const success = await login(accountNumber, password);
    if (success) {
      navigate('/');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-native-container">
      {/* Top Header */}
      <div className="login-native-topbar">
        <span className="login-native-top-title">Login</span>
      </div>

      <div className="login-native-content">
        <div className="login-native-logo-wrapper">
          <img src="/logo.png" alt="M-Kopa" className="login-native-logo" />
        </div>

        <h1 className="login-native-heading">LOGIN</h1>

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

          <div className="login-native-input-group">
            <label className="login-native-label">5-Digit Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-native-input"
              placeholder="12345"
              maxLength={5}
              required
            />
            <button 
              type="button" 
              className="login-native-eye-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && <div className="login-native-error">{error}</div>}

          <div className="login-native-options">
            <label className="login-native-checkbox">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" className="login-native-forgot">Forgot Password?</a>
          </div>

          <button type="submit" className="login-native-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
