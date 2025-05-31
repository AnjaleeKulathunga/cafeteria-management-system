import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from '../Nav/Nav'
import './AddInventory.css'

function AddInventory() {

    const history = useNavigate();
    const [inputs, setInputs] = useState({
        productID: "",
        productName: "",
        productType: "",
        cQuantity: "",
        productStatus: "",
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
        sendRequest().then(() => history ('/DisplayInventory'))
    };

    const sendRequest = async () => {
      try {
          const response = await axios.post("http://Localhost:8070/inventory", {
              productID: String(inputs.productID),
              productName: String(inputs.productName),
              productType: String(inputs.productType),
              cQuantity: Number(inputs.cQuantity),
              productStatus: String(inputs.productStatus),
          });
  
          console.log("Response from backend:", response.data); // Debugging
      } catch (error) {
          console.error("Error sending request:", error.response ? error.response.data : error.message);
      }
  };

  return (
    <div className='add-inventory-container'>
        <Nav />
        <div className="add-inventory-header">
            <h1>Add Products</h1>
        </div>
        <form className='add-inventory-form' onSubmit={handleSubmit} autoComplete="off">
            <div className='add-inventory-form-group'>
                <label>Product ID</label>
                <input 
                    className='add-inventory-form-input' 
                    type="text" 
                    name="productID" 
                    placeholder="PD123" 
                    onChange={handleChange} 
                    value={inputs.productID} 
                    required 
                />
            </div>
            
            <div className='add-inventory-form-group'>
                <label>Product Name</label>
                <input 
                    className='add-inventory-form-input' 
                    type="text" 
                    name="productName" 
                    onChange={handleChange} 
                    value={inputs.productName} 
                    required 
                />
            </div>
            
            <div className='add-inventory-form-group'>
                <label>Product Type</label>
                <input 
                    className='add-inventory-form-input' 
                    type="text" 
                    name="productType" 
                    onChange={handleChange} 
                    value={inputs.productType} 
                    required 
                />
            </div>
            
            <div className='add-inventory-form-group'>
                <label>Quantity</label>
                <input 
                    className='add-inventory-form-input' 
                    type="number" 
                    name="cQuantity" 
                    onChange={handleChange} 
                    value={inputs.cQuantity} 
                    required 
                />
            </div>
            
            <div className='add-inventory-form-group'>
                <label>Product Status</label>
                <select 
                    className='add-inventory-form-select' 
                    name="productStatus" 
                    onChange={handleChange} 
                    value={inputs.productStatus}
                    required
                >
                    <option value="" disabled>Select Status</option>
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                    <option value="Unusable">Unusable</option>
                </select>
            </div>
            
            <button type="submit" className='add-inventory-form-button'>Submit</button>
        </form>
    </div>
  )
}

export default AddInventory