import React,{useState,useEffect} from 'react'
import Nav2 from '../Nav2/Nav2'
import './EmployeeList.css'
import {Link} from 'react-router-dom'
import axios from "axios"
import { columns,EmployeeButtons } from '../EmployeeHelper'
import DataTable from "react-data-table-component";


function EmployeeList() {

  const [newemployee, setEmployee] = useState([]);
  const [searchTerm, setSearchterm] = useState("");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get("http://localhost:8070/newemployee");
        console.log(response.data); {
          const data = response.data.newemployee.map((emp) => ({
            _id: emp._id,
            empid:emp.empid,
            empname: emp.empname,
            empdep: emp.empdep,
            empdob: new Date(emp.empdob).toDateString(),
            empemail:emp.empemail,
            action: (<EmployeeButtons _id={(emp._id)}/>  ),
          }));
          setEmployee(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchEmployee();
  }, []);

 const customStyles = {
  headCells: {
    style: {
      fontSize: '14px',
      fontWeight: 'bold',
      backgroundColor: '#e9ecef',
      color: '#333',
    },
  },
  cells: {
    style: {
      fontSize: '14px',
    },
  },
  rows: {
    style: {
      minHeight: '48px',
    },
  },
};

  return (
    <div className= "newemp-container">
    <Nav2/>
    <div className="newemp-header">
    <h3>Manage Employee</h3>
   </div>
   <div className="search-add-row">
          <input
            type="text"
            placeholder="Search by Employee Name"
            className="depsearch"
          />
          <Link to="/admin-dashboard/add-employee" className="addbutton">
            Add New Employee
          </Link>
        </div>
        <div>
          <DataTable columns={columns} data={newemployee} customStyles={customStyles}/>
        </div>
      </div>
  )
}

export default EmployeeList