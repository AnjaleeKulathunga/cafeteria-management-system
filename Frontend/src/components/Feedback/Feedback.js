import { FaStar } from 'react-icons/fa';
import './Feedback.css';

function Feedback({ feedback }) {
    if (!feedback) return null;

    const { description, rating, name,  } = feedback;

    return (
        <div className="feedback-card1">
            <div className="feedback-header1">
                <img
                    src={"https://i.pinimg.com/736x/ef/b4/33/efb4337132dd4adc7a7e327f7bcad2b3.jpg"}
                    alt="Profile"
                    className="feedback-profile-pic1"
                />
                <div className="feedback-name1"><p>- {name}</p></div>
            </div>

            <div className="feedback-item1"><p>{description}</p></div>

            <div className="feedback-item1">
                {[...Array(rating)].map((_, i) => (
                    <FaStar key={i} className="rating-stars1" color="#ffc107" />
                ))}
            </div>
        </div>
    );
}

export default Feedback;