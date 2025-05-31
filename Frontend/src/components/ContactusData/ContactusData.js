import React from "react";
import "./ContactusData.css";

function ContactusData({ contactData, onUpdate, onDelete }) {
  if (!contactData) {
    return <p>Loading contact data...</p>;
  }

  const { _id, name, email, contact, address, servicetype, message } = contactData;

  const handleUpdate = () => {
    onUpdate(contactData);
  };

  const handleDelete = () => {
    onDelete(_id);
  };

  return (
    <div>
      <div className="contact-card">
        <h2>{name}</h2>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Contact:</strong> {contact}</p>
        <p><strong>Address:</strong> {address}</p>
        <p><strong>Service Type:</strong> {servicetype}</p>
        <p><strong>Message:</strong> {message}</p>
        <button onClick={handleUpdate}>Update</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default ContactusData;