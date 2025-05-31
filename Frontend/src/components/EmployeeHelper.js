import axios from "axios"
import { useNavigate } from "react-router-dom";

    export const fetchEmployee = async () => {
        let newemployee
      try {
        const response = await axios.get("http://localhost:8070/newemployee");
        if (response.data.success) {
            newemployee = response.data.newemployee || [];
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
      return [];
    };

     export const fetchSalary = async () => {
        let salary
      try {
        const response = await axios.get("http://localhost:8070/salary");
        if (response.data.success) {
            salary = response.data.salary || [];
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
      return [];
    };


    export const EmployeeButtons = ({_id,empid}) => {
    const navigate = useNavigate();

    console.log("EmployeeButtons empid:", empid);

    const buttonStyle = {
    padding: '6px 10px',
    marginRight: '8px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '13px',
    cursor: 'pointer',
    color: '#fff',
  };

  const buttonGroupStyle = {
    display: 'flex',
    flexWrap: 'wrap',
  };
    return(
        <div className="empbuttons">
            <button className="viewemp" style={{ ...buttonStyle, backgroundColor: '#007bff' }} onClick={() => navigate(`/admin-employee-details/${_id}`)}>View</button>
            <button className="editemp" style={{ ...buttonStyle, backgroundColor: '#28a745' }} onClick={() => navigate(`/admin-employee-details/edit/${_id}`)}>Edit</button>
            <button className="salaryemp" style={{ ...buttonStyle, backgroundColor: '#ffc107' }} onClick={() => navigate(`/admin-employee-details/salary/${empid}`)}>Salary</button>
            <button className="leaveemp" style={{ ...buttonStyle, backgroundColor: '#dc3545' }}>Leave</button>
        </div>
    )
}


export const columns =[
    {
        name: "Employee ID",
        selector:(row) => row.empid
    },

    {
        name: "Name",
        selector:(row) => row.empname,
        sortable:true
    },
    {
        name: "Department",
        selector:(row) => row.empdep
    },
    {
        name: "BirthDate",
        selector:(row) => row.empdob
    },
    {
        name: "Actions",
        selector:(row) => row.action
    }
]


export const fetchDepartments = async () => {
        let departments
      try {
        const response = await axios.get("http://localhost:8070/Departments");
        if (response.data.success) {
            departments = response.data.departments || [];
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
      return [];
    };

    //employee for salary
export const getEmployee = async (id) => {
        let employees
      try {
        const response = await axios.get(`http://localhost:8070/Departments/employee/${id}`);
        if (response.data.success) {
            employees = response.data.employees || [];
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
      return employees;
    };