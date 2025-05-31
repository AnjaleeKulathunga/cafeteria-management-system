import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Nav from '../Nav/Nav';
import './complaintUpdate.css';


function ComplaintUpdate() {
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
      // history('/complaintdetails');
      Swal.fire({
            icon: 'success',
            title: 'Complaint Updated',
            text: 'Your complaint has been successfully updated!',
            confirmButtonText: 'OK'
          }).then(() => {
            history('/complaintdetails');
          });
    } catch (error) {
      alert("Failed to update complaint. Please try again.");
    }
  };

  if (loading) return <div>Loading complaint details...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Nav/>
      <div className="head-sect">
            <div className="complaint-header">
              <h1 className="comp-title">Edit your Complaint Here!</h1>
              <p className="comp-subtitle">View, search, and track your submitted complaints below.</p>
            </div>   
          </div> 
      <div className="update-container">
      <form onSubmit={handleSubmit} className="update-form">
        <div className="form-grp">
          <label>ID Number</label>
          <input 
            type="text" 
            name="idNo" 
            onChange={handleChange} 
            value={inputs.idNo || ""} 
            required
          />
        </div>
        <div className="form-grp">
          <label>Name</label>
          <input 
            type="text" 
            name="name" 
            onChange={handleChange} 
            value={inputs.name || ""} 
            required
          />
        </div>
        
        <div className="form-grp">
          <label>Email</label>
          <input 
            type="email" 
            name="email" 
            onChange={handleChange} 
            value={inputs.email || ""} 
            required
          />
        </div>
        
        <div className="form-grp">
          <label>User Type</label>
          <select 
            name="userType" 
            onChange={handleChange} 
            value={inputs.userType || ""} 
            required
          >
            <option value="">Select User Type</option>
            <option value="Student">Student</option>
            <option value="Kitchen Staff">Kitchen Staff</option>
            <option value="Cashier">Cashier</option>
          </select>
        </div>
        
        <div className="form-grp">
          <label>Description</label>
          <textarea 
            name="description" 
            rows="5"
            onChange={handleChange} 
            value={inputs.description || ""} 
            required
          ></textarea>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="updt-button">Update Complaint</button>
          <button type="button" className="cncl-button" onClick={() => history('/complaintDetails')}>Cancel</button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default ComplaintUpdate;