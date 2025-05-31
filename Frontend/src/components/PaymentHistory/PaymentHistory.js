import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PaymentHistory.css';

const PaymentHistory = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        try {
            const response = await axios.get('http://localhost:8070/payment/all');
            if (response.data.success) {
                setPayments(response.data.payments);
            }
        } catch (err) {
            setError('Failed to fetch payment history');
            console.error('Error fetching payments:', err);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'status-success';
            case 'pending':
                return 'status-pending';
            case 'failed':
                return 'status-failed';
            default:
                return 'status-unknown';
        }
    };

    if (loading) return <div className="payment-history-loading">Loading payment history...</div>;
    if (error) return <div className="payment-history-error">{error}</div>;

    return (
        <div className="payment-history-container">
            <h2>Payment History</h2>
            {payments.length === 0 ? (
                <p className="no-payments">No payment records found.</p>
            ) : (
                <div className="payment-list">
                    {payments.map((payment) => (
                        <div key={payment._id} className="payment-card">
                            <div className="payment-header">
                                <span className={`payment-status ${getStatusColor(payment.status)}`}>
                                    {payment.status.toUpperCase()}
                                </span>
                                <span className="payment-date">
                                    {formatDate(payment.createdAt)}
                                </span>
                            </div>
                            <div className="payment-details">
                                <div className="payment-info">
                                    <p><strong>Order ID:</strong> {payment.orderId}</p>
                                    <p><strong>Amount:</strong> ${payment.amount}</p>
                                    <p><strong>Card Type:</strong> {payment.cardType}</p>
                                </div>
                                <div className="payment-transaction">
                                    <p><strong>Transaction ID:</strong> {payment.transactionId}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PaymentHistory; 