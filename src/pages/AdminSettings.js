import React from 'react';
import './AdminSettings.css'; // Import the CSS file for styles

const AdminSettings = () => {
  return (
    <div className="settings-container">
      <h1 className="settings-title">Admin Settings</h1>

      {/* Profile Management Section */}
      <section className="settings-section">
        <h2 className="section-title">Profile Management</h2>
        <div className="setting">
          <label htmlFor="admin-name" className="setting-label">Admin Name:</label>
          <input
            id="admin-name"
            type="text"
            placeholder="Enter admin name"
            className="setting-input"
          />
        </div>
        <div className="setting">
          <label htmlFor="admin-email" className="setting-label">Admin Email:</label>
          <input
            id="admin-email"
            type="email"
            placeholder="Enter admin email"
            className="setting-input"
          />
        </div>
        <div className="setting">
          <label htmlFor="profile-picture" className="setting-label">Profile Picture:</label>
          <input
            id="profile-picture"
            type="file"
            className="setting-input"
          />
        </div>
      </section>

      {/* Account Settings Section */}
      <section className="settings-section">
        <h2 className="section-title">Account Settings</h2>
        <div className="setting">
          <label htmlFor="change-password" className="setting-label">Change Password:</label>
          <input
            id="change-password"
            type="password"
            placeholder="Enter new password"
            className="setting-input"
          />
        </div>
      </section>

      {/* Security Settings Section */}
      <section className="settings-section">
        <h2 className="section-title">Security Settings</h2>
        <div className="setting">
          <label htmlFor="two-factor-auth" className="setting-label">Two-Factor Authentication:</label>
          <input
            id="two-factor-auth"
            type="checkbox"
            className="setting-checkbox"
          />
        </div>
        <div className="setting">
          <label htmlFor="login-alerts" className="setting-label">Login Alerts:</label>
          <input
            id="login-alerts"
            type="checkbox"
            className="setting-checkbox"
          />
        </div>
        <div className="setting">
          <label htmlFor="ip-whitelist" className="setting-label">IP Whitelisting:</label>
          <input
            id="ip-whitelist"
            type="text"
            placeholder="Enter allowed IPs (comma-separated)"
            className="setting-input"
          />
        </div>
      </section>

      {/* Notification Preferences Section */}
      <section className="settings-section">
        <h2 className="section-title">Notification Preferences</h2>
        <div className="setting">
          <label htmlFor="email-notifications" className="setting-label">Email Notifications:</label>
          <input
            id="email-notifications"
            type="checkbox"
            className="setting-checkbox"
          />
        </div>
        <div className="setting">
          <label htmlFor="sms-notifications" className="setting-label">SMS Notifications:</label>
          <input
            id="sms-notifications"
            type="checkbox"
            className="setting-checkbox"
          />
        </div>
      </section>

      {/* Data Management Section */}
      <section className="settings-section">
        <h2 className="section-title">Data Management</h2>
        <div className="setting">
          <label htmlFor="backup-now" className="setting-label">Backup Data:</label>
          <button className="action-btn">Backup Now</button>
        </div>
        <div className="setting">
          <label htmlFor="restore-backup" className="setting-label">Restore Data:</label>
          <input
            id="restore-backup"
            type="file"
            className="setting-input"
          />
        </div>
      </section>

      {/* Appearance Settings Section */}
      <section className="settings-section">
        <h2 className="section-title">Appearance Settings</h2>
        <div className="setting">
          <label htmlFor="dark-mode" className="setting-label">Enable Dark Mode:</label>
          <input
            id="dark-mode"
            type="checkbox"
            className="setting-checkbox"
          />
        </div>
        <div className="setting">
          <label htmlFor="brand-logo" className="setting-label">Upload Brand Logo:</label>
          <input
            id="brand-logo"
            type="file"
            className="setting-input"
          />
        </div>
      </section>

      {/* Save Changes Button */}
      <div className="settings-actions">
        <button className="save-btn">Save Changes</button>
      </div>
    </div>
  );
};

export default AdminSettings;
