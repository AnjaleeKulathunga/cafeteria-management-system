import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import axios from 'axios';
import './Complaint.css';

function Complaint({ complaint, onDelete }) {
  const history = useNavigate();

  // Add null check
  if (!complaint) {
    console.warn("Complaint prop is undefined");
    return null;
  }

  const { _id, idNo, name, email, userType, description, status, reply } = complaint;

  const deleteHandler = async () => {
    try {
      await axios.delete(`http://localhost:8070/complaint/${_id}`);
      Swal.fire({
        icon: 'success',
        title: 'Complaint Deleted',
        text: 'Your complaint has been successfully deleted!',
        confirmButtonText: 'OK'
      }).then(() => {
        if (onDelete) {
          onDelete();
        } else {
          history('/complaintdetails');
        }
      });
    } catch (error) {
      console.error('Error deleting complaint:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete complaint. Please try again.',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleEdit = () => {
    history(`/complaintupdate/${_id}`);
  };

  return (
    <tr>
      <td>{idNo}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{userType}</td>
      <td>{description}</td>
      <td>{reply || "Pending..."}</td>
      <td>
        <span className={`status-badge ${status?.toLowerCase() || "pending"}`}>
          {status || "Pending"}
        </span>
      </td>
      <td>
        <div className='action-buttons'>
          <button onClick={handleEdit} className="icon-btn">
            <FaEdit className="icon edit-icon" title="Edit" />
          </button>
          <button onClick={deleteHandler} className="icon-btn">
            <FaTrash className="icon delete-icon" title="Delete" />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default Complaint;