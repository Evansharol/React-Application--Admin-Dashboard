import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [forgotStep, setForgotStep] = useState(1); // 1: email, 2: otp
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user.trim() || !password.trim()) {
      setMessage("Please enter both email and password");
      return;
    }
    // Get registered user from localStorage
    const regUser = JSON.parse(localStorage.getItem('user'));
    if (!regUser || regUser.email !== user) {
      setMessage("Email not registered. Please use 'Forgot password?' to reset.");
      setShowForgot(true);
      setForgotEmail(user);
      return;
    }
    if (regUser.password !== password) {
      setMessage("Incorrect password. Please use 'Forgot password?' to reset.");
      setShowForgot(true);
      setForgotEmail(user);
      return;
    }
    setMessage("");
    alert("Signed in successfully");
    navigate("/home");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-form-side">
          <h2 className="login-form-title">Login</h2>
          <form onSubmit={handleSubmit} className="login-form">
            {message && <div className="forgot-message">{message}</div>}
            <div style={{ marginBottom: '16px' }}>
              <label className="login-label">Username or Email</label>
              <input
                type="text"
                placeholder="Enter your username or email"
                className="login-input"
                value={user}
                onChange={e => setUser(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div style={{ marginBottom: '8px' }}>
              <label className="login-label">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="login-input"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="login-forgot-link">
              <span tabIndex={0} role="button" onClick={() => setShowForgot(true)}>Forgot password?</span>
            </div>
            <button type="submit" className="login-btn">Sign In</button>
          </form>
        </div>
        <div className="login-welcome">
          <h1>You're right here!</h1>
          <p>
            Welcome back! Please sign in to continue and enjoy all the features of our platform.
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgot && (
        <div className="forgot-modal-bg">
          <div className="forgot-modal">
            <button className="forgot-close" onClick={() => { setShowForgot(false); setForgotStep(1); setMessage(""); }}>×</button>
            {forgotStep === 1 && (
              <form onSubmit={async e => {
                e.preventDefault();
                setLoading(true);
                setMessage("");
                try {
                  const res = await fetch('http://localhost:3001/api/send-otp', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: forgotEmail })
                  });
                  const data = await res.json();
                  if (data.success) {
                    setForgotStep(2);
                    setMessage("OTP sent to your email");
                  } else {
                    setMessage(data.error || 'Failed to send OTP');
                  }
                } catch (err) {
                  setMessage('Server error');
                }
                setLoading(false);
              }}>
                <h3>Forgot Password</h3>
                <label className="login-label">Enter your email</label>
                <input
                  type="email"
                  className="login-input"
                  value={forgotEmail}
                  onChange={e => setForgotEmail(e.target.value)}
                  required
                />
                <button className="login-btn" type="submit" disabled={loading}>{loading ? "Sending..." : "Send OTP"}</button>
                {message && <div className="forgot-message">{message}</div>}
              </form>
            )}
            {forgotStep === 2 && (
              <form onSubmit={async e => {
                e.preventDefault();
                setLoading(true);
                setMessage("");
                try {
                  const res = await fetch('http://localhost:3001/api/verify-otp', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: forgotEmail, otp, newPassword })
                  });
                  const data = await res.json();
                  if (data.success) {
                    setShowForgot(false);
                    setForgotStep(1);
                    setMessage("");
                    alert("Password reset successful");
                  } else {
                    setMessage(data.error || 'Failed to reset password');
                  }
                } catch (err) {
                  setMessage('Server error');
                }
                setLoading(false);
              }}>
                <h3>Verify OTP</h3>
                <label className="login-label">Enter OTP</label>
                <input
                  type="text"
                  className="login-input"
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  required
                />
                <label className="login-label">New Password</label>
                <input
                  type="password"
                  className="login-input"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  required
                />
                <button className="login-btn" type="submit" disabled={loading}>{loading ? "Verifying..." : "Reset Password"}</button>
                {message && <div className="forgot-message">{message}</div>}
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;