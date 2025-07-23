import React, { useState } from 'react';
import { FaBell, FaBars, FaHome, FaBox, FaUsers, FaUserTie, FaCog, FaChartLine } from 'react-icons/fa';
import UserProfile from '../Components/UserProfile';
import Products from './Products';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [theme, setTheme] = useState('light');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const handleThemeToggle = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const sidebarItems = [
    { icon: FaHome, label: 'Dashboard', active: activeMenu === 'Dashboard' },
    { icon: FaBox, label: 'Products', active: activeMenu === 'Products' },
    { icon: FaChartLine, label: 'Sales', active: activeMenu === 'Sales' },
    { icon: FaUsers, label: 'Customer', active: activeMenu === 'Customer' },
    { icon: FaUserTie, label: 'Staff', active: activeMenu === 'Staff' },
    { icon: FaCog, label: 'Setting', active: activeMenu === 'Setting' }
  ];

  const handleMenuClick = (menuLabel) => {
    setActiveMenu(menuLabel);
  };

  const renderContent = () => {
    switch(activeMenu) {
      case 'Products':
        return <Products theme={theme} />;
      case 'Sales':
        return <div><h1>Sales Dashboard</h1><p>Sales analytics and reports coming soon...</p></div>;
      case 'Customer':
        return <div><h1>Customer Management</h1><p>Customer management features coming soon...</p></div>;
      case 'Staff':
        return <div><h1>Staff Management</h1><p>Staff management features coming soon...</p></div>;
      case 'Setting':
        return <div><h1>Settings</h1><p>Settings panel coming soon...</p></div>;
      default:
        return (
          <div className="dashboard-content">
            <h1>Welcome to Admin Dashboard</h1>
            <p>Manage your application efficiently</p>
          </div>
        );
    }
  };

  return (
    <div className={`admin-dashboard-container${theme === 'dark' ? ' dark-theme' : ''}`}>
      {/* Header */}
      <header className="admin-dashboard-header">
        <div className="header-left">
          <button 
            className="menu-toggle"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            <FaBars />
          </button>
          <div className="header-logo">
            <span className="logo-text">Stylesphere</span>
          </div>
        </div>
        <div className="header-right">
          <button onClick={handleThemeToggle} className="theme-toggle" aria-label="Toggle theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button className="notification-btn" aria-label="Notifications">
            <FaBell />
            <span className="notification-badge">0</span>
          </button>
          <UserProfile user={{ name: 'Admin' }} />
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`admin-sidebar${sidebarCollapsed ? ' collapsed' : ''}`}>
        <nav className="sidebar-nav">
          {sidebarItems.map((item, index) => (
            <div 
              key={index} 
              className={`sidebar-item${item.active ? ' active' : ''}`}
              onClick={() => handleMenuClick(item.label)}
            >
              <item.icon className="sidebar-icon" />
              {!sidebarCollapsed && <span className="sidebar-label">{item.label}</span>}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main-content">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;