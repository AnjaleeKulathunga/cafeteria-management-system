import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./DisplayInventory.css";

function DisplayInventory() {
  const [inventoryList, setInventoryList] = useState([]);
  const navigate = useNavigate();

  // Fetch inventory data
  const fetchInventory = async () => {
    try {
      const res = await axios.get("http://localhost:8070/inventory");

      // Normalize the data format
      const data = Array.isArray(res.data) ? res.data : res.data.inventory;
      setInventoryList(data || []);
    } catch (err) {
      console.error("Error fetching inventory:", err);
      setInventoryList([]);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this inventory item?")) {
      try {
        await axios.delete(`http://localhost:8070/inventory/${id}`);
        fetchInventory(); // Refresh list after deletion
      } catch (error) {
        console.error("Error deleting inventory item:", error.response?.data || error.message);
      }
    }
  };

  return (
    <div className="display-inventory-container">
      <div className="display-inventory-header">
        <h2>Inventory Details</h2>
      </div>
      <table className="display-inventory-table">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Product Type</th>
            <th>Quantity</th>
            <th>Product Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(inventoryList) && inventoryList.length > 0 ? (
            inventoryList.map((item) => (
              <tr key={item._id}>
                <td>{item.productID}</td>
                <td>{item.productName}</td>
                <td>{item.productType}</td>
                <td>{item.cQuantity}</td>
                <td>{item.productStatus}</td>
                <td className="display-inventory-actions">
                  <Link to={`/inven/${item._id}`} className="display-inventory-btn display-inventory-update-btn">Update</Link>
                  <button onClick={() => deleteHandler(item._id)} className="display-inventory-btn display-inventory-delete-btn">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", color: "rgba(255, 255, 255, 0.7)" }}>
                No inventory data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayInventory;