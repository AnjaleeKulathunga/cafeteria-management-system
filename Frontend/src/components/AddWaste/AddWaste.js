import React, { useState } from "react";
import Nav from "../Nav/Nav";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./addWaste.css";

function AddWaste() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    dateOfWastage: "",
    lossID: "",
    lossType: "",
    mealName: "",
    mealTime: "",
    wQuantity: "",
    unit: "",
    category: "",
    estimatedCost: "",
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
    sendRequest().then(() => history("/displayFirst"));
  };

  const sendRequest = async () => {
    try {
      const response = await axios.post("http://Localhost:8070/waste", {
        dateOfWastage: (inputs.dateOfWastage),
        lossID: String(inputs.lossID),
        lossType: String(inputs.lossType),
        mealName: String(inputs.mealName),
        mealTime: String(inputs.mealTime),
        wQuantity: Number(inputs.wQuantity),
        unit: String(inputs.unit),
        category: String(inputs.category),
        estimatedCost: Number(inputs.estimatedCost),
        notes: String(inputs.notes),
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
    <div className="add-waste-container">
      <Nav />
      <div className="add-waste-header">
        <h1>Add Wastage Entry</h1>
      </div>

      <form className="add-waste-form" onSubmit={handleSubmit} autoComplete="off">
        <div className="add-waste-form-group">
          <label>Date of Wastage</label>
          <input
            className="add-waste-form-input"
            type="date"
            name="dateOfWastage"
            onChange={handleChange}
            value={inputs.dateOfWastage}
            required
          />
        </div>

        <div className="add-waste-form-group">
          <label>Wastage ID</label>
          <input
            className="add-waste-form-input"
            type="text"
            name="lossID"
            placeholder="W123"
            onChange={handleChange}
            value={inputs.lossID}
            required
          />
        </div>

        <div className="add-waste-form-group">
          <label>Wastage Type</label>
          <select
            className="add-waste-form-select"
            name="lossType"
            onChange={handleChange}
            value={inputs.lossType}
            required
          >
            <option value="" disabled>Select Type</option>
            <option value="Spoiled">Spoiled</option>
            <option value="Expired">Expired</option>
            <option value="Leftovers">Leftovers</option>
            <option value="Overcooked">Overcooked</option>
            <option value="Preparation Error">Preparation Error</option>
            <option value="Plate Waste">Plate Waste</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="add-waste-form-group">
          <label>Meal Name</label>
          <input
            className="add-waste-form-input"
            type="text"
            name="mealName"
            onChange={handleChange}
            value={inputs.mealName}
            required
          />
        </div>

        <div className="add-waste-form-group">
          <label>Meal Time</label>
          <select
            className="add-waste-form-select"
            name="mealTime"
            onChange={handleChange}
            value={inputs.mealTime}
            required
          >
            <option value="" disabled>Select Time</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="add-waste-form-group">
          <label>Quantity</label>
          <input
            className="add-waste-form-input"
            type="number"
            name="wQuantity"
            onChange={handleChange}
            value={inputs.wQuantity}
            required
          />
        </div>

        <div className="add-waste-form-group">
          <label>Unit</label>
          <select
            className="add-waste-form-select"
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
            <option value="items">items</option>
            <option value="servings">servings</option>
            <option value="plates">plates</option>
          </select>
        </div>

        <div className="add-waste-form-group">
          <label>Category</label>
          <select
            className="add-waste-form-select"
            name="category"
            onChange={handleChange}
            value={inputs.category}
            required
          >
            <option value="" disabled>Select Category</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Fruits">Fruits</option>
            <option value="Meat">Meat</option>
            <option value="Dairy">Dairy</option>
            <option value="Grains">Grains</option>
            <option value="Cooked Food">Cooked Food</option>
            <option value="Bakery">Bakery</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="add-waste-form-group">
          <label>Estimated Cost</label>
          <input
            className="add-waste-form-input"
            type="number"
            name="estimatedCost"
            onChange={handleChange}
            value={inputs.estimatedCost}
          />
        </div>

        <div className="add-waste-form-group">
          <label>Notes</label>
          <textarea
            className="add-waste-form-textarea"
            name="notes"
            onChange={handleChange}
            value={inputs.notes}
          />
        </div>

        <button type="submit" className="add-waste-form-button">Submit</button>
      </form>
    </div>
  );
}

export default AddWaste;