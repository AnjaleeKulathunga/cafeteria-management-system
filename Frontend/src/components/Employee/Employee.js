import React from 'react';
import './Employee.css';
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Employee(props) {
  const { employees } = props;
  const history = useNavigate();

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/Employee/${id}`);
      history("/employeedetails");
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div className="employee-container">
      <table className="employee-table">
        <thead>
          <tr>
            <th>Emp Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Address</th>
            <th>Emp Type</th>
            <th>Phone Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees && employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.empId}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.age}</td>
              <td>{employee.address}</td>
              <td>{employee.empType}</td>
              <td>{employee.phoneNumber}</td>
              <td>
                <div className="action-buttons">
                  <Link to={`/employeedetails/${employee._id}`} className="update-btn">Update</Link>
                  <button onClick={() => deleteHandler(employee._id)} className="delete-btn">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Employee;
