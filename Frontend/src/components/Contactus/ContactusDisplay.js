import React, { useState, useEffect, useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import '../ContactusDisplay/ContactusDisplay.css';
import Nav from '../Nav/Nav';
import Nav2 from '../Nav2/Nav2';

function ContactusDisplay() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token, user } = useContext(StoreContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const userRole = localStorage.getItem("userRole");

  const fetchContacts = async () => {
    try {
      setLoading(true);
      console.log('Fetching contacts for user:', user?.email);
      
      const response = await fetch('http://localhost:8070/contact/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Oops, we haven't got JSON!");
      }

      const data = await response.json();
      console.log('Received contacts data:', data);
      
      // Ensure data is an array
      const contactsArray = Array.isArray(data.contacts) ? data.contacts : [data.contacts];
      console.log('Processed contacts array:', contactsArray);
      
      // If user is not admin, filter to show only their contacts
      if (user && user.role !== 'admin') {
        const filteredContacts = contactsArray.filter(contact => contact.email === user.email);
        console.log('Filtered contacts for user:', filteredContacts);
        setContacts(filteredContacts);
      } else {
        setContacts(contactsArray);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setContacts([]);
      setErrorMessage('Error loading contacts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      console.log('No token found');
      // Check if there's stored token in localStorage that we can use
      const storedToken = localStorage.getItem('token');
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      
      if (storedToken) {
        console.log('Found stored token, proceeding with fetch');
        // We have a token in localStorage, proceed with fetch
        fetchContacts();
      } else {
        console.log('No stored token either, redirecting to login');
        setErrorMessage('Please log in to view your contact submissions');
        setTimeout(() => {
          navigate('/log');
        }, 2000); // Give user 2 seconds to read the message
      }
    } else {
      console.log('Token found, proceeding with fetch');
      fetchContacts();
    }
  }, [token, user, navigate]);

  const setTemporaryErrorMessage = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 3000); // Clear message after 3 seconds
  };

  const handleUpdate = (contactId) => {
    console.log(`Navigating to update page for contact ID: ${contactId}`);
    navigate(`/updatecontactus/${contactId}`);
  };

  const handleDelete = async (contactId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this contact submission?");
    if (confirmDelete) {
      try {
        // Get token either from context or localStorage
        const authToken = token || localStorage.getItem('token');
        const currentUser = user || JSON.parse(localStorage.getItem('user') || '{}');
        
        if (!authToken) {
          console.error("No authentication token found");
          setTemporaryErrorMessage("You must be logged in to delete contacts");
          return;
        }
        
        // Find the contact to be deleted
        const contactToDelete = contacts.find(contact => contact._id === contactId);
        
        // For regular users, verify they own this contact
        if (currentUser.role !== 'admin' && contactToDelete && contactToDelete.email !== currentUser.email) {
          setTemporaryErrorMessage("You can only delete your own contact submissions");
          return;
        }
        
        console.log(`Deleting contact with ID: ${contactId}`);
        
        const response = await fetch(`http://localhost:8070/contact/${contactId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Remove the deleted contact from the state
        setContacts(contacts.filter(contact => contact._id !== contactId));
        alert("Contact submission deleted successfully!");
      } catch (error) {
        console.error('Error deleting contact:', error);
        setTemporaryErrorMessage("Error deleting contact: " + error.message);
      }
    }
  };

  return (
    <>
      {/* Render the correct navigation based on user role */}
      {(userRole === "admin" || userRole === "staff") ? <Nav2 /> : <Nav />}
      
      <div className="contact-display-container">
        <div className="contact-display-content">
          <div className="contact-display-card">
            <div className="contact-display-header">
              <h2>{user && user.role === 'admin' ? 'All Contact Submissions' : 'Your Contact Submissions'}</h2>
            </div>
            
            {errorMessage && (
              <div className="error-message">
                {errorMessage}
              </div>
            )}
            
            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading contacts...</p>
              </div>
            ) : (
              <div className="contact-list">
                {contacts.length === 0 && !errorMessage ? (
                  <p>No contact submissions found.</p>
                ) : (
                  contacts.map((contact, index) => (
                    <div key={contact._id || index} className="contact-item">
                      <h3>Message #{index + 1}</h3>
                      <p><strong>Name:</strong> {contact.name}</p>
                      <p><strong>Email:</strong> {contact.email}</p>
                      <p><strong>Contact:</strong> {contact.Contact || contact.contact}</p>
                      <p><strong>Address:</strong> {contact.address}</p>
                      <p><strong>Service Type:</strong> {contact.servicetype}</p>
                      <p className="message-content"><strong>Message:</strong> {contact.message}</p>
                      <p><strong>Date:</strong> {contact.createdAt ? new Date(contact.createdAt).toLocaleDateString() : 'N/A'}</p>
                      <div className="contact-actions">
                        <button className="update-button" onClick={() => handleUpdate(contact._id)}>Update</button>
                        <button className="delete-button" onClick={() => handleDelete(contact._id)}>Delete</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactusDisplay; 