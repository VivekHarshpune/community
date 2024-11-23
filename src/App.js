import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminNavbar from './components/AdminNavbar';
import AdminDashboard from './pages/AdminDashboard';
import UserManagement from './pages/UserManagement';
import VendeeManagement from './pages/VendeeManagement';
import AdminSettings from './pages/AdminSettings';
import AdminLogin from './pages/AdminLogin';
import AdminRegister from './pages/AdminRegister';
import UserQueries from './pages/UserQueries'; // Import the UserQueries page

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('adminToken'));

  const handleLogout = () => {
    localStorage.removeItem('adminToken'); // Remove token from local storage
    setIsLoggedIn(false); // Update state to logged out
  };

  return (
    <Router>
      <div className="App">
        <AdminNavbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/vendee-management" element={<VendeeManagement />} />
          <Route path="/settings" element={<AdminSettings />} />
          <Route path="/admin-login" element={<AdminLogin setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/admin-register" element={<AdminRegister />} />
          <Route path="/user-queries" element={<UserQueries />} /> {/* Add route for User Queries */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
