import React, { useState } from "react";
import Nav2 from "../Nav2/Nav2";
import axios from "axios";
import "./AddDepartment.css";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";

function AddDepartment() {
  const [department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });
  // const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setDepartment((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    // setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(department);
    sendRequest().then(() => {
      setSuccessMessage("Department added successfully");
      setTimeout(() => {
        navigate("/admin-departments");
      }, 1000);
    });
  };

  const sendRequest = async () => {
    await axios
      .post("http://localhost:8070/Departments", {
        dep_name: String(department.dep_name),
        description: String(department.description),
      })
      .then((res) => res.data);
  };

  return (
    <div className="admin-container">
      <Nav2 />
      <div className="admin-main">
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        <form onSubmit={handleSubmit}>
          <h2>Add Department</h2>

          <div>
            <label htmlFor="dep_name">Department Name</label>
            <input
              type="text"
              name="dep_name"
              // value={department.dep_name}
              onChange={handleChange}
              placeholder="Enter Department Name"
              required
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              // value={department.description}
              onChange={handleChange}
              placeholder="Description"
            />
          </div>
          <button type="submit">Add Department</button>
        </form>
      </div>
    </div>
  );
}

export default AddDepartment;