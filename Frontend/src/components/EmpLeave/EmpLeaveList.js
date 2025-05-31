import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./EmpLeaveList.css";

function EmpLeaveList() {
  const { empid } = useParams();
  const navigate = useNavigate();
  const [leaves, setLeaves] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/leaves/emp/${empid}`);
        if (Array.isArray(response.data.leaves)) {
          setLeaves(response.data.leaves);
        } else {
          setLeaves([]);
          setMessage("No leave data found.");
        }
      } catch (err) {
        console.error(err);
        setMessage("Error fetching your leave requests.");
      }
    };

    fetchLeaves();
  }, [empid]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this leave?")) return;

    try {
      await axios.delete(`http://localhost:8070/leaves/delete/${id}`);
      setLeaves((prev) => prev.filter((leave) => leave._id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting leave.");
    }
  };

  const handleEdit = (leaveId) => {
    navigate(`/update-leave/${leaveId}`);
  };

  return (
    <div className="leave-history-container">
      <h2>Your Leave History</h2>
      {message && <p>{message}</p>}
      {leaves.length === 0 ? (
        <p>No leave records found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>From</th>
              <th>To</th>
              <th>Description</th>
              <th>Applied</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave, index) => (
              <tr key={index}>
                <td>{leave.leavetype}</td>
                <td>{new Date(leave.leavefrom).toLocaleDateString()}</td>
                <td>{new Date(leave.leaveto).toLocaleDateString()}</td>
                <td>{leave.leavedescription}</td>
                <td>{new Date(leave.applieddate).toLocaleDateString()}</td>
                <td>{leave.status}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(leave._id)}>
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(leave._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EmpLeaveList;