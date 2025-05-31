import React,{useEffect, useState} from "react";
import Nav2 from "../Nav2/Nav2";
import './EmployeeAdd.css'
import { fetchEmployee } from "../EmployeeHelper";
import { useNavigate,useParams } from "react-router-dom";
import axios from "axios"

function EmployeeEdit() {
  const [departments,setDepartment] = useState([])
  const [employee,setEmployee] = useState([])
  const {id} = useParams()

  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  

  useEffect(()=>{
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
  }, []);

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
        .put("http://localhost:8070/newemployee", {
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
      <form onSubmit= {handleSubmit}>
        <h2>Edit Employee</h2>
        <div className="form-grid">
        <div>
          <label className="empname">Name</label>
          <input
            type="text"
            name="empname"
            value={employee.empname}
            onChange={handleChange}
            placeholder="Enter Your Name"
            required
          />
        </div>
        
        <div>
          <label className="empphone">Phone Number</label>
          <input
            type="number"
            name="empphone"
             value={employee.empphone}
            onChange={handleChange}
            placeholder="Mobile Number"
            required
          />
        </div>
        
        <div>
          <label className="emmpplace">Designation</label>
          <input
            type="text"
            name="empplace"
            value={employee.empplace}
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
            value={employee.empdep}
            onChange={handleChange}
            placeholder="Payment/Inventroy/Employee/Kitchen"
            required
          />
            <option value="">Select Department</option>
        
        </div>
       
        <div>
          <label className="emmpplace">Salary</label>
          <input
            type="number"
            name="empsalary"
            value={employee.empsalary}
            onChange={handleChange}
            placeholder="Salary"
            required
          />
        </div>
        <div>
        <label className="emprole">Role</label>
          <select
            name="emprole"
            value={employee.emprole}
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
        <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
}

export default EmployeeEdit;