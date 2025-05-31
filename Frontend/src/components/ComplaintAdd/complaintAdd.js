import React, { useState, useEffect } from 'react';import { useNavigate } from 'react-router-dom';import axios from 'axios';import Nav from '../Nav/Nav';import Nav2 from '../Nav2/Nav2';import './complaintAdd.css';import Swal from 'sweetalert2';import { useTranslation } from "react-i18next";

function ComplaintAdd() {
  const { t, i18n } = useTranslation(); // Moved inside the component

  useEffect(() => {
    const syncOfflineComplaints = async () => {
      const savedComplaints = JSON.parse(localStorage.getItem("offlineComplaints")) || [];

      const isValidComplaint = (c) =>
        c.idNo && c.name && c.email && c.userType && c.description;

      const filteredComplaints = savedComplaints.filter(isValidComplaint);

      for (let complaint of filteredComplaints) {
        try {
          await axios.post('http://localhost:8070/complaint', complaint);
          console.log("Synced complaint:", complaint);
        } catch (err) {
          console.error("Failed to sync complaint:", complaint, err.response?.data || err.message);
        }
      }

      localStorage.removeItem("offlineComplaints");
    };

    window.addEventListener("online", syncOfflineComplaints);

    return () => {
      window.removeEventListener("online", syncOfflineComplaints);
    };
  }, []);

  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    idNo: '',
    name: '',
    email: '',
    userType: '',
    description: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const complaintData = {
      idNo: inputs.idNo,
      name: inputs.name,
      email: inputs.email,
      userType: inputs.userType,
      description: inputs.description
    };

    if (!navigator.onLine) {
      const offlineComplaints = JSON.parse(localStorage.getItem("offlineComplaints")) || [];
      offlineComplaints.push(complaintData);
      localStorage.setItem("offlineComplaints", JSON.stringify(offlineComplaints));

      Swal.fire({
        icon: 'info',
        title: 'Offline Mode',
        text: 'Complaint saved locally and will be submitted once online.',
      });

      navigate('/complaintdetails');
      return;
    }

    // If online, submit to server
    try {
      await axios.post('http://localhost:8070/complaint', complaintData);

      Swal.fire({
        icon: 'success',
        title: 'Complaint Submitted',
        text: 'Your complaint has been successfully submitted!',
      }).then(() => {
        navigate('/complaintdetails');
      });
    } catch (err) {
      console.error('Error submitting:', err);
      setError('Failed to submit complaint. Please try again.');
    }
  };

  return (
    <div>
      <Nav/>
      <div className="had-sect">
        <div className="compadd-header">
          <h1 className="com-title">{t('Send us your Complaints')}</h1>
          <p className="com-subtitle">{t('Add your complaint here!')}</p>
        </div>   
      </div>
      <div className='add-bdy'>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div>
              <label>{t('Select language')}</label>
              <select onChange={(e) => i18n.changeLanguage(e.target.value)}>
                <option value="en">English</option>
                <option value="si">සිංහල</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t('ID')}</label>
              <input
                type="text"
                name="idNo"
                onChange={handleChange}
                value={inputs.idNo}
                required
              />
            </div>
            <div className="form-group">
              <label>{t('Name')}</label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={inputs.name}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>{t('Email')}</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={inputs.email}
                required
              />
            </div>

            <div className="form-group">
              <label>{t('User Type')}</label>
              <select
                name="userType"
                onChange={handleChange}
                value={inputs.userType}
                required
              >
                <option value="">{t('Select User Type')}</option>
                <option value="Student">{t('Student')}</option>
                <option value="Kitchen Staff">{t('Kitchen Staff')}</option>
                <option value="Cashier">{t('Cashier')}</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label>{t('Description')}</label>
              <textarea
                name="description"
                onChange={handleChange}
                value={inputs.description}
                required
              />
            </div>
          </div>

          <button type="submit" className='sub-btn'>{t('Submit')}</button>
        </form>
      </div>
    </div>
  );
}

export default ComplaintAdd;