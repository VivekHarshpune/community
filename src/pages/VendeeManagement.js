import React, { useState, useEffect } from 'react';
import './VendeeManagement.css'; // Import CSS file for animations and styles

const VendeeManagement = () => {
  const [vendees, setVendees] = useState([]);
  const [showSection, setShowSection] = useState('vendeeData'); // Control the section display

  useEffect(() => {
    // Fetch vendees from the backend
    fetch('/api/vendees')
      .then(response => response.json())
      .then(data => setVendees(data));
  }, []);

  const renderSection = () => {
    switch (showSection) {
      case 'vendeeData':
        return (
          <div className="section-content">
            <h2>Vendee Data</h2>
            <table className="vendee-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Services</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {vendees.map(vendee => (
                  <tr key={vendee.id}>
                    <td>{vendee.id}</td>
                    <td>{vendee.name}</td>
                    <td>{vendee.location}</td>
                    <td>{vendee.services.join(', ')}</td>
                    <td>
                      <button className="action-btn">Delete</button>
                      <button className="action-btn">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'addVendee':
        return (
          <div className="section-content">
            <h2>Add Vendee</h2>
            <form className="vendee-form">
              <input type="text" placeholder="Name" />
              <input type="text" placeholder="Location" />
              <input type="text" placeholder="Services (comma-separated)" />
              <button type="submit" className="submit-btn">Add Vendee</button>
            </form>
          </div>
        );
      case 'vendeeProfile':
        return (
          <div className="section-content">
            <h2>Vendee Profile</h2>
            {/* Add vendee profile details here */}
            <p>Vendee details will be displayed here.</p>
          </div>
        );
      case 'deletedVendees':
        return (
          <div className="section-content">
            <h2>Deleted Vendees</h2>
            <table className="vendee-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Restored</th>
                </tr>
              </thead>
              <tbody>
                {/* Render deleted vendees here */}
                <tr>
                  <td>1</td>
                  <td>Deleted Vendee</td>
                  <td>Unknown</td>
                  <td><button className="action-btn">Restore</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="vendee-management-container">
      <nav className="sidebar">
        <h1>Admin Dashboard</h1>
        <ul className="nav-list">
          <li className="nav-item" onClick={() => setShowSection('vendeeData')}>Vendee Data</li>
          <li className="nav-item" onClick={() => setShowSection('addVendee')}>Add Vendee</li>
          <li className="nav-item" onClick={() => setShowSection('vendeeProfile')}>Vendee Profile</li>
          <li className="nav-item" onClick={() => setShowSection('deletedVendees')}>Deleted Vendees</li>
        </ul>
      </nav>
      <div className="main-content">
        {renderSection()}
      </div>
    </div>
  );
};

export default VendeeManagement;
