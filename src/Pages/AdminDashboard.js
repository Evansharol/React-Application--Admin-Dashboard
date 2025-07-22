import React from 'react';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => (
  <div className="admin-dashboard">
    <Sidebar />
    <div className="main-content">
      <Header userName="Admin" />
      <div className="dashboard-content">
        <div className="welcome-section">
          <h1>Welcome to Admin Dashboard</h1>
          <p>Manage your application efficiently</p>
        </div>
        {/* Add more dashboard content sections here */}
      </div>
    </div>
  </div>
);

export default AdminDashboard;