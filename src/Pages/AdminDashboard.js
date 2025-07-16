import React from 'react';
import '../styles/AdminDashboard.css';
import UserProfile from '../Components/UserProfile';

const user = JSON.parse(localStorage.getItem('user')) || { name: 'Admin' };

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-container">
      <header className="admin-dashboard-header">
        <div className="admin-dashboard-header-content">
          <button className="menu-icon" aria-label="Menu">
            <span role="img" aria-label="menu">☰</span>
          </button>
          <UserProfile user={user} />
        </div>
      </header>
      {/* ...existing dashboard content... */}
      <main className="admin-dashboard-main">
        <h2>Admin Dashboard</h2>
        {/* Add your dashboard widgets/components here */}
      </main>
    </div>
  );
};

export default AdminDashboard;

