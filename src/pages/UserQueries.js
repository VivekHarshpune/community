import React, { useState, useEffect } from "react";
import "./UserQueries.css"; // Import the CSS file for styles

const UserQueries = () => {
  const [queries, setQueries] = useState([]); // Store all queries
  const [filteredQueries, setFilteredQueries] = useState([]); // Store filtered queries
  const [search, setSearch] = useState(""); // Search input value
  const [statusFilter, setStatusFilter] = useState("all"); // Status filter
  const [error, setError] = useState(null); // Error state
  const [loading, setLoading] = useState(true); // Loading state
  const [notification, setNotification] = useState(""); // Notification message
  const [selectedQuery, setSelectedQuery] = useState(null); // Selected query for viewing details

  // Fetch queries from the backend
  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/contact"); // Backend URL
        if (!response.ok) {
          throw new Error("Failed to fetch queries");
        }
        const data = await response.json();
        setQueries(data);
        setFilteredQueries(data); // Initialize filtered queries
        setLoading(false);
      } catch (error) {
        console.error("Error fetching queries:", error.message);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchQueries();
  }, []);

  // Handle search input changes
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    filterQueries(searchTerm, statusFilter);
  };

  // Handle status filter changes
  const handleStatusFilter = (e) => {
    const selectedStatus = e.target.value;
    setStatusFilter(selectedStatus);
    filterQueries(search, selectedStatus);
  };

  // Filter queries based on search term and status
  const filterQueries = (searchTerm, status) => {
    let filtered = [...queries];

    if (status !== "all") {
      filtered = filtered.filter((query) => query.status === status);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (query) =>
          query.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          query.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredQueries(filtered);
  };

  // Update query status (Accept or Resolve)
  const updateQueryStatus = async (queryId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5001/api/contact/${queryId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update query status to ${newStatus}`);
      }

      const updatedQuery = await response.json();

      // Update the local state
      setQueries((prevQueries) =>
        prevQueries.map((query) =>
          query._id === updatedQuery.query._id ? updatedQuery.query : query
        )
      );
      setFilteredQueries((prevFilteredQueries) =>
        prevFilteredQueries.map((query) =>
          query._id === updatedQuery.query._id ? updatedQuery.query : query
        )
      );

      // Notification for admin
      setNotification(
        `Query #${updatedQuery.query._id} marked as ${newStatus} and email sent to ${updatedQuery.query.email}`
      );
    } catch (error) {
      console.error(`Error updating query to ${newStatus}:`, error.message);
      setError(error.message);
    }
  };

  // Handle viewing details
  const handleViewDetails = (query) => {
    setSelectedQuery(query); // Set the selected query
  };

  // Handle closing the modal
  const closeModal = () => {
    setSelectedQuery(null); // Clear the selected query
  };

  return (
    <div className="queries-container">
      <h1>User Queries</h1>

      {/* Notification */}
      {notification && <p className="notification">{notification}</p>}

      {loading && <p className="loading-message">Loading queries...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <>
          {/* Search and Filter Section */}
          <div className="filters">
            <input
              type="text"
              placeholder="Search by user name or email..."
              value={search}
              onChange={handleSearch}
              className="search-input"
            />
            <select
              value={statusFilter}
              onChange={handleStatusFilter}
              className="status-filter"
            >
              <option value="all">All</option>
              <option value="open">Open</option>
              <option value="accepted">Accepted</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          {/* Queries Table */}
          {filteredQueries.length > 0 ? (
            <table className="queries-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredQueries.map((query) => (
                  <tr key={query._id}>
                    <td>{query.name}</td>
                    <td>{query.email}</td>
                    <td>{query.message}</td>
                    <td>{query.status}</td>
                    <td>
                      {query.status === "open" && (
                        <>
                          <button
                            onClick={() => updateQueryStatus(query._id, "accepted")}
                            className="accept-btn"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => updateQueryStatus(query._id, "resolved")}
                            className="resolve-btn"
                          >
                            Resolve
                          </button>
                        </>
                      )}
                      {query.status === "accepted" && (
                        <button
                          onClick={() => updateQueryStatus(query._id, "resolved")}
                          className="resolve-btn"
                        >
                          Resolve
                        </button>
                      )}
                      <button
                        onClick={() => handleViewDetails(query)}
                        className="view-btn"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-queries-message">No queries found.</p>
          )}
        </>
      )}

      {/* Details Modal */}
      {selectedQuery && (
        <div className="modal">
          <div className="modal-content">
            <h2>Query Details</h2>
            <p><b>Name:</b> {selectedQuery.name}</p>
            <p><b>Email:</b> {selectedQuery.email}</p>
            <p><b>Message:</b> {selectedQuery.message}</p>
            <p><b>Status:</b> {selectedQuery.status}</p>
            <button onClick={closeModal} className="close-btn">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserQueries;
