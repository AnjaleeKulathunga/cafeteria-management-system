import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Nav2 from "../Nav2/Nav2";

function UpdateSalary() {
  const [salary, setSalary] = useState({});
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const { id } = useParams(); // get empid from route
  const history = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8070/salaries/emp/${id}`)
      .then((res) => setSalary(res.data.salary));

    axios.get("http://localhost:8070/Departments").then((res) => {
      if (res.data.success && Array.isArray(res.data.department)) {
        setDepartments(res.data.department);
      } else {
        setDepartments([]);
      }
    });

    axios.get("http://localhost:8070/newemployee/").then((res) => {
      if (res.data.success && Array.isArray(res.data.employees)) {
        setEmployees(res.data.employees);
      } else {
        setEmployees([]);
      }
    });
  }, [id]);

  const handleChange = (e) => {
    setSalary({ ...salary, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      empdep: salary.empdep,
      empid: salary.empid,
      empbasicsal: Number(salary.empbasicsal),
      empallowance: Number(salary.empallowance),
      empdeduction: Number(salary.empdeduction),
      emppaydate: salary.emppaydate,
    };

    axios
      .put(`http://localhost:8070/salaries/emp/${id}`, payload)
      .then(() => history("/admin-salary-details"));
  };

  return (
    <div className="admin-empcontainer">
      <Nav2 />
      <div className="admin-empmain">
        <form onSubmit={handleSubmit}>
          <h2>Update Salary</h2>
          <div className="form-grid">
            <div>
              <label>Department</label>
              <select
                name="empdep"
                value={salary.empdep || ""}
                onChange={handleChange}
                required
              >
                <option value="">Select department</option>
                {departments.map((dep) => (
                  <option key={dep._id} value={dep.dep_name}>
                    {dep.dep_name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Employee ID</label>
              <input
                type="text"
                name="empid"
                value={salary.empid || ""}
                readOnly
              />
            </div>
            <div>
              <label>Basic Salary</label>
              <input
                type="number"
                name="empbasicsal"
                value={salary.empbasicsal || ""}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
            <div>
              <label>Allowances</label>
              <input
                type="number"
                name="empallowance"
                value={salary.empallowance || ""}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
            <div>
              <label>Deductions</label>
              <input
                type="number"
                name="empdeduction"
                value={salary.empdeduction || ""}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
            <div>
              <label>Pay Date</label>
              <input
                type="date"
                name="emppaydate"
                value={salary.emppaydate?.slice(0, 10) || ""}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateSalary;