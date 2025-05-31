import React, { useState } from "react";
import Nav from "../Nav/Nav";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./addConsumption.css";

function AddConsumption() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    consumptionID: "",
    dateOfConsumption: "",
    mealType: "",
    ingredientName: "",
    quantityUsed: "",
    unit: "",
    notes: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => history("/displayBegin"));
  };

  const sendRequest = async () => {
    try {
      const response = await axios.post("http://Localhost:8070/consumption", {
            consumptionID: String(inputs.consumptionID),
            dateOfConsumption: inputs.dateOfConsumption,
            mealType: String(inputs.mealType),
            ingredientName: String(inputs.ingredientName),
            quantityUsed: Number(inputs.quantityUsed),
            unit: String(inputs.unit),
            notes: String(inputs.notes)
          
      });

      console.log("Response from backend:", response.data); // Debugging
    } catch (error) {
      console.error(
        "Error sending request:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="add-consumption-container">
      <Nav />
      <div className="add-consumption-header">
        <h1>Add Consumption Details</h1>
      </div>

      <form className="add-consumption-form" onSubmit={handleSubmit} autoComplete="off">
        <div className="add-consumption-form-group">
          <label>Consumption ID</label>
          <input
            className="add-consumption-form-input"
            type="text"
            name="consumptionID"
            placeholder="DC123"
            onChange={handleChange}
            value={inputs.consumptionID}
            required
          />
        </div>

        <div className="add-consumption-form-group">
          <label>Date of Consumption</label>
          <input
            className="add-consumption-form-input"
            type="date"
            name="dateOfConsumption"
            onChange={handleChange}
            value={inputs.dateOfConsumption}
            required
          />
        </div>

        <div className="add-consumption-form-group">
          <label>Meal Type</label>
          <select
            className="add-consumption-form-select"
            name="mealType"
            onChange={handleChange}
            value={inputs.mealType}
            required
          >
            <option value="" disabled>Select Meal Type</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </select>
        </div>

        <div className="add-consumption-form-group">
          <label>Ingredient Name</label>
          <input
            className="add-consumption-form-input"
            type="text"
            name="ingredientName"
            onChange={handleChange}
            value={inputs.ingredientName}
            required
          />
        </div>

        <div className="add-consumption-form-group">
          <label>Quantity Used</label>
          <input
            className="add-consumption-form-input"
            type="number"
            name="quantityUsed"
            onChange={handleChange}
            value={inputs.quantityUsed}
            required
          />
        </div>

        <div className="add-consumption-form-group">
          <label>Unit</label>
          <select
            className="add-consumption-form-select"
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

        <div className="add-consumption-form-group">
          <label>Notes</label>
          <textarea
            className="add-consumption-form-textarea"
            name="notes"
            onChange={handleChange}
            value={inputs.notes}
          />
        </div>

        <button type="submit" className="add-consumption-form-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddConsumption;