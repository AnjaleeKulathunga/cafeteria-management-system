import React, { useEffect, useState } from 'react'
import './Orders.css'
import {toast} from "react-toastify"
import axios from "axios"
import {assets} from "../../assets/assets"
import html2pdf from 'html2pdf.js'

const Orders = ({url}) => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');
  

  const fetchAllOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url+"/order/list");
      if(response.data.success){
        setOrders(response.data.data);
      } else {
        toast.error("Failed to fetch orders")
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Error fetching orders");
    } finally {
      setLoading(false);
    }
  }

  const viewOrderDetails = async (orderId) => {
    try {
      const response = await axios.get(`${url}/order/view/${orderId}`);
      if (response.data.success) {
        const orderData = response.data.data;
        // Fetch additional information if available
        try {
          const infoResponse = await axios.get(`${url}/information/${orderId}`);
          if (infoResponse.data.success) {
            setSelectedOrder({
              ...orderData,
              pickupTime: infoResponse.data.data.pickupTime,
              pickupDate: infoResponse.data.data.pickupDate
            });
          } else {
            setSelectedOrder(orderData);
          }
        } catch (error) {
          setSelectedOrder(orderData);
        }
      }
    } catch (error) {
      console.error("Error viewing order:", error);
      toast.error("Error viewing order details");
    }
  }

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      // First, update the status in our local state for immediate feedback
      if (selectedOrder) {
        setSelectedOrder({
          ...selectedOrder,
          status: newStatus
        });
      }
      
      // Then make the API call to update the status
      const response = await axios.put(`${url}/order/update/${orderId}`, { 
        status: newStatus 
      });
      
      if (response.data.success) {
        toast.success(`Order status updated to ${newStatus}`);
        
        // Refresh all orders to reflect the change
        fetchAllOrders();
      }
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Failed to update order status");
      
      // Revert the optimistic update if the API call failed
      viewOrderDetails(orderId);
    }
  }

  const downloadOrderPDF = () => {
    if (!selectedOrder) return;

    // Create a clean order details document for PDF
    const orderReport = document.createElement('div');
    
    // Format dates safely with fallbacks
    const orderDate = selectedOrder.orderDate ? new Date(selectedOrder.orderDate).toLocaleString() : 'Not available';
    const pickupDate = selectedOrder.pickupDate ? new Date(selectedOrder.pickupDate).toLocaleDateString() : 'Not available';
    
    // Handle missing data with default values
    const firstName = selectedOrder.contact?.firstName || 'Customer';
    const lastName = selectedOrder.contact?.lastName || '';
    const email = selectedOrder.contact?.email || 'Not provided';
    const phone = selectedOrder.contact?.phone || 'Not provided';
    const studentId = selectedOrder.contact?.studentId || 'Not provided';
    
    // Create items list with error handling
    const itemsList = selectedOrder.items && selectedOrder.items.length > 0 
        ? selectedOrder.items.map(item => `
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;">${item.name || 'Item'}</td>
              <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${item.quantity || 0}</td>
              <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">$${(item.price).toFixed(2)}</td>
              <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
        `).join('')
        : '<tr><td colspan="4" style="text-align: center; padding: 8px; border: 1px solid #ddd;">No items in order</td></tr>';
    
    orderReport.innerHTML = `
        <div style="padding: 20px; font-family: Arial, sans-serif;">
            <div style="text-align: center; margin-bottom: 20px;">
                <h2 style="margin-bottom: 5px;">Order Detail Report</h2>
                <p style="margin-top: 0; color: #666;">MealMate Hostel Cafeteria</p>
            </div>
            
            <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                <div>
                    <p><strong>Order ID:</strong> ${selectedOrder._id}</p>
                    <p><strong>Date:</strong> ${orderDate}</p>
                    <p><strong>Status:</strong> <span style="color: ${
                      selectedOrder.status === 'Completed' ? 'green' : 
                      selectedOrder.status === 'Cancelled' ? 'red' : 
                      selectedOrder.status === 'Processing' ? 'orange' : 'blue'
                    };">${selectedOrder.status || 'Pending'}</span></p>
                </div>
                <div>
                    <p><strong>Pickup Time:</strong> ${selectedOrder.pickupTime || 'Not specified'}</p>
                    <p><strong>Pickup Date:</strong> ${pickupDate}</p>
                </div>
            </div>
            
            <div style="margin-bottom: 20px;">
                <h3 style="border-bottom: 1px solid #ddd; padding-bottom: 5px;">Customer Information</h3>
                <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Student ID:</strong> ${studentId}</p>
                ${selectedOrder.specialInstructions ? 
                  `<p><strong>Special Instructions:</strong> ${selectedOrder.specialInstructions}</p>` : ''}
            </div>
            
            <div>
                <h3 style="border-bottom: 1px solid #ddd; padding-bottom: 5px;">Order Items</h3>
                <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                    <thead>
                        <tr style="background-color: #f2f2f2;">
                            <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Item</th>
                            <th style="padding: 8px; border: 1px solid #ddd; text-align: center;">Quantity</th>
                            <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Unit Price</th>
                            <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsList}
                    </tbody>
                    <tfoot>
                        <tr style="background-color: #f9f9f9;">
                            <td colspan="3" style="padding: 8px; border: 1px solid #ddd; text-align: right;"><strong>Total:</strong></td>
                            <td style="padding: 8px; border: 1px solid #ddd; text-align: right;"><strong>$${(selectedOrder.amount || 0).toFixed(2)}</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            
            <div style="margin-top: 30px; font-size: 12px; color: #666; text-align: center;">
                <p>Report generated on ${new Date().toLocaleString()}</p>
                <p>This is an official receipt from MealMate Hostel Cafeteria.</p>
            </div>
        </div>
    `;

    const opt = {
        margin: 10,
        filename: `order_${selectedOrder._id}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Use a try-catch block to handle PDF generation errors
    try {
        html2pdf().set(opt).from(orderReport).save();
        toast.success("Order PDF generated successfully");
    } catch (error) {
        console.error("Error generating PDF:", error);
        toast.error("Failed to generate PDF");
    }
  };

  const getFilteredOrders = () => {
    if (statusFilter === 'All') return orders;
    return orders.filter(order => order.status === statusFilter);
  };

  useEffect(() => {
    fetchAllOrders();
  }, [])

  if (loading) {
    return <div className="order add"><h3>Loading orders...</h3></div>;
  }

  return (
    <div className='order add'>
      <h3>Order Management</h3>
      
      <div className="order-filters">
        <label>Filter by Status:</label>
        <select 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Orders</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>
      
      <div className='order-list'>
        {getFilteredOrders().map((order, index) => (
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt=""/>
            <div className="order-details">
              <p className='order-items'>
                {order.items.map((item, index) => {
                  if(index === order.items.length-1) {
                    return `${item.name} x${item.quantity}`;
                  }
                  return `${item.name} x${item.quantity}, `;
                })}
              </p>
              <p><strong>Customer:</strong> {order.contact?.firstName} {order.contact?.lastName}</p>
            </div>
            <p><strong>Amount:</strong> ${order.amount}</p>
            <p><strong>Items:</strong> {order.items.length}</p>
            <p className={`order-status ${order.status.toLowerCase()}`}>
              <span>●</span>
              <b>{order.status}</b>
            </p>
            <div className="order-actions">
              <button onClick={() => viewOrderDetails(order._id)}>View Details</button>
            </div>
          </div>
        ))}
        {getFilteredOrders().length === 0 && (
          <div className="no-orders">
            <p>No {statusFilter !== 'All' ? statusFilter : ''} orders found.</p>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setSelectedOrder(null)}>×</button>
            <h3>Order Details</h3>
            <p><strong>Order ID:</strong> {selectedOrder._id}</p>
            <div className="status-update-container">
              <label><strong>Status:</strong></label>
              <select 
                value={selectedOrder.status} 
                onChange={(e) => updateOrderStatus(selectedOrder._id, e.target.value)}
                className={`status-select ${selectedOrder.status.toLowerCase()}`}
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <p><strong>Amount:</strong> ${selectedOrder.amount}</p>
            <p><strong>Order Date:</strong> {new Date(selectedOrder.orderDate).toLocaleString()}</p>
            
            <p><strong>Customer Details:</strong></p>
            <div style={{ marginLeft: '20px' }}>
              <p>Name: {selectedOrder.contact?.firstName} {selectedOrder.contact?.lastName}</p>
              <p>Email: {selectedOrder.contact?.email}</p>
              <p>Phone: {selectedOrder.contact?.phone}</p>
              <p>Student ID: {selectedOrder.contact?.studentId}</p>
            </div>

            <p><strong>Ordered Items:</strong></p>
            <ul className="items-list">
              {selectedOrder.items.map((item, index) => (
                <li key={index}>
                  {item.name} x {item.quantity} - ${item.price * item.quantity}
                </li>
              ))}
            </ul>

            {selectedOrder.specialInstructions && (
              <p><strong>Special Instructions:</strong> {selectedOrder.specialInstructions}</p>
            )}
            
            {selectedOrder.pickupTime && (
              <p><strong>Pickup Time:</strong> {selectedOrder.pickupTime}</p>
            )}
            
            {selectedOrder.pickupDate && (
              <p><strong>Pickup Date:</strong> {new Date(selectedOrder.pickupDate).toLocaleDateString()}</p>
            )}
            
            <div className="modal-actions">
              <button className="download-btn" onClick={downloadOrderPDF}>
                <i className="fas fa-download"></i> Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Orders