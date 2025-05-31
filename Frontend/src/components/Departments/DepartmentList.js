import React, { useState, useEffect } from "react";
import Nav2 from "../Nav2/Nav2";
import axios from "axios";
import "./DepartmentList.css";
import { Link } from "react-router-dom";
import { columns, DepartmentButtons } from "../DepartmentHelper";
import DataTable from "react-data-table-component";

function DepartmentList() {
  const [department, setDepartment] = useState([]);
  const [searchTerm, setSearchterm] = useState("");

  const filterDepartments = department.filter((dep) =>
    dep.dep_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onDepartmentDelete = async (id) => {
    const data = department.filter((dep) => dep._id !== id);
    setDepartment(data);
  };

  useEffect(() => {
     const fetchDepartments = async () => {
      try {
        const response = await axios.get("http://localhost:8070/Departments");
        if (response.data.success) {
          let depno = 1;
          const data = response.data.department.map((dep) => ({
            _id: dep._id,
            depno: depno++,
            dep_name: dep.dep_name,
            action: (
              <DepartmentButtons
                _id={dep._id}
                onDepartmentDelete={onDepartmentDelete}
              />
            ),
          }));
          setDepartment(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchDepartments();
  }, []);


  const customStyles = {
    headCells: {
      style: {
        fontSize: "18px",
        fontWeight: "bold",
        backgroundColor: "#f0f0f0",
        color: "#333",
      },
    },
  };

  return (
    <div className="dept-container">
      <Nav2 />
      <div className="dept-header">
        <h3>Department Details</h3>

        <div className="search-add-row">
          <input
            type="text"
            placeholder="Search by Department Name"
            className="depsearch"
            onChange={(e) => setSearchterm(e.target.value)}
          />
          <Link to="/admin-dashboard/add-department" className="addbutton">
            Add New Department
          </Link>
        </div>
      </div>
      <div className="tabledep">
        <DataTable
          columns={columns}
          data={filterDepartments}
          customStyles={customStyles}
        />
      </div>
    </div>
  );
}

export default DepartmentList;