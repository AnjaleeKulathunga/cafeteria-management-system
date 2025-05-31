import './AddFeedback.css';
import Nav from '../Nav/Nav';
import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddFeedback = () => {
    const navigate = useNavigate();
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        description: "",
        rating: ""
    });
    
    // Check if user is logged in and pre-fill user data
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            Swal.fire({
                icon: 'warning',
                title: 'Login Required',
                text: 'You need to login to submit feedback',
                confirmButtonText: 'Login Now'
            }).then(() => {
                navigate('/log');
            });
        } else {
            // Pre-fill user data if available
            const userName = localStorage.getItem('userName');
            const userEmail = localStorage.getItem('userEmail');
            
            if (userName || userEmail) {
                setInputs(prev => ({
                    ...prev,
                    name: userName || "",
                    email: userEmail || ""
                }));
            }
        }
    }, [navigate]);

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8070/review", {
                name: inputs.name,
                email: inputs.email,
                description: inputs.description,
                rating: rating,
            });
            Swal.fire({
                  icon: 'success',
                  title: 'Feedback Submitted',
                  text: 'Your feedback has been successfully added!',
                  confirmButtonText: 'OK'
                }).then(() => {
                  navigate('/feedbackdetails');
                }); 
        } catch (err) {
            console.error("Error submitting feedback:", err);
        }
    };

    return (
        <div className="add-feedback">
            <Nav/>
            <div className='add-feedback-body'>
                <div className="add-feedback-container">
                    <h1 className="add-feedback-title">We value your feedback!</h1>
                    <p className="add-feedback-subtitle">
                        Your opinions help us improve our services and serve you better.
                    </p>

                    <div className="add-feedback-emoji-box">
                        <button className="add-feedback-btn add-feedback-btn-normal">&#128578;</button>
                        <button className="add-feedback-btn add-feedback-btn-normal">&#128515;</button>
                        <button className="add-feedback-btn add-feedback-btn-normal">&#128519;</button>
                        <button className="add-feedback-btn add-feedback-btn-normal">&#128531;</button>
                        <button className="add-feedback-btn add-feedback-btn-normal">&#128532;</button>
                        <button className="add-feedback-btn add-feedback-btn-normal">&#128545;</button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="add-feedback-info-field">
                            <label className="add-feedback-label">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder=" "
                                    onChange={handleChange}
                                    value={inputs.name}
                                    required
                                    className="add-feedback-input"
                                />
                                <span>Name</span>
                            </label>

                            <label className="add-feedback-label">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder=" "
                                    onChange={handleChange}
                                    value={inputs.email}
                                    required
                                    className="add-feedback-input"
                                />
                                <span>Email address</span>
                            </label>

                            <p className="add-feedback-question">What do you want to say?</p>
                            <textarea
                                name="description"
                                cols="20"
                                rows="5"
                                onChange={handleChange}
                                value={inputs.description}
                                required
                                className="add-feedback-textarea"
                            ></textarea>

                            <div className='add-feedback-stars'>
                                {[...Array(5)].map((star, i) => {
                                    const ratingValue = i + 1;
                                    return (
                                        <label key={i} className="add-feedback-star-label">
                                            <input
                                                type="radio"
                                                name="rating"
                                                value={ratingValue}
                                                onClick={() => {
                                                    setRating(ratingValue);
                                                }}
                                                required
                                                className="add-feedback-star-input"
                                            />
                                            <FaStar
                                                className='add-feedback-star'
                                                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                                size={38}
                                                onMouseEnter={() => setHover(ratingValue)}
                                                onMouseLeave={() => setHover(null)}
                                            />
                                        </label>
                                    );
                                })}
                            </div>

                            <p className="add-feedback-rating-text">The rating is {rating}</p>

                            <div className="add-feedback-center">
                                <button className="add-feedback-btn add-feedback-submit-btn" type="submit">Add you Feedback</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddFeedback;