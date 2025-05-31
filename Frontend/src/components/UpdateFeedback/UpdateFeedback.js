import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './UpdateFeedback.css';
import Nav from '../Nav/Nav'

function UpdateFeedback() {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:8070/feedback/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.feedback));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:8070/feedback/${id}`, {
        idNo: String(inputs.idNo),
        name: String(inputs.name),
        email: String(inputs.email),
        userType: String(inputs.userType),
        feedbackType: String(inputs.feedbackType),
        rating: Number(inputs.rating),
        description: String(inputs.description),
      })
      .then((res) => res.data);
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    await sendRequest();
    navigate('/feedbackdetails');
  };

  return (
    <div className="update-container">
      <Nav/>
      <div className="update-header">
        <h1>Update Feedback</h1>
      </div>
      <div className='update-form-container'>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>ID</label>
            <input type="text" name="idNo" onChange={handleChange} value={inputs.idNo || ""} required />
            
            <label>Name</label>
            <input type="text" name="name" onChange={handleChange} value={inputs.name || ""} required />
            
            <label>Email</label>
            <input type="email" name="email" onChange={handleChange} value={inputs.email || ""} required />
            
            <label>User Type</label>
            <input type="text" name="userType" onChange={handleChange} value={inputs.userType || ""} required />
            
            <label>Feedback Type</label>
            <input type="text" name="feedbackType" onChange={handleChange} value={inputs.feedbackType || ""} required />
            
            <label>Rating</label>
            <input type="number" name="rating" onChange={handleChange} value={inputs.rating || ""} required />
            
            <label>Description</label>
            <input type="text" name="description" onChange={handleChange} value={inputs.description || ""} required />
            
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateFeedback;
