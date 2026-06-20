import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Eye, EyeOff } from 'lucide-react';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (login(email, password)) {
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
            <label className="login-native-label">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-native-input"
              placeholder="manager@mkopa.com"
              required
            />
          </div>

          <div className="login-native-input-group">
            <label className="login-native-label">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-native-input"
              placeholder="Password"
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

          {error && (
            <div className="login-native-error">{error}</div>
          )}

          <button type="submit" className="login-native-submit">
            LOGIN
          </button>
        </form>

        <div className="login-native-footer">
          <button className="login-native-forgot">Forgot Password?</button>
        </div>
      </div>
    </div>
  );
}

