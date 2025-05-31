import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Nav from '../Nav/Nav';
import './updateConsumption.css';

function UpdateConsumption() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const { id } = useParams();

  // Today's date in YYYY-MM-DD format for max validation
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const res = await axios.get(`http://localhost:8070/consumption/${id}`);
        setInputs(res.data.consumption);
      } catch (error) {
        console.error("Error fetching consumption entry data:", error);
      }
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    try {
      await axios.put(`http://localhost:8070/consumption/${id}`, {
        consumptionID: String(inputs.consumptionID),
        dateOfConsumption: inputs.dateOfConsumption,
        mealType: String(inputs.mealType),
        ingredientName: String(inputs.ingredientName),
        quantityUsed: Number(inputs.quantityUsed),
        unit: String(inputs.unit),
        notes: String(inputs.notes)
      });
    } catch (error) {
      console.error("Error updating request:", error);
    }
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => history("/displayBegin"));
  };

  return (
    <div className="update-consumption-container">
      <Nav />
      <div className="update-consumption-content">
        <h1 className="update-consumption-title">Update Consumption Entry</h1>

        <form className="update-consumption-form" onSubmit={handleSubmit} autoComplete="off">
          <div className="update-consumption-group">
            <label className="update-consumption-label">Consumption ID</label>
            <input
              className="update-consumption-input"
              type="text"
              name="consumptionID"
              placeholder="DC123"
              onChange={handleChange}
              value={inputs.consumptionID || ''}
              required
            />
          </div>

          <div className="update-consumption-group">
            <label className="update-consumption-label">Date of Consumption</label>
            <input
              className="update-consumption-input"
              type="date"
              name="dateOfConsumption"
              max={today}
              onChange={handleChange}
              value={inputs.dateOfConsumption || ''}
              required
            />
          </div>

          <div className="update-consumption-group">
            <label className="update-consumption-label">Meal Type</label>
            <select
              className="update-consumption-select"
              name="mealType"
              onChange={handleChange}
              value={inputs.mealType || ''}
              required
            >
              <option value="" disabled>Select Meal Type</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>
          </div>

          <div className="update-consumption-group">
            <label className="update-consumption-label">Ingredient Name</label>
            <input
              className="update-consumption-input"
              type="text"
              name="ingredientName"
              onChange={handleChange}
              value={inputs.ingredientName || ''}
              required
            />
          </div>

          <div className="update-consumption-group">
            <label className="update-consumption-label">Quantity Used</label>
            <input
              className="update-consumption-input"
              type="number"
              name="quantityUsed"
              min="0"
              step="0.01"
              onChange={handleChange}
              value={inputs.quantityUsed || ''}
              required
            />
          </div>

          <div className="update-consumption-group">
            <label className="update-consumption-label">Unit</label>
            <select
              className="update-consumption-select"
              name="unit"
              onChange={handleChange}
              value={inputs.unit || ''}
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

          <div className="update-consumption-group">
            <label className="update-consumption-label">Notes</label>
            <textarea
              className="update-consumption-textarea"
              name="notes"
              placeholder="Add any additional notes here..."
              onChange={handleChange}
              value={inputs.notes || ''}
            />
          </div>

          <button type="submit" className="update-consumption-button">
            Update Consumption
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateConsumption;