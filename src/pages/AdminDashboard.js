import React from 'react';
import './AdminDashboard.css'; // Import the CSS file for styles

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2 className="logo">Community Book</h2>
        <ul className="nav-list">
          <li className="nav-item">
            <a href="/user-management" className="nav-link">Manage Users</a>
          </li>
          <li className="nav-item">
            <a href="/vendee-management" className="nav-link">Manage Vendees</a>
          </li>
          <li className="nav-item">
            <a href="/settings" className="nav-link">Settings</a>
          </li>
          <li className="nav-item">
            <a href="/user-queries" className="nav-link">User Queries</a>
          </li>
        </ul>
      </div>
      <div className="main-content">
        <header className="header">
          <h1 className="title">Welcome to Community Book Dashboard</h1>
          <p className="subtitle">Admin Panel</p>
        </header>
        <div className="cards-container">
          <div className="card">
            <h3 className="card-title">User Statistics</h3>
            <p className="card-content">Overview of user registrations and activity.</p>
          </div>
          <div className="card">
            <h3 className="card-title">Vendee Statistics</h3>
            <p className="card-content">Overview of vendor registrations and activity.</p>
          </div>
          <div className="card">
            <h3 className="card-title">Recent Activity</h3>
            <p className="card-content">Details of the latest actions and events.</p>
          </div>
          <div className="card">
            <h3 className="card-title">User Queries</h3>
            <p className="card-content">View and manage queries submitted by users.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
