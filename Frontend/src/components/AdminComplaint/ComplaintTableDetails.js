import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Nav from '../Nav2/Nav2';
import ComplaintTable from './ComplaintTable';
import './ComplaintTableDetails.css';
import { useNavigate } from "react-router-dom";

const URL = "http://localhost:8070/complaint";

const fetchHandler = async() =>{
  return await axios.get(URL).then((res)=> res.data);
}

function ComplaintTableDetails() {
  const [complaints, setComplaints] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const ComponentsRef = useRef();

  useEffect(() => {
    fetchHandler().then((data) => {
      if (data && Array.isArray(data.complaints)) {
        setComplaints(data.complaints);
      } else {
        console.error("Expected complaints array, got:", data);
      }
    });
  }, []);

  const handleSearch = () => {
    fetchHandler().then((data) => {
      if (data && Array.isArray(data.complaints)) {
        const filtered = data.complaints.filter((complaint) =>
          Object.values(complaint).some((val) =>
            val?.toString().toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
        setComplaints(filtered);
        setNoResults(filtered.length === 0);
      } else {
        setComplaints([]);
        setNoResults(true);
      }
    });
  };

  const handleStatusFilter = (status) => {
    fetchHandler().then((data) => {
      if (data && Array.isArray(data.complaints)) {
        const filtered = data.complaints.filter(
          (complaint) =>
            (complaint.status || "Pending").toLowerCase() === status.toLowerCase()
        );
        setComplaints(filtered);
        setNoResults(filtered.length === 0);
      }
    });
  };

  const navigate = useNavigate();

  return (
    <div className="complaint-dashboard">
      <Nav />
      <div className="complaint-content">
        <h3 className="hading-a">Manage Complaints</h3>

        <div className="top-bar">
          <div className="search-cont">
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              name="search"
              placeholder="Search by user type"
              className="serch-e"
            />
            <button onClick={handleSearch} className="srch-btn">
              Search
            </button>
          </div>

          <div className="status-btn">
            <button onClick={() => handleStatusFilter("Pending")} className="pending-btn">Pending</button>
            <button onClick={() => handleStatusFilter("Rejected")} className="reject-btn">Rejected</button>
            <button onClick={() => handleStatusFilter("Resolved")} className="resolved-btn">Resolved</button>
          </div>
        </div>

        {complaints.length === 0 ? (
          <div className="empty-message">
            <p>
              {noResults ? "No complaints match your search or filter." : "No complaints available."}
            </p>
            <button className="reload-btn" onClick={() => window.location.reload()}>
              Reload Complaints
            </button>
          </div>
        ) : (
          <div ref={ComponentsRef} className="table-container">
            <table className="ad-complaint-tbl">
              <thead className="ad-tbl-head">
                <tr>
                  <th className="a-t-h">ID Number</th>
                  <th className="a-t-h">Name</th>
                  <th className="a-t-h">Email</th>
                  <th className="a-t-h">User Type</th>
                  <th className="a-t-h">Complaint</th>
                  <th className="a-t-h">Response</th>
                  <th className="a-t-h">Status</th>
                  <th className="a-t-h">Actions</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((complaint, i) => (
                  <ComplaintTable key={i} complaint={complaint} />
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        <div className="action-buttons">
          <button onClick={() => navigate('/complaintReport')} className="report-btn">Generate Report</button>
        </div>
      </div>
    </div>
  );
}

export default ComplaintTableDetails;