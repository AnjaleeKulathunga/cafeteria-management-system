import React, { useState, useEffect } from "react";
import Nav from "../Nav2/Nav2";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./AdminFeedbackView.css";

function AdminFeedbackView() {
  const history = useNavigate();
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    description: "",
    rating: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8070/review/${id}`);
        const data = response.data;
        if (data && data.review) {
          setFeedback(data.review);
        }
      } catch (error) {
        console.error("Error fetching feedback:", error);
        setError("Failed to fetch feedback details.");
      } finally {
        setLoading(false);
      }
    };
    fetchFeedback();
  }, [id]);

  if (loading) return <div>Loading feedback details...</div>;
  if (error) return <div>Error: {error}</div>;

  const deleteHandler = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this feedback!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8070/review/${id}`).then(() => {
          history("/adminfeedback");
        });
      }
    });
  };

  return (
    <div>
      <Nav />
      <div className="adfbv-container">
        <h2>View Feedback</h2>
        <div className="adfbv-form">
          <div className="adfbv-form-group">
            <label>Name</label>
            <input type="text" value={feedback.name} readOnly />
          </div>
          <div className="adfbv-form-group">
            <label>Email</label>
            <input type="text" value={feedback.email} readOnly />
          </div>
          <div className="adfbv-form-group">
            <label>Feedback</label>
            <textarea rows="5" value={feedback.description} readOnly />
          </div>
          <div className="adfbv-form-group">
            <label>Rating</label>
            <input type="text" value={feedback.rating} readOnly />
          </div>
          <div className="adfbv-button-group">
            <button onClick={deleteHandler} className="adfbv-delete-btn">
              Delete
            </button>
            <button
              type="button"
              className="adfbv-cancel-btn"
              onClick={() => history("/adminfeedback")}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminFeedbackView;