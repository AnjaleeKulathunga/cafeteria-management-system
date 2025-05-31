import React from 'react';
import { Link } from 'react-router-dom';


function ComplaintTable({ complaint }) {

  if (!complaint || typeof complaint !== 'object') {
    console.warn("Invalid complaint passed:", complaint);
    return null;
  }

  const { _id, idNo, name, email, userType, description, status, reply } = complaint;


  return (   
            <tr>
              <td>{idNo}</td>
              <td>{name}</td>
              <td>{email}</td>
              <td>{userType}</td>
              <td>{description}</td>
              <td>{reply || "-"}</td>
              <td>
                <span className={`status-badge ${status?.toLowerCase() || "pending"}`}>
                  {status || "Pending"}
                </span>
              </td>

              <td>
                <div className='act-buttons'>
                  <Link to={`/view/${_id}`} className="view-btn">View</Link>
                </div>
              </td>
            </tr>

  );
}

export default ComplaintTable;