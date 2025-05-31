import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./displayIngredReq.css";

function DisplayIngredReq(props) {
  const {
    _id,
    requestID,
    dateOfRequest,
    mealType,
    mealDate,
    ingredientName,
    quantityNeeded,
    unit,
    usageNote,
  } = props.ingredient;

  const navigate = useNavigate();

  const deleteHandler = async () => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      try {
        await axios.delete(`http://localhost:8070/ingredient/${_id}`);
        navigate("/displayOne");
      } catch (error) {
        console.error(
          "Error deleting request",
          error.response?.data || error.message
        );
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <tr>
      <td>{requestID}</td>
      <td>{formatDate(dateOfRequest)}</td>
      <td>{mealType}</td>
      <td>{formatDate(mealDate)}</td>
      <td>{ingredientName}</td>
      <td>{quantityNeeded}</td>
      <td>{unit}</td>
      <td>{usageNote || "-"}</td>
      <td className="ingredient-request-actions">
        <Link to={`/displayIngredient/${_id}`} className="ingredient-request-update-btn">
          Update
        </Link>
        <button 
          className="ingredient-request-delete-btn" 
          onClick={deleteHandler}
          title="Delete Request"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default DisplayIngredReq;