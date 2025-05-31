import { useEffect, useState } from "react";
import axios from "axios";
import Feedback from "../Feedback/Feedback";
import Nav from '../Nav/Nav';
import Nav2 from '../Nav2/Nav2';
import './FeedbackDetails.css';
import { Link } from 'react-router-dom';

const FeedbackDetails = () => {
    const [feedbacks, setFeedback] = useState([]);
    const userRole = localStorage.getItem("userRole");

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get("http://localhost:8070/review");
                console.log("Fetched feedbacks:", response.data);
                setFeedback(response.data.review);
            } catch (error) {
                console.error("Error fetching feedbacks:", error);
            }
        };

        fetchFeedbacks();
    }, []);

    return (
        <>
            {/* Render the correct navigation based on user role */}
            {(userRole === "admin" || userRole === "staff") ? <Nav2 /> : <Nav />}
            
            <div className="bdy">
                <div className="feedback-details-wrapper">
                    <div>
                        <h1 className="header-cont">We value your feedback!</h1>
                        <p className="small-p">"Your opinions help us improve our services and serve you better."</p>
                    </div>
                    <div className="top-btn">
                        <Link to="/addfeedback" className="add-feed">Add your Feedback from here!</Link>
                    </div>
                    <div className="feedback-grid">
                        {Array.isArray(feedbacks) && feedbacks.length > 0 ? (
                            feedbacks.map((feedback) => (
                                <Feedback key={feedback._id} feedback={feedback} />
                            ))
                        ) : (
                            <p>No feedbacks found.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default FeedbackDetails;