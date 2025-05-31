import React, { useState } from "react";
import Nav from "../Nav/Nav";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./addIngredReq.css";

function AddIngredReq() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    requestID: "",
    dateOfRequest: "",
    mealType: "",
    mealDate: "",
    ingredientName: "",
    quantityNeeded: "",
    unit: "",
    usageNote: "",
  });

  // Get today's date in YYYY-MM-DD format for min date validation
  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => history("/displayOne"));
  };

  const sendRequest = async () => {
    try {
      const response = await axios.post("http://localhost:8070/ingredient", {
        requestID: String(inputs.requestID),
        dateOfRequest: inputs.dateOfRequest,
        mealType: String(inputs.mealType),
        mealDate: inputs.mealDate,
        ingredientName: String(inputs.ingredientName),
        quantityNeeded: Number(inputs.quantityNeeded),
        unit: String(inputs.unit),
        usageNote: String(inputs.usageNote),
      });

      console.log("Response from backend:", response.data);
    } catch (error) {
      console.error(
        "Error sending request:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="add-ingredient-container">
      <Nav />
      <div className="add-ingredient-header">
        <h1>Add Ingredient Request</h1>
      </div>

      <form className="add-ingredient-form" onSubmit={handleSubmit} autoComplete="off">
        <div className="add-ingredient-form-group">
          <label>Request ID</label>
          <input
            className="add-ingredient-form-input"
            type="text"
            name="requestID"
            placeholder="REQ123"
            onChange={handleChange}
            value={inputs.requestID}
            required
          />
        </div>

        <div className="add-ingredient-form-group">
          <label>Date of Request</label>
          <input
            className="add-ingredient-form-input"
            type="date"
            name="dateOfRequest"
            min={today}
            onChange={handleChange}
            value={inputs.dateOfRequest}
            required
          />
        </div>

        <div className="add-ingredient-form-group">
          <label>Meal Type</label>
          <select
            className="add-ingredient-form-select"
            name="mealType"
            onChange={handleChange}
            value={inputs.mealType}
            required
          >
            <option value="" disabled>Select Type</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </select>
        </div>

        <div className="add-ingredient-form-group">
          <label>Meal Date</label>
          <input
            className="add-ingredient-form-input"
            type="date"
            name="mealDate"
            min={today}
            onChange={handleChange}
            value={inputs.mealDate}
            required
          />
        </div>

        <div className="add-ingredient-form-group">
          <label>Ingredient Name</label>
          <input
            className="add-ingredient-form-input"
            type="text"
            name="ingredientName"
            onChange={handleChange}
            value={inputs.ingredientName}
            required
          />
        </div>

        <div className="add-ingredient-form-group">
          <label>Quantity Needed</label>
          <input
            className="add-ingredient-form-input"
            type="number"
            name="quantityNeeded"
            onChange={handleChange}
            value={inputs.quantityNeeded}
            required
          />
        </div>

        <div className="add-ingredient-form-group">
          <label>Unit</label>
          <select
            className="add-ingredient-form-select"
            name="unit"
            onChange={handleChange}
            value={inputs.unit}
            required
          >
            <option value="" disabled>Select Unit</option>
            <option value="kg">kg</option>
            <option value="g">g</option>
            <option value="L">L</option>
            <option value="mL">mL</option>
            <option value="pieces">pieces</option>
            <option value="items">items</option>
          </select>
        </div>

        <div className="add-ingredient-form-group">
          <label>Usage Note</label>
          <textarea
            className="add-ingredient-form-textarea"
            name="usageNote"
            onChange={handleChange}
            value={inputs.usageNote}
          />
        </div>

        <button type="submit" className="add-ingredient-form-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddIngredReq;