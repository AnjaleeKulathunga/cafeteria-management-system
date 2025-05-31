import React, { useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import axios from "axios";
import DisplayIngredReq from "./DisplayIngredReq";
import { Link } from "react-router-dom";
import "./displayIngredReq.css";

const URL = "http://localhost:8070/ingredient";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function Ingredient() {
  const [ingredient, setIngredient] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => setIngredient(data.ingredient || []));
  }, []);

  const sendWhatsAppMessage = () => {
    const message = encodeURIComponent(
      "Ingredient request report has been downloaded successfully."
    );
    const phoneNumber = "94711119658";
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  const handleDownloadCSVReport = () => {
    if (!ingredient || ingredient.length === 0) {
      alert("No ingredient requests available to generate the report.");
      return;
    }
    // ... CSV code unchanged
  };

  return (
    <div className="ingredient-request-container">
      <Nav />
      <div className="ingredient-request-content">
        <h1 className="ingredient-request-title">Requesting Ingredients</h1>

        <div className="ingredient-request-add-btn">
          <Link to="/addIngredient" className="ingredient-request-update-btn">
            Add Request
          </Link>
        </div>

        <table className="ingredient-request-table">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Date of Request</th>
              <th>Meal Type</th>
              <th>Meal Date</th>
              <th>Ingredient Name</th>
              <th>Quantity Needed</th>
              <th>Unit</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ingredient.map((item, i) => (
              <DisplayIngredReq key={item._id || i} ingredient={item} />
            ))}
          </tbody>
        </table>

        <button
          className="ingredient-request-download-btn"
          onClick={handleDownloadCSVReport}
          disabled={ingredient.length === 0}
        >
          Download Request Report
        </button>
      </div>
    </div>
  );
}

export default Ingredient;