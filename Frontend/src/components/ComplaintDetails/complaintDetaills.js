import axios from "axios";
import Complaint from "../Complaint/Complaint";
import { useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import { useNavigate } from "react-router-dom";
import './complaintDetails.css';

function ComplaintDetails() {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8070/complaint`);
      console.log('Fetched complaints:', response.data);
      const fetchedComplaints = response.data.complaints || [];
      setComplaints(fetchedComplaints);
      setFilteredComplaints(fetchedComplaints);
      setError(null);
    } catch (error) {
      console.error('Error fetching complaints:', error);
      setError('Failed to fetch complaints. Please try again.');
      setComplaints([]);
      setFilteredComplaints([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredComplaints(complaints);
      setNoResults(false);
      return;
    }

    const filtered = complaints.filter(complaint => 
      complaint.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.status.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setNoResults(filtered.length === 0);
    setFilteredComplaints(filtered);
  };

  const handleAddComplaint = () => {
    navigate('/addNewComplaint');
  };

  if (loading) {
    return (
      <div>
        <Nav />
        <div className="loading-message">Loading complaints...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Nav />
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div>
      <Nav/>
      <div className="comp-bd">
        <div className="head-sect">
          <div className="complaint-header">
            <h1 className="comp-title">Send us your Complaints</h1>
            <p className="comp-subtitle">View, search, and track your submitted complaints below.</p>
          </div>
          <div className="search-group">
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              name="search"
              placeholder="Search Complaint"
              className="serch"
            />
            <button onClick={handleSearch} className="srch">Search</button>
          </div>
        </div>

        <div className="add-complaint-section">
          <button onClick={handleAddComplaint} className="add-comp">Add Complaint</button>
        </div>

        {filteredComplaints.length === 0 ? (
          <div className="empty-message">
            <p>
              {noResults ? "No complaints match your search or filter." : "No complaints available."}
            </p>
            <button className="reload-btn" onClick={fetchComplaints}>
              Reload Complaints
            </button>
          </div>
        ) : (
          <div className='comp-bdy'>
            <table className='complaint-tbl'>
              <thead className='tbl-head'>
                <tr>
                  <th className='t-h'>ID Number</th>
                  <th className='t-h'>Name</th>
                  <th className='t-h'>Email</th>
                  <th className='t-h'>User Type</th>
                  <th className='t-h'>Complaint</th>
                  <th className='t-h'>Response</th>
                  <th className='t-h'>Status</th>
                  <th className='t-h'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.map((complaint, i) => (
                  <Complaint key={complaint._id || i} complaint={complaint} onDelete={fetchComplaints} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ComplaintDetails;
