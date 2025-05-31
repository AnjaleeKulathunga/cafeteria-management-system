import React, { useState } from 'react';
import './PaymentGateway.css';
import visaLogo from "../../assets/images/visaLogo.svg";
import axios from 'axios';

const PaymentGateway = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardName, setCardName] = useState('');
    const [errors, setErrors] = useState({});
    const [cardType, setCardType] = useState('');
    const [loading, setLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null);

    
    const detectCardType = (number) => {
        if (number.startsWith('4')) return 'visa';
        return '';
    };

 
    const validateCardNumber = (number) => {
        const regex = /^[0-9]{16}$/;
        return regex.test(number.replace(/\s/g, ''));
    };

    const validateExpiryDate = (date) => {
        const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
        if (!regex.test(date)) return false;

        const [month, year] = date.split('/');
        const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
        const today = new Date();
        return expiry > today;
    };

    const validateCVV = (cvv) => {
        const regex = /^[0-9]{3}$/;
        return regex.test(cvv);
    };

    const validateCardName = (name) => {
        const regex = /^[a-zA-Z\s]{3,}$/;
        return regex.test(name);
    };

   
    const handleCardNumberChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 16) value = value.slice(0, 16);
        
        
        value = value.replace(/(\d{4})/g, '$1 ').trim();
        setCardNumber(value);
        setCardType(detectCardType(value.replace(/\s/g, '')));
        
        const isValid = validateCardNumber(value);
        setErrors(prev => ({ ...prev, cardNumber: !isValid && value.length > 0 ? 'Invalid card number' : '' }));
    };

    const handleExpiryDateChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        
        setExpiryDate(value);
        const isValid = validateExpiryDate(value);
        setErrors(prev => ({ ...prev, expiryDate: !isValid && value.length > 0 ? 'Invalid expiry date' : '' }));
    };

    const handleCVVChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 3) value = value.slice(0, 3);
        setCvv(value);
        const isValid = validateCVV(value);
        setErrors(prev => ({ ...prev, cvv: !isValid && value.length > 0 ? 'Invalid CVV' : '' }));
    };

    const handleCardNameChange = (e) => {
        const value = e.target.value.toUpperCase();
        setCardName(value);
        const isValid = validateCardName(value);
        setErrors(prev => ({ ...prev, cardName: !isValid && value.length > 0 ? 'Invalid name' : '' }));
    };

    const processPayment = async (paymentData) => {
        try {
            setLoading(true);
            // First create a test payment
            const response = await axios.post('http://localhost:8070/payment/test');
            
            if (response.data.success) {
                // Get payment status
                const statusResponse = await axios.get(`http://localhost:8070/payment/status/${response.data.payment.transactionId}`);
                
                if (statusResponse.data.success && statusResponse.data.payment.status === 'completed') {
                    setPaymentStatus({
                        success: true,
                        message: 'Payment processed successfully!',
                        orderId: response.data.payment.orderId
                    });
                } else {
                    throw new Error('Payment processing failed');
                }
            } else {
                throw new Error('Payment creation failed');
            }
        } catch (error) {
            console.error('Payment error:', error);
            setPaymentStatus({
                success: false,
                message: 'Payment failed. Please try again.'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate all fields
        const newErrors = {
            cardNumber: !validateCardNumber(cardNumber) ? 'Invalid card number' : '',
            expiryDate: !validateExpiryDate(expiryDate) ? 'Invalid expiry date' : '',
            cvv: !validateCVV(cvv) ? 'Invalid CVV' : '',
            cardName: !validateCardName(cardName) ? 'Invalid name' : ''
        };

        setErrors(newErrors);

        // Check if there are any errors
        if (Object.values(newErrors).every(error => error === '')) {
            const paymentData = {
                cardNumber: cardNumber.replace(/\s/g, ''),
                expiryDate,
                cvv,
                cardName,
                amount: 100
            };
            
            await processPayment(paymentData);
        }
    };

    return (
        <div className="payment-container">
            <h1>Payment Details</h1>
            {paymentStatus && (
                <div className={`payment-status ${paymentStatus.success ? 'success' : 'error'}`}>
                    <p>{paymentStatus.message}</p>
                    {paymentStatus.orderId && (
                        <p>Order ID: {paymentStatus.orderId}</p>
                    )}
                </div>
            )}
            <div className="payment-method-container">
                <div className="payment-card">
                    <div className="card-header">
                        <h3>Credit / Debit Card</h3>
                        <div className="card-types">
                            <img src={visaLogo} alt="Visa" className={cardType === 'visa' ? 'active' : ''} />
                        </div>
                    </div>
                    <p className="secure-text">Secure payment processing</p>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Card Number</label>
                            <input
                                type="text"
                                value={cardNumber}
                                onChange={handleCardNumberChange}
                                placeholder="4*** **** **** ****"
                                maxLength="19"
                                className={cardNumber && (errors.cardNumber ? 'invalid' : 'valid')}
                            />
                            {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Expiry Date</label>
                                <input
                                    type="text"
                                    value={expiryDate}
                                    onChange={handleExpiryDateChange}
                                    placeholder="MM/YY"
                                    maxLength="5"
                                    className={expiryDate && (errors.expiryDate ? 'invalid' : 'valid')}
                                />
                                {errors.expiryDate && <span className="error">{errors.expiryDate}</span>}
                            </div>

                            <div className="form-group">
                                <label>CVV</label>
                                <input
                                    type="password"
                                    value={cvv}
                                    onChange={handleCVVChange}
                                    placeholder="***"
                                    maxLength="3"
                                    className={cvv && (errors.cvv ? 'invalid' : 'valid')}
                                />
                                {errors.cvv && <span className="error">{errors.cvv}</span>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Name on Card</label>
                            <input
                                type="text"
                                value={cardName}
                                onChange={handleCardNameChange}
                                placeholder="CARDHOLDER NAME"
                                className={cardName && (errors.cardName ? 'invalid' : 'valid')}
                            />
                            {errors.cardName && <span className="error">{errors.cardName}</span>}
                        </div>

                        <button 
                            type="submit" 
                            className={`submit-button ${loading ? 'loading' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : 'Pay Now'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PaymentGateway;
