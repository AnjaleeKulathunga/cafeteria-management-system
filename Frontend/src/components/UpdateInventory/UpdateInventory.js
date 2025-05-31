import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Nav from '../Nav/Nav';
import './UpdateInventory.css';

function UpdateInventory() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const res = await axios.get(`http://localhost:8070/inventory/${id}`);
        setInputs(res.data.inventory);
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      }
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    try {
      await axios.put(`http://localhost:8070/inventory/${id}`, {
        productID: String(inputs.productID),
        productName: String(inputs.productName),
        productType: String(inputs.productType),
        cQuantity: Number(inputs.cQuantity),
        productStatus: String(inputs.productStatus),
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
    sendRequest().then(() => history('/DisplayInventory'));
  };

  return (
    <div className="update-inventory-container">
      <Nav />
      <div className="update-inventory-content">
        <h1 className="update-inventory-title">Update Inventory</h1>
        <form onSubmit={handleSubmit} className="update-inventory-form" autoComplete="off">
          <div className="update-inventory-group">
            <label className="update-inventory-label">Product ID</label>
            <input
              type="text"
              name="productID"
              placeholder="PD123"
              onChange={handleChange}
              value={inputs.productID || ''}
              className="update-inventory-input"
              required
            />
          </div>

          <div className="update-inventory-group">
            <label className="update-inventory-label">Product Name</label>
            <input
              type="text"
              name="productName"
              onChange={handleChange}
              value={inputs.productName || ''}
              className="update-inventory-input"
              required
            />
          </div>

          <div className="update-inventory-group">
            <label className="update-inventory-label">Product Type</label>
            <input
              type="text"
              name="productType"
              onChange={handleChange}
              value={inputs.productType || ''}
              className="update-inventory-input"
              required
            />
          </div>

          <div className="update-inventory-group">
            <label className="update-inventory-label">Quantity</label>
            <input
              type="number"
              name="cQuantity"
              onChange={handleChange}
              value={inputs.cQuantity || ''}
              className="update-inventory-input"
              required
            />
          </div>

          <div className="update-inventory-group">
            <label className="update-inventory-label">Product Status</label>
            <select
              id="status"
              name="productStatus"
              onChange={handleChange}
              value={inputs.productStatus || ''}
              className="update-inventory-select"
            >
              <option value="" disabled>Select Status</option>
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
              <option value="Unusable">Unusable</option>
            </select>
          </div>

          <button type="submit" className="update-inventory-button">Update Inventory</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateInventory;