import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddLeave.css";

function AddLeaveForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    empid: "",
    leavetype: "",
    leavefrom: "",
    leaveto: "",
    leavedescription: "",
    applieddate: new Date().toISOString().split("T")[0],
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedEmpId = localStorage.getItem("empid");
    if (storedEmpId) {
      setFormData((prev) => ({ ...prev, empid: storedEmpId }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8070/leaves", formData);
      setMessage("Leave request submitted successfully!");

      const empid = res.data.leaves.empid;

      // Navigate to employee leave history
      navigate(`/emp/${empid}/emp-leave`);
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong while submitting.");
    }
  };

  return (
    <div className="add-leave-form-container">
      <h2>Apply for Leave</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} className="add-leave-form">
        {!formData.empid && (
          <label>
            Employee ID:
            <input
              type="text"
              name="empid"
              value={formData.empid}
              onChange={handleChange}
              required
            />
          </label>
        )}

        <label>
          Leave Type:
          <select
            name="leavetype"
            value={formData.leavetype}
            onChange={handleChange}
            required
          >
            <option value="">Select Leave Type</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Maternity Leave">Maternity Leave</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label>
          From:
          <input
            type="date"
            name="leavefrom"
            value={formData.leavefrom}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          To:
          <input
            type="date"
            name="leaveto"
            value={formData.leaveto}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Description:
          <textarea
            name="leavedescription"
            value={formData.leavedescription}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="submit-leave-btn">
          Submit Leave
        </button>
      </form>
    </div>
  );
}

export default AddLeaveForm;