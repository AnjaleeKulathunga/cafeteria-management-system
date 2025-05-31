import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Nav from '../Nav/Nav';
import './updateWaste.css';

function UpdateWaste() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const res = await axios.get(`http://localhost:8070/waste/${id}`);
        setInputs(res.data.waste);
      } catch (error) {
        console.error("Error fetching waste entry data:", error);
      }
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    try {
      await axios.put(`http://localhost:8070/waste/${id}`, {
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
    } catch (error) {
      console.error("Error updating inventory:", error);
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
    sendRequest().then(() => history("/displayFirst"));
  };

  return (
    <div className="update-waste-container">
      <Nav />
      <div className="update-waste-content">
        <h1 className="update-waste-title">Update Wastage Entry</h1>

        <form className="update-waste-form" onSubmit={handleSubmit} autoComplete="off">
          <div className="update-waste-group">
            <label className="update-waste-label">Date of Wastage</label>
            <input 
              className="update-waste-input" 
              type="date" 
              name="dateOfWastage" 
              onChange={handleChange} 
              value={inputs.dateOfWastage || ''} 
              required
            />
          </div>

          <div className="update-waste-group">
            <label className="update-waste-label">Wastage ID</label>
            <input 
              className="update-waste-input" 
              type="text" 
              name="lossID" 
              placeholder="W123" 
              onChange={handleChange} 
              value={inputs.lossID || ''} 
              required
            />
          </div>

          <div className="update-waste-group">
            <label className="update-waste-label">Wastage Type</label>
            <select 
              className="update-waste-select" 
              name="lossType" 
              onChange={handleChange} 
              value={inputs.lossType || ''} 
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

          <div className="update-waste-group">
            <label className="update-waste-label">Meal Name</label>
            <input 
              className="update-waste-input" 
              type="text" 
              name="mealName" 
              onChange={handleChange} 
              value={inputs.mealName || ''} 
              required
            />
          </div>

          <div className="update-waste-group">
            <label className="update-waste-label">Meal Time</label>
            <select 
              className="update-waste-select" 
              name="mealTime" 
              onChange={handleChange} 
              value={inputs.mealTime || ''} 
              required
            >
              <option value="" disabled>Select Time</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="update-waste-group">
            <label className="update-waste-label">Quantity</label>
            <input
              className="update-waste-input"
              type="number"
              name="wQuantity"
              onChange={handleChange}
              value={inputs.wQuantity || ''}
              required
            />
          </div>

          <div className="update-waste-group">
            <label className="update-waste-label">Unit</label>
            <select
              className="update-waste-select"
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
              <option value="items">items</option>
              <option value="servings">servings</option>
              <option value="plates">plates</option>
            </select>
          </div>

          <div className="update-waste-group">
            <label className="update-waste-label">Category</label>
            <select
              className="update-waste-select"
              name="category"
              onChange={handleChange}
              value={inputs.category || ''}
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

          <div className="update-waste-group">
            <label className="update-waste-label">Estimated Cost</label>
            <input
              className="update-waste-input"
              type="number"
              name="estimatedCost"
              onChange={handleChange}
              value={inputs.estimatedCost || ''}
            />
          </div>

          <div className="update-waste-group">
            <label className="update-waste-label">Notes</label>
            <textarea
              className="update-waste-textarea"
              name="notes"
              onChange={handleChange}
              value={inputs.notes || ''}
            />
          </div>

          <button type="submit" className="update-waste-button">
            Update Wastage
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateWaste;