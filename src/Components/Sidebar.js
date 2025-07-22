import React from 'react';
import '../styles/Sidebar.css';

const Sidebar = () => (
  <div className="sidebar">
    <div className="sidebar-title">Stylesphere</div>
    <ul className="sidebar-menu">
      <li>Dashboard</li>
      <li>Products</li>
      <li>Customer</li>
      <li>Staff</li>
      <li>Setting</li>
    </ul>
  </div>
);

export default Sidebar;