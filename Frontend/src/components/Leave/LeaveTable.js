import React, { useState, useEffect } from "react";
import Nav2 from "../Nav2/Nav2";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./LeaveTable.css";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#b450fa",
  "#fa506d",
];

function LeaveTable() {
  const [leaves, setLeaves] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [leaveTypeCounts, setLeaveTypeCounts] = useState([]);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const res = await axios.get("http://localhost:8070/leaves");
      if (res.data.leaves) {
        setLeaves(res.data.leaves);
        countLeaveTypes(res.data.leaves);
      }
    } catch (err) {
      console.error("Failed to fetch leaves", err);
    }
  };

  const countLeaveTypes = (leaves) => {
    const counts = {};
    leaves.forEach((leave) => {
      counts[leave.leavetype] = (counts[leave.leavetype] || 0) + 1;
    });

    const formattedCounts = Object.entries(counts).map(([type, count]) => ({
      name: type,
      value: count,
    }));
    setLeaveTypeCounts(formattedCounts);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:8070/leaves/${id}/status`, {
        status: newStatus,
      });
      fetchLeaves(); // Refresh chart + table
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  const filteredLeaves = leaves.filter((leave) =>
    leave.empid.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="leave-container">
      <Nav2 />
      <div className="leave-header">
        <h3>Manage Leaves</h3>
      </div>

      <div className="search-add-row">
        <input
          type="text"
          placeholder="Search by Employee ID"
          className="depsearchleave"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Flex container for chart and table */}
      <div className="content-wrapper">
        {/* Left Side: Chart */}
        <div className="chart-section">
          <h4>Leave Type Distribution</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={leaveTypeCounts}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {leaveTypeCounts.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Right Side: Table */}
        <div className="table-wrapper">
          <table className="leave-table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Leave Type</th>
                <th>From</th>
                <th>To</th>
                <th>Description</th>
                <th>Applied Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeaves.map((leave, index) => (
                <tr key={index}>
                  <td>{leave.empid}</td>
                  <td>{leave.leavetype}</td>
                  <td>{new Date(leave.leavefrom).toLocaleDateString()}</td>
                  <td>{new Date(leave.leaveto).toLocaleDateString()}</td>
                  <td>{leave.leavedescription}</td>
                  <td>{new Date(leave.applieddate).toLocaleDateString()}</td>
                  <td
                    className={
                      leave.status === "Approved"
                        ? "status-approved"
                        : leave.status === "Rejected"
                        ? "status-rejected"
                        : ""
                    }
                  >
                    {leave.status}
                  </td>
                  <td>
                    <button
                      onClick={() => handleStatusChange(leave._id, "Approved")}
                      className="approvebtn"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusChange(leave._id, "Rejected")}
                      className="rejectbtn"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LeaveTable;