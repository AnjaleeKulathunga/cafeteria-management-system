import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Nav from '../Nav/Nav';
import './updateIngredReq.css';

function UpdateIngredReq() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const { id } = useParams();

  // Today's date in YYYY-MM-DD format for min validation
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const res = await axios.get(`http://localhost:8070/ingredient/${id}`);
        setInputs(res.data.ingredient);
      } catch (error) {
        console.error("Error fetching ingredient entry data:", error);
      }
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    try {
      await axios.put(`http://localhost:8070/ingredient/${id}`, {
        requestID: String(inputs.requestID),
        dateOfRequest: inputs.dateOfRequest,
        mealType: String(inputs.mealType),
        mealDate: inputs.mealDate,
        ingredientName: String(inputs.ingredientName),
        quantityNeeded: Number(inputs.quantityNeeded),
        unit: String(inputs.unit),
        usageNote: String(inputs.usageNote),
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
    sendRequest().then(() => history("/displayOne"));
  };

  return (
    <div className="update-ingredient-container">
      <Nav />
      <div className="update-ingredient-content">
        <h1 className="update-ingredient-title">Update Ingredient Request</h1>

        <form className="update-ingredient-form" onSubmit={handleSubmit} autoComplete="off">
          <div className="update-ingredient-group">
            <label className="update-ingredient-label">Request ID</label>
            <input
              className="update-ingredient-input"
              type="text"
              name="requestID"
              placeholder="REQ123"
              onChange={handleChange}
              value={inputs.requestID || ''}
              required
            />
          </div>

          <div className="update-ingredient-group">
            <label className="update-ingredient-label">Date of Request</label>
            <input
              className="update-ingredient-input"
              type="date"
              name="dateOfRequest"
              min={today}
              onChange={handleChange}
              value={inputs.dateOfRequest || ''}
              required
            />
          </div>

          <div className="update-ingredient-group">
            <label className="update-ingredient-label">Meal Type</label>
            <select
              className="update-ingredient-select"
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

          <div className="update-ingredient-group">
            <label className="update-ingredient-label">Meal Date</label>
            <input
              className="update-ingredient-input"
              type="date"
              name="mealDate"
              min={today}
              onChange={handleChange}
              value={inputs.mealDate || ''}
              required
            />
          </div>

          <div className="update-ingredient-group">
            <label className="update-ingredient-label">Ingredient Name</label>
            <input
              className="update-ingredient-input"
              type="text"
              name="ingredientName"
              onChange={handleChange}
              value={inputs.ingredientName || ''}
              required
            />
          </div>

          <div className="update-ingredient-group">
            <label className="update-ingredient-label">Quantity Needed</label>
            <input
              className="update-ingredient-input"
              type="number"
              name="quantityNeeded"
              onChange={handleChange}
              value={inputs.quantityNeeded || ''}
              required
            />
          </div>

          <div className="update-ingredient-group">
            <label className="update-ingredient-label">Unit</label>
            <select
              className="update-ingredient-select"
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

          <div className="update-ingredient-group">
            <label className="update-ingredient-label">Usage Note</label>
            <textarea
              className="update-ingredient-textarea"
              name="usageNote"
              onChange={handleChange}
              value={inputs.usageNote || ''}
            />
          </div>

          <button type="submit" className="update-ingredient-button">
            Update Request
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateIngredReq;