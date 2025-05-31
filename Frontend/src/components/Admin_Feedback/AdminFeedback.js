import React from "react";
import { Link } from "react-router-dom";

function AdminFeedback({ feedback, no }) {
  if (!feedback || typeof feedback !== "object") {
    console.warn("Invalid feedback passed:", feedback);
    return null;
  }

  const { _id, name, email, description, rating } = feedback;

  const renderStars = (ratingValue) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`adfb-star ${i <= ratingValue ? "filled" : ""}`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <tr>
      <td>{no}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{description}</td>
      <td>{renderStars(Number(rating))}</td>
      <td>
        <div className="adfb-action-buttons">
          <Link to={`/viewfeed/${_id}`} className="adfb-view-btn">
            View
          </Link>
        </div>  
      </td>
    </tr>
  );
}

export default AdminFeedback;