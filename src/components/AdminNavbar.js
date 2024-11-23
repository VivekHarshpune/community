import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminNavbar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken'); // Remove token from local storage
    onLogout(); // Call the logout function passed as a prop
    navigate('/admin-login'); // Redirect to login page after logout
  };

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>ADMIN</h2>
      <ul style={styles.navLinks}>
        <li><Link to="/" style={styles.link}>Dashboard</Link></li>
        <li><Link to="/user-management" style={styles.link}>User Management</Link></li>
        <li><Link to="/vendee-management" style={styles.link}>Vendee Management</Link></li>
        <li><Link to="/user-queries" style={styles.link}>User Queries</Link></li> {/* New link */}
        {!isLoggedIn ? (
          <>
            <li><Link to="/admin-login" style={styles.link}>Login</Link></li>
            <li><Link to="/admin-register" style={styles.link}>Register</Link></li>
          </>
        ) : (
          <li>
            <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: '10px 20px',
    color: 'white',
  },
  logo: {
    fontSize: '24px',
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    gap: '15px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
  },
  logoutButton: {
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '18px',
    cursor: 'pointer',
  },
};

export default AdminNavbar;
