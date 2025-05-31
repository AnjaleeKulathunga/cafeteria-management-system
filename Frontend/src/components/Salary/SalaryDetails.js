import React, { useState, useEffect } from "react";
import Nav2 from "../Nav2/Nav2";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./SalaryDetails.css";

const URL = "http://localhost:8070/salaries";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function SalaryDetails() {
  const [salary, setSalary] = useState([]);
  const history = useNavigate();
  // const [searchTerm, setSearchterm] = useState("");

  // const filterSalaries = salary.filter((sal) =>
  //   sal.empid.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   sal.empdep.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   sal.empnetsalary.toString().includes(searchTerm)
  // );

  useEffect(() => {
    fetchHandler().then((data) => setSalary(data.Salaries));
  }, []);

  const deleteHandler = async (empid) => {
    await axios
      .delete(`http://localhost:8070/salaries/emp/${empid}`)
      .then((res) => res.data)
      .then(() => history(0));
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Salary Details", 14, 10);
    const tableColumn = ["Employee ID", "Department", "Net Salary", "Pay Date"];
    const tableRows = [];

    salary.forEach((sal) => {
      const row = [
        sal.empid,
        sal.empdep,
        sal.empnetsalary,
        new Date(sal.emppaydate).toLocaleDateString(),
      ];
      tableRows.push(row);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
    doc.save("SalaryDetails.pdf");
  };

  return (
    <div className="dept-container">
      <Nav2 />
      <div className="dept-header">
        <h3>Salary Details</h3>

        <div className="salary-content-wrapper">
          <div className="search-add-row">
            <input
              type="text"
              placeholder="Search by Employee Name"
              className="depsearch"
              // onChange={(e) => setSearchterm(e.target.value)}
            />
            <Link to="/admin-salary-details/add" className="addbutton">
              Add Salary
            </Link>
            <button onClick={downloadPDF} className="pdfbutton">
              Download PDF
            </button>
          </div>

          <div className="tabledep">
            <table>
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Department</th>
                  <th>Net Salary</th>
                  <th>Pay Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {salary &&
                  salary.map((sal, i) => (
                    <tr key={i}>
                      <td>{sal.empid}</td>
                      <td>{sal.empdep}</td>
                      <td className="netsalary">{sal.empnetsalary}</td>
                      <td>{new Date(sal.emppaydate).toLocaleDateString()}</td>
                      <td>
                        <Link to={`/admin-salary-details/update/${sal.empid}`}>
                          <button className="salaryupdate">Update</button>
                        </Link>
                        <button
                          className="salarydelete"
                          onClick={() => deleteHandler(sal.empid)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalaryDetails;