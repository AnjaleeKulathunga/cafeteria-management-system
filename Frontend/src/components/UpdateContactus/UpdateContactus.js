import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import "./UpdateContactus.css"; // Assuming you'll create a matching CSS file

function UpdateContactus() {
  const [input, setInputs] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const contactData = location.state?.contactData;
  const { token, user } = useContext(StoreContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Check if we have token, otherwise try localStorage
        const authToken = token || localStorage.getItem('token');
        
        if (!authToken) {
          console.error("No authentication token found");
          setError("You must be logged in to update contacts");
          setTimeout(() => navigate('/log'), 2000);
          return;
        }
        
        if (contactData) {
          console.log("Using passed contact data:", contactData);
          setInputs(contactData);
        } else {
          console.log("Fetching contact data for ID:", id);
          const res = await axios.get(`http://localhost:8070/contact/${id}`, {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
          });
          
          console.log("Fetched data:", res.data);
          
          const currentUser = user || JSON.parse(localStorage.getItem('user') || '{}');
          
          // For regular users, verify they own this contact
          if (currentUser.role !== 'admin' && res.data.contact.email !== currentUser.email) {
            setError("You can only edit your own contact submissions");
            setTimeout(() => navigate('/ContactusDisplay'), 2000);
            return;
          }
          
          setInputs(res.data.contact);
        }
      } catch (error) {
        console.error("Error loading contact data:", error);
        setError("Failed to load contact information. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, contactData, token, user, navigate]);

  const sendRequest = async () => {
    try {
      // Get token either from context or localStorage
      const authToken = token || localStorage.getItem('token');
      
      if (!authToken) {
        setError("Authentication token is missing");
        return;
      }
      
      const response = await axios.put(`http://localhost:8070/contact/${id}`, 
        {
          name: String(input.name),
          email: String(input.email),
          contact: String(input.contact),
          address: String(input.address),
          servicetype: String(input.servicetype),
          message: String(input.message),
        },
        {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.data.contact) {
        alert("Contact updated successfully!");
        navigate("/ContactusDisplay");
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      console.error("Error updating contact:", error);
      setError("Failed to update contact. Please try again.");
    }
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    sendRequest();
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading contact information...</p>
      </div>
    );
  }

  return (
    <div className="update-contact-container">
      <div className="update-contact-header">
        <h1>Update Contact</h1>
      </div>
      
      <div className="update-contact-form-container">
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              value={input.name || ""}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              value={input.email || ""}
              placeholder="Enter your email address"
              readOnly
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact">Contact Number</label>
            <input
              type="tel"
              id="contact"
              name="contact"
              onChange={handleChange}
              value={input.contact || ""}
              placeholder="Enter your contact number"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              onChange={handleChange}
              value={input.address || ""}
              placeholder="Enter your address"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="servicetype">Service Type</label>
            <select
              id="servicetype"
              name="servicetype"
              onChange={handleChange}
              value={input.servicetype || ""}
              required
            >
              <option value="" disabled>Select a service type</option>
              <option value="Catering">Catering</option>
              <option value="Event Planning">Event Planning</option>
              <option value="Delivery">Delivery</option>
              <option value="Consultation">Consultation</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              onChange={handleChange}
              value={input.message || ""}
              placeholder="Enter your message or special instructions"
              required
            ></textarea>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={() => navigate("/ContactusDisplay")}>
              Cancel
            </button>
            <button type="submit" className="update-btn">
              Update Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateContactus;