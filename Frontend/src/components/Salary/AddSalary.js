import React, { useEffect, useState } from "react";
import Nav2 from "../Nav2/Nav2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddSalary() {
  const history = useNavigate();

  const [salary, setSalary] = useState({
    empdep: "",
    empid: "",
    empbasicsal: "",
    empallowance: "",
    empdeduction: "",
    emppaydate: "",
  });

  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch departments when component mounts
    axios
      .get("http://localhost:8070/Departments")
      .then((res) => {
        if (res.data.success && Array.isArray(res.data.department)) {
          setDepartments(res.data.department);
        } else {
          setDepartments([]); // fallback
        }
      })
      .catch((err) => console.error("Error fetching departments:", err));
  }, []);

  useEffect(() => {
    if (salary.empdep) {
      // Fetch employees when department changes
      axios
        .get(`http://localhost:8070/newemployee/department/${salary.empdep}`)
        .then((res) => setEmployees(res.data.employees))
        .catch((err) => console.error("Error fetching employees:", err));
    } else {
      setEmployees([]);
      setSalary((prev) => ({ ...prev, empid: "" }));
    }
  }, [salary.empdep]);

  const handleChange = (e) => {
    setSalary((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => history("/admin-salary-details"));
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:8070/salaries", {
      empdep: String(salary.empdep),
      empid: String(salary.empid),
      empbasicsal: Number(salary.empbasicsal),
      empallowance: Number(salary.empallowance),
      empdeduction: Number(salary.empdeduction),
      emppaydate: salary.emppaydate,
    });
  };

  return (
    <div className="admin-empcontainer">
      <Nav2 />
      <div className="admin-empmain">
        <form onSubmit={handleSubmit}>
          <h2>Add Salary</h2>
          <div className="form-grid">
            {/* Department Select */}
            <div>
              <label>Department</label>
              <select
                name="empdep"
                value={salary.empdep}
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

            {/* Employee ID Select */}
            <div>
              <label>Employee ID</label>
              <select
                name="empid"
                value={salary.empid}
                onChange={handleChange}
                required
                disabled={!employees.length}
              >
                <option value="">Select employee</option>
                {employees.map((emp) => (
                  <option key={emp._id} value={emp.empid}>
                    {emp.empid}
                  </option>
                ))}
              </select>
            </div>

            {/* Other fields */}
            <div>
              <label>Basic Salary</label>
              <input
                type="number"
                name="empbasicsal"
                value={salary.empbasicsal}
                onChange={handleChange}
                placeholder="Basic salary"
                required
                min="0"
              />
            </div>

            <div>
              <label>Allowances</label>
              <input
                type="number"
                name="empallowance"
                value={salary.empallowance}
                onChange={handleChange}
                placeholder="Allowance"
                required
                min="0"
              />
            </div>

            <div>
              <label>Deductions</label>
              <input
                type="number"
                name="empdeduction"
                value={salary.empdeduction}
                onChange={handleChange}
                placeholder="Deduction"
                required
                min="0"
              />
            </div>

            <div>
              <label>Pay Date</label>
              <input
                type="date"
                name="emppaydate"
                value={salary.emppaydate}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSalary;