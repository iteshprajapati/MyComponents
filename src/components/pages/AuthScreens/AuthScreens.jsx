import React, { useState } from 'react';
import { Mail, Lock, User, ArrowLeft } from 'lucide-react';
import { Button } from '../../atoms/Button/Button';
import { Input } from '../../atoms/Input/Input';
import { Checkbox } from '../../atoms/Selection/Selection';
import './AuthScreens.scss';

export const AuthScreens = ({
  onLoginSuccess,
  onSignupSuccess,
  className = '',
  ...props
}) => {
  const [screen, setScreen] = useState('login'); // 'login' | 'signup' | 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (onLoginSuccess) onLoginSuccess({ email, password });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (onSignupSuccess) onSignupSuccess({ fullName, email, password });
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    alert(`Password reset instructions sent to ${email}`);
    setScreen('login');
  };

  return (
    <div className={`auth-screen-wrapper ${className}`} {...props}>
      <div className="auth-card-container">
        {/* Brand header */}
        <div className="auth-brand-logo-row">
          <span className="auth-logo-icon">▲</span>
          <h2 className="auth-brand-name">Platform</h2>
        </div>

        {/* View switching logic */}
        {screen === 'login' && (
          <form className="auth-form-pane animation-fade-in" onSubmit={handleLoginSubmit}>
            <div className="auth-pane-headings">
              <h3 className="auth-title">Welcome back</h3>
              <p className="auth-sub">Access your operations control panel.</p>
            </div>

            <div className="auth-inputs-stack">
              <Input
                label="Email address"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail size={16} />}
                required
                fullWidth
              />
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock size={16} />}
                required
                fullWidth
              />
            </div>

            <div className="auth-options-row">
              <Checkbox
                label="Remember me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <button
                type="button"
                className="auth-link-btn"
                onClick={() => setScreen('forgot')}
              >
                Forgot Password?
              </button>
            </div>

            <Button type="submit" variant="solid" color="primary" fullWidth>
              Sign In to Dashboard
            </Button>

            <div className="auth-pane-footer">
              <span>Don't have an account?</span>{' '}
              <button type="button" className="auth-link-btn primary" onClick={() => setScreen('signup')}>
                Create account
              </button>
            </div>
          </form>
        )}

        {screen === 'signup' && (
          <form className="auth-form-pane animation-fade-in" onSubmit={handleSignupSubmit}>
            <div className="auth-pane-headings">
              <h3 className="auth-title">Create your workspace</h3>
              <p className="auth-sub">Start managing cargo dispatches today.</p>
            </div>

            <div className="auth-inputs-stack">
              <Input
                label="Full Name"
                placeholder="e.g. John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                leftIcon={<User size={16} />}
                required
                fullWidth
              />
              <Input
                label="Email address"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail size={16} />}
                required
                fullWidth
              />
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock size={16} />}
                required
                fullWidth
              />
            </div>

            <Button type="submit" variant="solid" color="primary" fullWidth style={{ marginTop: '8px' }}>
              Register Account
            </Button>

            <div className="auth-pane-footer">
              <span>Already have an account?</span>{' '}
              <button type="button" className="auth-link-btn primary" onClick={() => setScreen('login')}>
                Sign in instead
              </button>
            </div>
          </form>
        )}

        {screen === 'forgot' && (
          <form className="auth-form-pane animation-fade-in" onSubmit={handleForgotSubmit}>
            <button
              type="button"
              className="back-to-login-btn"
              onClick={() => setScreen('login')}
            >
              <ArrowLeft size={16} /> Back to Sign In
            </button>

            <div className="auth-pane-headings" style={{ marginTop: '8px' }}>
              <h3 className="auth-title">Recover password</h3>
              <p className="auth-sub">Enter your email and we'll send recovery links.</p>
            </div>

            <Input
              label="Email address"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail size={16} />}
              required
              fullWidth
            />

            <Button type="submit" variant="solid" color="primary" fullWidth>
              Send Recovery Email
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};
export default AuthScreens;
