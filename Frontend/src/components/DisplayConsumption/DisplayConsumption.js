import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./displayConsumption.css";

function DisplayConsumption(props) {
  const {
    _id,
    consumptionID,
    dateOfConsumption,
    mealType,
    ingredientName,
    quantityUsed,
    unit,
    notes,
  } = props.consumption;

  const navigate = useNavigate();

  const deleteHandler = async () => {
    if (window.confirm("Are you sure you want to delete this consumption record?")) {
      try {
        await axios.delete(`http://localhost:8070/consumption/${_id}`);
        window.location.reload(); // Refresh to show updated list
      } catch (error) {
        console.error("Error deleting consumption record:", error.response?.data || error.message);
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      weekday: 'long'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <tr>
      <td>{consumptionID}</td>
      <td>{formatDate(dateOfConsumption)}</td>
      <td>{mealType}</td>
      <td>{ingredientName}</td>
      <td>{quantityUsed}</td>
      <td>{unit}</td>
      <td>{notes || "-"}</td>
      <td className="consumption-row-actions">
        <Link 
          to={`/displayConsumption/${_id}`} 
          className="consumption-update-btn"
          title="Update Record"
        >
          Update
        </Link>
        <button 
          className="consumption-delete-btn" 
          onClick={deleteHandler}
          title="Delete Record"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default DisplayConsumption;