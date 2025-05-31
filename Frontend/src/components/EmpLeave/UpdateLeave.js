import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Nav2 from "../Nav2/Nav2";
import "./UpdateLeave.css";

function UpdateLeave() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [leave, setLeave] = useState({
    empid: "",
    leavetype: "",
    leavefrom: "",
    leaveto: "",
    leavedescription: "",
    applieddate: "",
    status: "Pending"
  });

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const res = await axios.get(`http://localhost:8070/leaves/${id}`);
        const data = res.data.leave;

        setLeave({
          empid: data.empid || "",
          leavetype: data.leavetype || "",
          leavefrom: data.leavefrom ? data.leavefrom.slice(0, 10) : "",
          leaveto: data.leaveto ? data.leaveto.slice(0, 10) : "",
          leavedescription: data.leavedescription || "",
          applieddate: data.applieddate ? data.applieddate.slice(0, 10) : "",
          status: data.status || "Pending"
        });
      } catch (err) {
        console.error("Error fetching leave:", err);
        alert("Could not load leave details.");
      }
    };

    fetchLeave();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8070/leaves/update/${id}`,
        leave
      );
      alert("Leave updated successfully.");
      navigate(`/emp/${leave.empid}/emp-leave`);
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
      alert("Error updating leave.");
    }
  };

  return (
    <div className="admin-empcontainer">
      <Nav2 />
      <div className="admin-empmain">
        <form onSubmit={handleSubmit}>
          <h2>Update Leave</h2>
          <div className="form-grid">
            <div>
              <label>Employee ID</label>
              <input type="text" name="empid" value={leave.empid} readOnly />
            </div>
            <div>
              <label>Leave Type</label>
              <input
                type="text"
                name="leavetype"
                value={leave.leavetype}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>From Date</label>
              <input
                type="date"
                name="leavefrom"
                value={leave.leavefrom}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>To Date</label>
              <input
                type="date"
                name="leaveto"
                value={leave.leaveto}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Description</label>
              <textarea
                name="leavedescription"
                value={leave.leavedescription}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Applied Date</label>
              <input type="date" name="applieddate" value={leave.applieddate} readOnly />
            </div>
            {/* <div>
              <label>Status</label>
              <select name="status" value={leave.status} onChange={handleChange} readOnly>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div> */}
            <button type="submit">Update Leave</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateLeave;