import React,{useEffect, useState} from "react";
import Nav2 from "../Nav2/Nav2";
import './EmployeeAdd.css'
import { fetchDepartments } from "../EmployeeHelper";
import { useNavigate } from "react-router-dom";
import axios from "axios"

function EmployeeAdd() {
  const [department,setDepartment] = useState([])
  const [employee,setEmployee] = useState([])

  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setEmployee((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(employee);
    sendRequest().then(() => {
      setSuccessMessage("Employee added successfully");
      setTimeout(() => {
        navigate("/admin-employee-details");
      }, 1000);
    });
  };

  const sendRequest = async () => {
      await axios
        .post("http://localhost:8070/newemployee", {
          empname: String(employee.empname),
          empid: String(employee.empid),
          empemail: String(employee.empemail),
          empphone: String(employee.empphone),
          empdob: String(employee.empdob),
          empgender: String(employee.empgender),
          empplace: String(employee.empplace),
          empdep: String(employee.empdep),
          empsalary: String(employee.empsalary),
          emppassword: String(employee.emppassword),
          emprole: String(employee.emprole),
        })
        .then((res) => res.data);
    };

  return (
    <div className="admin-empcontainer">
      <Nav2 />
      <div className="admin-empmain"></div>
      <form onSubmit= {handleSubmit} autoComplete="off">
        <h2>Add Employee</h2>
        <div className="form-grid">
        <div>
          <label className="empname">Name</label>
          <input
            type="text"
            name="empname"
            onChange={handleChange}
            placeholder="Enter Your Name"
            required
          />
        </div>
        <div>
          <label className="empid">Employee ID</label>
          <input
            type="text"
            name="empid"
            onChange={handleChange}
            placeholder="Employee ID"
            required
          />
        </div>
        <div>
          <label className="empemail">Email</label>
          <input
            type="email"
            name="empemail"
            onChange={handleChange}
            placeholder="Enter Your Email"
            required
          />
        </div>
        <div>
          <label className="empphone">Phone Number</label>
          <input
            type="number"
            name="empphone"
            onChange={handleChange}
            placeholder="Mobile Number"
            required
          />
        </div>
        <div>
          <label className="empdob">Date of Birth</label>
          <input
            type="date"
            name="empdob"
            onChange={handleChange}
            placeholder="DOB"
            required
          />
        </div>
        <div>
          <label className="empgender">Gender</label>
          <select
            name="empgender"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="emmpplace">Designation</label>
          <input
            type="text"
            name="empplace"
            onChange={handleChange}
            placeholder="Designation"
            required
          />
        </div>
        <div>
          <label className="empdep">Department</label>
          <input
            type="text"
            name="empdep"
            onChange={handleChange}
            placeholder="Payment/Inventroy/Employee/Kitchen"
            required
          />
        </div>
       
        <div>
          <label className="emmpplace">Salary</label>
          <input
            type="number"
            name="empsalary"
            onChange={handleChange}
            placeholder="Salary"
            required
          />
        </div>
        <div>
          <label className="emppassword">Password</label>
          <input
            type="password"
            name="emppassword"
            onChange={handleChange}
            placeholder=""
            required
          />
        </div>
        <div>
        <label className="emprole">Role</label>
          <select
            name="emprole"
            required
            onChange={handleChange}
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="cashier">Cashier</option>
            <option value="manager">Manager</option>
            <option value="kitchenstaff">Kitchen Staff</option>
          </select>
        </div>
        <button type="submit">Add Employee</button>
        </div>
      </form>
    </div>
  );
}

export default EmployeeAdd;