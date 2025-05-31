import React,{ useEffect, useState } from 'react'
import Nav2 from '../Nav2/Nav2'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

function EditDepartment() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchDepartments = async() => {
      try {
        const response = await axios.get(`http://localhost:8070/Departments/${id}`)
        if (response.data.success) {
          setDepartment(response.data.department);
        }
      } catch(error) {
        if(error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchDepartments();
  }, [id]);

  const handleChange = (e) => {
    setDepartment((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

 
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(department);
      sendRequest().then(()=>{
        setSuccessMessage("Department updated successfully");
        setTimeout(() => {
          navigate('/admin-departments');
        }, 1000);
      });
        
    };

    const sendRequest = async() =>{
          await axios.put(`http://localhost:8070/Departments/${id}`,{
            dep_name:String(department.dep_name),
            description:String(department.description),
         }).then(res => res.data);
     }

    
  return (
    <div className="admin-container">
      <Nav2 />
      <div className="admin-main">
        {successMessage && <div className="success-message">{successMessage}</div>}
        <form onSubmit={handleSubmit}>
          <h2>Edit Department</h2>
          
          <div>
            <label htmlFor="dep_name">Department Name</label>
            <input
              type="text"
              name="dep_name"
              value={department.dep_name || ''}
              onChange={handleChange}
              placeholder="Enter Department Name"
              required
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              value={department.description || ''}
              onChange={handleChange}
              placeholder="Description"
            />
          </div>
          <button type="submit">Edit Department</button>
        </form>
      </div>
    </div>
  )
}

export default EditDepartment