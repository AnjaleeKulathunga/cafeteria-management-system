import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PlaceOrde() {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    studentId: "",
    phone: "",
    email: "",
    specialInstruction: "",
    pickupTime: "",
    pickupDate: "",
    address: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const createOrderItems = () => {
    return food_list.reduce((items, item) => {
      if (cartItems[item._id] > 0) {
        items.push({ ...item, quantity: cartItems[item._id] });
      }
      return items;
    }, []);
  };

  const submitInformation = async () => {
    const informationData = {
      firstname: data.firstName,
      lastname: data.lastName,
      email: data.email,
      phone: data.phone,
      studentid: data.studentId,
      specialInstructions: data.specialInstruction,
      pickupTime: data.pickupTime,
      pickupDate: data.pickupDate,
      address: data.address
    };

    await axios.post(`${url}/information/create`, informationData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  };

  const placeOrder = async (event, redirectToPayment = true) => {
    event.preventDefault();

    const orderItems = createOrderItems();
    const userId = localStorage.getItem('userId');

    const orderData = {
      userId,
      contact: {
        firstName: data.firstName,
        lastName: data.lastName,
        studentId: data.studentId,
        phone: data.phone,
        email: data.email
      },
      specialInstructions: data.specialInstruction,
      items: orderItems,
      amount: getTotalCartAmount(),
    };

    try {
      await submitInformation();

      const response = await axios.post(`${url}/order/place`, orderData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        if (redirectToPayment) {
          window.location.replace(response.data.session_url);
        } else {
          navigate('/myorders');
        }
      } else {
        alert("Error placing order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order");
    }
  };

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token, getTotalCartAmount]);

  return (
    <div className="po-container">
      <div className="po-header">
        <h1>Place Your Order</h1>
      </div>
      <form onSubmit={(e) => placeOrder(e, true)} className='po-form' autoComplete="off">
        <div className="po-form-left">
          <h2 className="po-form-title">Order Information</h2>
          <div className="po-input-group">
            <input 
              className="po-input"
              required 
              name='firstName' 
              onChange={onChangeHandler} 
              value={data.firstName} 
              type="text" 
              placeholder='First name' 
            />
            <input 
              className="po-input"
              required 
              name='lastName' 
              onChange={onChangeHandler} 
              value={data.lastName} 
              type="text" 
              placeholder='Last name' 
            />
          </div>
          <div className="po-input-group">
            <input 
              className="po-input"
              required 
              name='studentId' 
              onChange={onChangeHandler} 
              value={data.studentId} 
              type="text" 
              placeholder='Student Id' 
            />
            <input 
              className="po-input"
              required 
              name='phone' 
              onChange={onChangeHandler} 
              value={data.phone} 
              type="text" 
              placeholder='Phone' 
            />
          </div>
          <input 
            className="po-input"
            required 
            name='email' 
            onChange={onChangeHandler} 
            value={data.email} 
            type="email" 
            placeholder='Email address' 
          />
          <div className="po-input-group">
            <input 
              className="po-input"
              required 
              name='pickupTime' 
              onChange={onChangeHandler} 
              value={data.pickupTime} 
              type="time" 
              placeholder='Pickup Time' 
            />
            <input 
              className="po-input"
              required 
              name='pickupDate' 
              onChange={onChangeHandler} 
              value={data.pickupDate} 
              type="date" 
              placeholder='Pickup Date' 
            />
          </div>
          <input 
            className="po-input"
            required 
            name='address' 
            onChange={onChangeHandler} 
            value={data.address} 
            type="text" 
            placeholder='Delivery Address' 
          />
          <input 
            className="po-input"
            required 
            name='specialInstruction' 
            onChange={onChangeHandler} 
            value={data.specialInstruction} 
            type="text" 
            placeholder='Special Instructions (optional)' 
          />
        </div>

        <div className="po-form-right">
          <div className="po-cart-total">
            <h2>Order Summary</h2>
            <div>
              <div className="po-cart-details">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <div className="po-cart-details">
                <p>Delivery Fee</p>
                <p>$0</p>
              </div>
              <hr />
              <div className="po-cart-details">
                <b className="po-cart-total-amount">Total Amount</b>
                <b className="po-cart-total-amount">${getTotalCartAmount()}</b>
              </div>
            </div>
            <button type='submit' className="po-button po-button-primary">
              Proceed to Payment
            </button>
            <button 
              type='button' 
              className="po-button po-button-secondary"
              onClick={(e) => placeOrder(e, false)}
            >
              Place Order (Pay Later)
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PlaceOrde;
