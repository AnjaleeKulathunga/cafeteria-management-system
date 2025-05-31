import React, { useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ContactusDisplay.css";

const URL = "http://localhost:8070/contact";

const fetchHandler = async () => {
  try {
    const res = await axios.get(URL);
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { contacts: [] };
  }
};

function ContactusDisplay() {
  const [latestContact, setLatestContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchHandler();
        // Sort based on _id timestamp (most recent first)
        const sorted = data.contacts.sort((a, b) => {
          const aTimestamp = parseInt(a._id.substring(0, 8), 16);
          const bTimestamp = parseInt(b._id.substring(0, 8), 16);
          return bTimestamp - aTimestamp;
        });
        setLatestContact(sorted[0] || null);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleUpdate = (contactData) => {
    navigate(`/update-contact/${contactData._id}`, { state: { contactData } });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this contact?");
    if (confirmDelete) {
      try {
        await axios.delete(`${URL}/${id}`);
        setLatestContact(null); // Don't show any contact after deletion
      } catch (error) {
        console.error("Error deleting contact:", error);
        alert("Error deleting contact. Please try again.");
      }
    }
  };

  return (
    <div className="contactus-container1">
      {loading ? (
        <p>Loading...</p>
      ) : latestContact ? (
        <table className="contactus-table1">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Address</th>
              <th>Service Type</th>
              <th>Message</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr key={latestContact._id}>
              <td>{latestContact.name}</td>
              <td>{latestContact.email}</td>
              <td>{latestContact.contact}</td>
              <td>{latestContact.address}</td>
              <td>{latestContact.servicetype}</td>
              <td>{latestContact.message}</td>
              <td>
                <button className="update-button1" onClick={() => handleUpdate(latestContact)}>Update</button>
                <button className="delete-button1" onClick={() => handleDelete(latestContact._id)}>Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Deleted successfully</p>
      )}
    </div>
  );
}

export default ContactusDisplay;
