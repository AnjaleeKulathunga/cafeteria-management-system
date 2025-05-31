import React, { useRef, useState, useContext } from 'react';
import emailjs from '@emailjs/browser';
import { StoreContext } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import './Contactus.css';
import Nav from '../Nav/Nav';
import Nav2 from '../Nav2/Nav2';

function Contactus() {
  const navigate = useNavigate();
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const { token, user } = useContext(StoreContext);
  const userRole = localStorage.getItem("userRole");

  const sendRequest = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // First send the email
      await emailjs.sendForm(
        'service_75zzux8',
        'template_k01b00p',
        form.current, 
        '8I8BXluKZ1mpYI8Hp'
      );

      // Then save to database
      const formData = new FormData(form.current);
      const data = {
        name: formData.get('name'),
        email: user.email, // Use logged-in user's email
        contact: formData.get('contact'),
        address: formData.get('address'),
        servicetype: formData.get('servicetype'),
        message: formData.get('message')
      };

      console.log('Sending contact data:', data);

      const response = await fetch('http://localhost:8070/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Oops, we haven't got JSON!");
      }

      const result = await response.json();
      console.log('Contact saved successfully:', result);
      alert("Success! Your message has been sent.");
      
      // Admin and regular users now have different ContactusDisplay routes
      if (userRole === "admin" || userRole === "staff") {
        navigate('/ContactusDisplay'); // This will maintain Nav2 context
      } else {
        navigate('/ContactusDisplay'); // This will maintain Nav context
      }
    } catch (error) {
      console.error('Error in contact submission:', error);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Render the correct navigation based on user role */}
      {(userRole === "admin" || userRole === "staff") ? <Nav2 /> : <Nav />}
      
      <div className="contact-container">
        <div className="contact-form-container">
          <h1>Contact us</h1>
          <form ref={form} onSubmit={sendRequest} autoComplete="off">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
            
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" defaultValue={user?.email} readOnly />
            
            <label htmlFor="contact">Contact:</label>
            <input type="text" id="contact" name="contact" required />
            
            <label htmlFor="address">Address:</label>
            <input type="text" id="address" name="address" required />
            
            <label htmlFor="servicetype">Service Type:</label>
            <input type="text" id="servicetype" name="servicetype" required />
            
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" required></textarea>
            
            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Contactus;