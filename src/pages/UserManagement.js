import React, { useState, useEffect } from "react";
import "./UserManagement.css"; // Import CSS for styles and animations

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [deletedUsers, setDeletedUsers] = useState([]);
  const [selectedUserProfile, setSelectedUserProfile] = useState(null);
  const [showSection, setShowSection] = useState("userData"); // Control the displayed section

  useEffect(() => {
    // Fetch users from the backend
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));

    // Fetch deleted users
    fetch("/api/deleted-users")
      .then((response) => response.json())
      .then((data) => setDeletedUsers(data))
      .catch((error) => console.error("Error fetching deleted users:", error));
  }, []);

  const handleDeleteUser = (userId) => {
    // Logic to delete user
    console.log("Deleting user with ID:", userId);
  };

  const handleRestoreUser = (userId) => {
    // Logic to restore a deleted user
    console.log("Restoring user with ID:", userId);
  };

  const handleViewProfile = (userId) => {
    // Fetch user profile from the backend
    fetch(`/api/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedUserProfile(data);
        setShowSection("userProfile");
      })
      .catch((error) => console.error("Error fetching user profile:", error));
  };

  const renderSection = () => {
    switch (showSection) {
      case "userData":
        return (
          <div className="section-content">
            <h2>User Data</h2>
            <table className="user-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <button
                        className="action-btn"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="action-btn"
                        onClick={() => handleViewProfile(user.id)}
                      >
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "userBookings":
        return (
          <div className="section-content">
            <h2>User Bookings</h2>
            <p>Display and manage user bookings here (e.g., Badminton, Gym).</p>
            {/* Replace with dynamic booking data */}
            <table className="user-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Booking Type</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Badminton</td>
                  <td>2024-11-25</td>
                  <td>
                    <button className="action-btn">Modify</button>
                    <button className="action-btn">Cancel</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case "userProfile":
        return (
          <div className="section-content">
            <h2>User Profile</h2>
            {selectedUserProfile ? (
              <div className="profile-details">
                <p>
                  <strong>ID:</strong> {selectedUserProfile.id}
                </p>
                <p>
                  <strong>Name:</strong> {selectedUserProfile.name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedUserProfile.email}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedUserProfile.phone}
                </p>
                {/* Add more fields as necessary */}
                <button
                  className="action-btn"
                  onClick={() => setShowSection("userData")}
                >
                  Back to Users
                </button>
              </div>
            ) : (
              <p>Loading user profile...</p>
            )}
          </div>
        );
      case "deletedUsers":
        return (
          <div className="section-content">
            <h2>Deleted Users</h2>
            <table className="user-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Restore</th>
                </tr>
              </thead>
              <tbody>
                {deletedUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <button
                        className="action-btn"
                        onClick={() => handleRestoreUser(user.id)}
                      >
                        Restore
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default:
        return <div>Select a section from the menu.</div>;
    }
  };

  return (
    <div className="user-management-container">
      <nav className="sidebar">
        <h1>Admin Dashboard</h1>
        <ul className="nav-list">
          <li
            className="nav-item"
            onClick={() => setShowSection("userData")}
          >
            User Data
          </li>
          <li
            className="nav-item"
            onClick={() => setShowSection("userBookings")}
          >
            User Bookings
          </li>
          <li
            className="nav-item"
            onClick={() => setShowSection("deletedUsers")}
          >
            Deleted Users
          </li>
        </ul>
      </nav>
      <div className="main-content">{renderSection()}</div>
    </div>
  );
};

export default UserManagement;
