import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Nav2 from '../Nav2/Nav2';
import { useParams } from 'react-router-dom';
import './ViewEmployee.css'

function ViewEmployee() {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/newemployee/${id}`);
                console.log(response.data.success);
                if (response.data.success) {
                    setEmployee(response.data.employee);
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            }
        };
        fetchEmployee();
    }, [id]);

    if (!employee) {
        return <p>Loading employee details...</p>;
    }

    return (
  <div className="viewemp-container">
    <Nav2 />
    <div className="employee-card">
      <h3>Employee Details</h3>
      <div className="detailbox">
        <p className="title">Name:</p>
        <p className="detail">{employee.empname}</p>
      </div>
      <div className="detailbox">
        <p className="title">Employee ID:</p>
        <p className="detail">{employee.empid}</p>
      </div>
      <div className="detailbox">
        <p className="title">Email:</p>
        <p className="detail">{employee.empemail}</p>
      </div>
      <div className="detailbox">
        <p className="title">Phone Number:</p>
        <p className="detail">{employee.empphone}</p>
      </div>
      <div className="detailbox">
        <p className="title">Date of Birth:</p>
        <p className="detail">{new Date(employee.empdob).toLocaleDateString()}</p>
      </div>
      <div className="detailbox">
        <p className="title">Gender:</p>
        <p className="detail">{employee.empgender}</p>
      </div>
      <div className="detailbox">
        <p className="title">Designation:</p>
        <p className="detail">{employee.empplace}</p>
      </div>
      <div className="detailbox">
        <p className="title">Department:</p>
        <p className="detail">{employee.empdep}</p>
      </div>
      <div className="detailbox">
        <p className="title">Salary:</p>
        <p className="detail">{employee.empsalary}</p>
      </div>
      <div className="detailbox">
        <p className="title">Role:</p>
        <p className="detail">{employee.emprole}</p>
      </div>
    </div>
  </div>
);

}

export default ViewEmployee;