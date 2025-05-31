import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Nav from "../Nav2/Nav2";
import AdminFeedback from "./AdminFeedback";
import "./AdminFeedbackDetails.css";
import { useNavigate } from "react-router-dom";

const URL = "http://localhost:8070/review";

function AdminFeedbackDetails() {
  const [feedback, setFeedback] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const ComponentsRef = useRef(null);

  // Function to fetch all feedback
  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(URL);
      console.log("Fetched feedback data:", response.data);
      if (response.data && response.data.review) {
        setFeedback(response.data.review);
        return response.data.review;
      } else {
        setFeedback([]);
        return [];
      }
    } catch (error) {
      console.error("Error fetching feedback:", error);
      setFeedback([]);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setNoResults(false);
      return;
    }

    const filteredFeedback = feedback.filter(
      (feedback) =>
        feedback.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feedback.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feedback.description?.toLowerCase().includes(searchQuery.toLowerCase())
        );

    setFeedback(filteredFeedback);
    setNoResults(filteredFeedback.length === 0);
  };

  const resetSearch = async () => {
    setSearchQuery("");
    await fetchFeedbacks();
    setNoResults(false);
  };

  const handleStatusFilter = async (rating) => {
    try {
      const allFeedback = await fetchFeedbacks();
      const filtered = allFeedback.filter(
          (item) => item.rating?.toString() === rating.toString()
        );
        setFeedback(filtered);
        setNoResults(filtered.length === 0);
    } catch (error) {
      console.error("Error filtering feedback:", error);
        setFeedback([]);
        setNoResults(true);
    }
  };

  return (
    <div className="adfb-container">
      <Nav />
      <h2>Feedback Management</h2>
      <div className="adfb-search-bar">
          <input
          type="text"
          placeholder="Search by name, email, or feedback"
          value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        <button onClick={handleSearch}>Search</button>
        <button onClick={resetSearch}>Reset</button>
        </div>

        <div className="adfb-filter-section">
          <label>Filter by Rating:</label>
          <select onChange={(e) => handleStatusFilter(e.target.value)}>
            <option value="">All</option>
            {[1, 2, 3, 4, 5].map((r) => (
              <option key={r} value={r}>
                {r} Star
              </option>
            ))}
          </select>
      </div>

      {loading ? (
        <p>Loading feedback data...</p>
      ) : feedback.length === 0 ? (
        <div className="adfb-empty-message">
          <p>
            {noResults
              ? "No feedback matches your search or filter."
              : "No feedback available."}
          </p>
        </div>
      ) : (
        <div ref={ComponentsRef}>
          <table className="adfb-table">
            <thead className="adfb-table-head">
              <tr>
                <th className="adfb-th">F_No</th>
                <th className="adfb-th">Name</th>
                <th className="adfb-th">Email</th>
                <th className="adfb-th">Feedback</th>
                <th className="adfb-th">Rating</th>
                <th className="adfb-th">Actions</th>
              </tr>
            </thead>
            <tbody>
              {feedback.map((item, i) => (
                <AdminFeedback key={i} feedback={item} no={i + 1} />
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button className="adfb-download-btn" onClick={() => navigate("/feedbacktrends")}>
        Generate Report
      </button>
    </div>
  );
}

export default AdminFeedbackDetails;