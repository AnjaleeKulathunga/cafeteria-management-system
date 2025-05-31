import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../context/StoreContext';
import axios from "axios";
import { assets } from '../../assets/assets';
import html2pdf from 'html2pdf.js';
import Nav from "../Nav/Nav"

// Add a getStatusColor function
const getStatusColor = (status) => {
    switch(status) {
        case 'Completed': return '#28a745';
        case 'Processing': return '#ff9800';
        case 'Cancelled': return '#dc3545';
        default: return '#007bff'; // Pending
    }
};

const MyOrders = () => {
    
    const{url,token}= useContext(StoreContext);
    const [data,setData] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [refreshInterval, setRefreshInterval] = useState(null);

    const fetchOrders = async() => {
        try {
            const userId = localStorage.getItem("userId");
            if (!userId) {
                setErrorMessage("User ID not found. Please log in again.");
                return;
            }
            const response = await axios.post(url+"/order/userorders",{userId: userId},{headers:{Authorization:`Bearer ${token}`}});
            setData(response.data.data);
            console.log("Orders refreshed at:", new Date().toLocaleTimeString());
        } catch (error) {
            console.error("Error fetching orders:", error);
            setErrorMessage("Failed to fetch orders");
        }
    }

    const viewOrder = async(orderId) => {
        try {
            const response = await axios.get(`${url}/order/view/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            if(response.data.success) {
                try {
                    const infoResponse = await axios.get(`${url}/information/${orderId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    
                    setSelectedOrder({
                        ...response.data.data,
                        pickupTime: infoResponse.data.pickupTime || '',
                        pickupDate: infoResponse.data.pickupDate || ''
                    });
                } catch (infoError) {
                    console.warn("Could not fetch pickup information:", infoError);
                    setSelectedOrder(response.data.data);
                }
            }
        } catch (error) {
            console.error("Error viewing order:", error);
            alert("Error viewing order details: " + (error.response?.data?.message || error.message));
        }
    }

    const updateOrder = async(orderId, updateData) => {
        try {
            // Customer can only update specialInstructions, pickupTime, and pickupDate
            const orderUpdate = {
                // status: updateData.status, // Customers should not update status
                specialInstructions: updateData.specialInstructions
            };

            const response = await axios.put(`${url}/order/update/${orderId}`, orderUpdate, {headers:{Authorization:`Bearer ${token}`}});
            
            if(response.data.success) {
                if(updateData.pickupTime || updateData.pickupDate) {
                    try {
                        await axios.put(`${url}/information/${orderId}`, {
                            pickupTime: updateData.pickupTime,
                            pickupDate: updateData.pickupDate
                        }, {headers:{token}});
                    } catch (infoError) {
                        console.warn("Could not update pickup information:", infoError);
                    }
                }
                
                setSelectedOrder(null);
                setIsEditing(null);
                fetchOrders();
                alert("Order updated successfully");
            }
        } catch (error) {
            console.error("Error updating order:", error);
            alert("Error updating order");
        }
    }

    const deleteOrder = async(orderId) => {
        if(window.confirm("Are you sure you want to delete this order?")) {
            try {
                console.log("Token being used for delete:", token); // Added for debugging
                const response = await axios.delete(`${url}/order/delete/${orderId}`, {headers:{Authorization:`Bearer ${token}`}});
                if(response.data.success) {
                    fetchOrders();
                    alert("Order deleted successfully");
                }
            } catch (error) {
                console.error("Error deleting order:", error);
                alert("Error deleting order");
            }
        }
    }

    const downloadReceipt = () => {
        if (!selectedOrder) return;

        const receipt = document.createElement('div');
        
        const orderDate = selectedOrder.orderDate ? new Date(selectedOrder.orderDate).toLocaleString() : 'Not available';
        const pickupDate = selectedOrder.pickupDate ? new Date(selectedOrder.pickupDate).toLocaleDateString() : 'Not available';
        
        const firstName = selectedOrder.contact?.firstName || 'Customer';
        const lastName = selectedOrder.contact?.lastName || '';
        const email = selectedOrder.contact?.email || 'Not provided';
        const phone = selectedOrder.contact?.phone || 'Not provided';
        
        const itemsList = selectedOrder.items && selectedOrder.items.length > 0 
            ? selectedOrder.items.map(item => `
                <p>${item.name || 'Item'} x ${item.quantity || 0} - $${(item.price * item.quantity).toFixed(2)}</p>
            `).join('')
            : '<p>No items in order</p>';
        
        receipt.innerHTML = `
            <div style="padding: 20px; font-family: Arial, sans-serif;">
                <h2 style="text-align: center;">Order Receipt</h2>
                <hr style="margin: 20px 0;"/>
                <p><strong>Order ID:</strong> ${selectedOrder._id}</p>
                <p><strong>Date:</strong> ${orderDate}</p>
                <p><strong>Status:</strong> ${selectedOrder.status || 'Pending'}</p>
                <p><strong>Pickup Time:</strong> ${selectedOrder.pickupTime || 'Not specified'}</p>
                <p><strong>Pickup Date:</strong> ${pickupDate}</p>
                <p><strong>Customer:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <hr style="margin: 20px 0;"/>
                <h3>Order Items:</h3>
                ${itemsList}
                <hr style="margin: 20px 0;"/>
                <h3 style="text-align: right;">Total: $${(selectedOrder.amount || 0).toFixed(2)}</h3>
            </div>
        `;

        const opt = {
            margin: 1,
            filename: `order-receipt-${selectedOrder._id}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        try {
            html2pdf().set(opt).from(receipt).save();
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Failed to generate PDF. Please try again.");
        }
    }

    useEffect(()=>{
        if(token){
            fetchOrders();
            
            // Set up auto-refresh every 30 seconds to see status updates from admin
            const interval = setInterval(() => {
                fetchOrders();
            }, 30000); // 30 seconds
            
            setRefreshInterval(interval);
            
            // Clean up the interval on component unmount
            return () => {
                if (refreshInterval) {
                    clearInterval(refreshInterval);
                }
            };
        }
    },[token]);
    
    return (
        
        <div className='my-orders'>
            <Nav/>
            <h2>My Orders</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className='container'>
                {data.map((order,index)=>{
                    return(
                        <div key={index} className='my-orders-order'>
                            <img src={assets.parcel_icon} alt="" />
                            <p>{order.items.map((item,index)=>{
                                if(index===order.items.length-1){
                                    return item.name+"x"+item.quantity
                                }
                                else{
                                    return item.name+"x"+item.quantity+","
                                }
                            })}</p>
                            <p>${order.amount}.00</p>
                            <p>Items:{order.items.length}</p>
                            <p>
                                <span style={{ color: getStatusColor(order.status) }}>&#x25cf;</span>
                                <b style={{ color: getStatusColor(order.status) }}>{order.status}</b>
                            </p>
                            <div className="order-actions">
                                <button onClick={() => viewOrder(order._id)}>View</button>
                                {order.status !== 'Completed' && order.status !== 'Cancelled' && (
                                    <button onClick={() => {
                                        const orderDate = new Date(order.orderDate);
                                        setIsEditing({
                                            ...order,
                                            pickupTime: order.pickupTime || orderDate.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
                                            pickupDate: order.pickupDate || orderDate.toISOString().split('T')[0]
                                        });
                                    }}>Update</button>
                                )}
                                {order.status !== 'Completed' && (
                                    <button onClick={() => deleteOrder(order._id)}>Delete</button>
                                )}
                            </div>
                        </div>
                    )
                })}
                {data.length === 0 && (
                    <div className="no-orders-message">
                        <p>You don't have any orders yet.</p>
                        <a href="/menu" className="place-order-btn">Place Your First Order</a>
                    </div>
                )}
            </div>

            {/* View Order Modal */}
            {selectedOrder && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="close-btn" onClick={() => setSelectedOrder(null)}>×</button>
                        <h3>Order Details</h3>
                        <p><strong>Status:</strong> <span style={{ color: getStatusColor(selectedOrder.status) }}>{selectedOrder.status}</span></p>
                        <p><strong>Amount:</strong> ${selectedOrder.amount}</p>
                        {selectedOrder.pickupTime && (
                            <p><strong>Pickup Time:</strong> {selectedOrder.pickupTime}</p>
                        )}
                        {selectedOrder.pickupDate && (
                            <p><strong>Pickup Date:</strong> {new Date(selectedOrder.pickupDate).toLocaleDateString()}</p>
                        )}
                        <p><strong>Special Instructions:</strong> {selectedOrder.specialInstructions || 'None'}</p>
                        <p><strong>Contact Information:</strong></p>
                        <ul>
                            <li>Name: {selectedOrder.contact.firstName} {selectedOrder.contact.lastName}</li>
                            <li>Email: {selectedOrder.contact.email}</li>
                            <li>Phone: {selectedOrder.contact.phone}</li>
                            <li>Student ID: {selectedOrder.contact.studentId}</li>
                        </ul>
                        <p><strong>Order Items:</strong></p>
                        <ul className="items-list">
                            {selectedOrder.items.map((item, index) => (
                                <li key={index}>
                                    {item.name} x {item.quantity} - ${(item.price * item.quantity).toFixed(2)}
                                </li>
                            ))}
                        </ul>
                        <button className="download-btn" onClick={downloadReceipt}>
                            <span>Download Receipt</span>
                        </button>
                    </div>
                </div>
            )}

            {/* Edit Order Modal */}
            {isEditing && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="close-btn" onClick={() => setIsEditing(null)}>×</button>
                        <h3>Update Order</h3>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            const updateData = {
                                // status: formData.get('status'), // Status field removed from form
                                specialInstructions: formData.get('specialInstructions'),
                                pickupTime: formData.get('pickupTime'),
                                pickupDate: formData.get('pickupDate')
                            };
                            updateOrder(isEditing._id, updateData);
                        }} autoComplete="off">
                            {/* Status dropdown removed for customer view */}
                            {/* 
                            <div className="form-group">
                                <label>Status:</label>
                                <select 
                                    name="status" 
                                    defaultValue={isEditing.status}
                                    disabled={isEditing.status === 'Completed' || isEditing.status === 'Cancelled'}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>
                            */}
                            <div className="form-group" autoComplete="off">
                                <label>Special Instructions:</label>
                                <textarea 
                                    name="specialInstructions" 
                                    defaultValue={isEditing.specialInstructions}
                                />
                            </div>
                            <div className="time-date-fields">
                                <div className="form-group">
                                    <label>Pickup Time:</label>
                                    <input 
                                        type="time" 
                                        name="pickupTime"
                                        defaultValue={isEditing.pickupTime}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Pickup Date:</label>
                                    <input 
                                        type="date" 
                                        name="pickupDate"
                                        defaultValue={isEditing.pickupDate?.split('T')[0]}
                                        min={new Date().toISOString().split('T')[0]}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="modal-actions">
                                <button type="submit">Save Changes</button>
                                <button type="button" onClick={() => setIsEditing(null)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MyOrders