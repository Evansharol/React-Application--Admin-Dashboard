import React, { useState, useRef } from 'react'
import { CSSTransition } from 'react-transition-group';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';


const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showBox, setShowBox] = useState(true);
  const [step, setStep] = useState(1); // 1: form, 2: otp
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const nodeRef = useRef(null);

  // Save user to localStorage
  const saveUserToLocal = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  };

  // Step 1: Send OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() && email.trim() && password.trim()) {
      setLoading(true);
      setMessage("");
      try {
        const res = await fetch('http://localhost:3001/api/send-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        const data = await res.json();
        if (data.success) {
          setStep(2);
          setMessage("OTP sent to your email");
        } else {
          setMessage(data.error || 'Failed to send OTP');
        }
      } catch (err) {
        setMessage('Server error');
      }
      setLoading(false);
    } else {
      setMessage("Please fill in all fields");
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch('http://localhost:3001/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword: password })
      });
      const data = await res.json();
      if (data.success) {
        saveUserToLocal({ name, email, password });
        setShowBox(false);
        setTimeout(() => {
          navigate("/login");
        }, 500);
        alert("Registration successful! You can now log in.");
      } else {
        setMessage(data.error || 'OTP verification failed');
      }
    } catch (err) {
      setMessage('Server error');
    }
    setLoading(false);
  };

  return (
    <div className="register-container">
      <CSSTransition
        in={showBox}
        timeout={400}
        classNames="fade-box"
        unmountOnExit
        nodeRef={nodeRef}
      >
        <div className="register-box" ref={nodeRef}>
          {/* Left Side - Welcome */}
          <div className="register-welcome">
            <h1>Welcome!</h1>
            <p>Join our community and start your journey with us. Register to access exclusive features and connect with others!</p>
          </div>
          {/* Right Side - Register Form */}
          <div className="register-form-side">
            <h2 className="register-form-title">Register</h2>
            {step === 1 && (
              <form onSubmit={handleSubmit} className="register-form">
                <div style={{ marginBottom: '16px' }}>
                  <label className="register-label">Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="register-input"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    autoComplete="off"
                  />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label className="register-label">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="register-input"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoComplete="off"
                  />
                </div>
                <div style={{ marginBottom: '24px' }}>
                  <label className="register-label">Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="register-input"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="off"
                  />
                </div>
                <button type="submit" className="register-btn" disabled={loading}>{loading ? "Sending..." : "Register & Verify Email"}</button>
                {message && <div className="forgot-message">{message}</div>}
              </form>
            )}
            {step === 2 && (
              <form onSubmit={handleVerifyOtp} className="register-form">
                <label className="register-label">Enter OTP sent to your email</label>
                <input
                  type="text"
                  className="register-input"
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  required
                />
                <button className="register-btn" type="submit" disabled={loading}>{loading ? "Verifying..." : "Verify OTP & Register"}</button>
                {message && <div className="forgot-message">{message}</div>}
              </form>
            )}
            <div className="register-account-link">
              Already have an account?{' '}
              <span className="register-signin-link" onClick={() => {
                setShowBox(false);
                setTimeout(() => navigate('/login'), 500);
              }} tabIndex={0} role="button">Sign in</span>
            </div>
            <div className="register-or">or</div>
            <button className="register-social-btn register-google">Sign in with Google</button>
            <button className="register-social-btn register-facebook">Sign in with Facebook</button>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
}

export default Register