import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./DisplayWaste.css";
import axios from "axios";

function DisplayWaste({ wasteList }) {
  const navigate = useNavigate();

  const deleteHandler = async (_id) => {
    if (window.confirm("Are you sure you want to delete this waste entry?")) {
      try {
        await axios.delete(`http://localhost:8070/waste/${_id}`);
        window.location.reload(); // Refresh to reflect updated list
      } catch (error) {
        console.error("Error deleting waste entry:", error.response?.data || error.message);
      }
    }
  };

  return (
    <div className="waste-table-container">
      <table className="waste-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Wastage ID</th>
            <th>Type</th>
            <th>Meal Name</th>
            <th>Meal Time</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Category</th>
            <th>Estimated Cost</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {wasteList.map((item) => (
            <tr key={item._id}>
              <td>{new Date(item.dateOfWastage).toLocaleDateString()}</td>
              <td>{item.lossID}</td>
              <td>{item.lossType}</td>
              <td>{item.mealName}</td>
              <td>{item.mealTime}</td>
              <td>{item.wQuantity}</td>
              <td>{item.unit}</td>
              <td>{item.category}</td>
              <td>{item.estimatedCost}</td>
              <td>{item.notes || "-"}</td>
              <td className="waste-row-actions">
                <Link to={`/displayWaste/${item._id}`} className="waste-update-btn">
                  Update
                </Link>
                <button className="waste-delete-btn" onClick={() => deleteHandler(item._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayWaste;