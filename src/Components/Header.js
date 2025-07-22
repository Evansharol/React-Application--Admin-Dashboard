import React, { useState } from 'react';
import { FaBell, FaSun, FaMoon, FaUserCircle } from 'react-icons/fa';
import '../styles/Header.css';

const Header = ({ userName = "Admin" }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-theme', !darkMode);
  };

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <span className="header-title">Admin Dashboard</span>
      </div>
      <div className="header-right">
        <FaBell className="header-icon" title="Notifications" />
        <span className="header-profile">
          <FaUserCircle className="header-user-icon" />
          {userName}
        </span>
        <button className="header-theme-btn" onClick={toggleTheme} title="Toggle theme">
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </header>
  );
};

export default Header;