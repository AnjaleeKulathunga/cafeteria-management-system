import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Nav from '../Nav2/Nav2';
import './ComplaintView.css';


function ComplaintView() {
  const [inputs, setInputs] = useState({
    idNo: "",
    name: "",
    email: "",
    userType: "",
    description: "",
    status: "",
    reply: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8070/complaint/${id}`);
        const data = response.data;
        if (data && data.complaint) {
          setInputs(data.complaint);
        }
      } catch (error) {
        console.error("Error fetching complaint:", error);
        setError("Failed to fetch complaint details. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    try {
      const response = await axios.put(`http://localhost:8070/complaint/${id}`, {
        idNo: String(inputs.idNo || ""),
        name: String(inputs.name || ""),
        email: String(inputs.email || ""),
        userType: String(inputs.userType || ""),
        description: String(inputs.description || ""),
        status: inputs.status || "Pending",
        reply: inputs.reply || ""
      });
      return response.data;
    } catch (error) {
      console.error("Error updating complaint:", error);
      throw error;
    }
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendRequest();
      history('/adminComplaintTable');
    } catch (error) {
      alert("Failed to update complaint. Please try again.");
    }
  };

  if (loading) return <div>Loading complaint details...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
        <Nav/>
        <div className="update-container">
      <h2>Manage Complaint</h2>
      <form onSubmit={handleSubmit} className="update-form">
        <div className="form-group">
          <label>ID Number</label>
          <input 
            type="text" 
            name="idNo" 
            onChange={handleChange} 
            value={inputs.idNo || ""} 
            readOnly
          />
        </div>
        
        <div className="form-group">
          <label>Name</label>
          <input 
            type="text" 
            name="name" 
            onChange={handleChange} 
            value={inputs.name || ""} 
            readOnly
          />
        </div>
        
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            name="email" 
            onChange={handleChange} 
            value={inputs.email || ""} 
            readOnly
          />
        </div>
        
        <div className="form-group">
          <label>User Type</label>
          <select 
            name="userType" 
            onChange={handleChange} 
            value={inputs.userType || ""} 
            readOnly
          >
            <option value="">Select User Type</option>
            <option value="Student">Student</option>
            <option value="Kitchen Staff">Kitchen Staff</option>
            <option value="Cashier">Cashier</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Complaint</label>
          <textarea 
            name="description" 
            rows="5"
            onChange={handleChange} 
            value={inputs.description || ""} 
            readOnly
          ></textarea>
        </div>
        <div className='form-group'>
            <label>Reply</label>
            <textarea
            name="reply"
            onChange={handleChange}
            value={inputs.reply || ""}
            required/>
        </div>
        <div className='form-group'>
  <label>Status</label>
  <div className="status-buttons">
    <button type="button" onClick={() => setInputs({ ...inputs, status: "Resolved" })}>Resolved</button>
    <button type="button" onClick={() => setInputs({ ...inputs, status: "Rejected" })}>Reject</button>
  </div>
</div>

        <div className="form-actions">
          <button type="submit" className="update-button">Send</button>
          <button type="button" className="cancel-button" onClick={() => history('/adminComplaintTable')}>Cancel</button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default ComplaintView