import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Nav from '../Nav/Nav';
import './AddEmployee.css'


function Addemployee() {
  const history = useNavigate();
  const [inputs,setInputs] = useState({
    empId:"",
    name:"",
    email:"",
    age:"",
    address:"",
    empType:"",
    phoneNumber:"",
  });
  const handleChange =(e)=>{
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit =(e) =>{
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(()=>history('/employeedetails'))
  };

  const sendRequest = async() =>{
    await axios.post("http://Localhost:8070/Employee",{
      empId:String (inputs.empId),
      name:String (inputs.name),
      email:String (inputs.email),
      age:Number (inputs.age),
      address:String(inputs.address),
      empType:String (inputs.empType),
      phoneNumber:String (inputs.phoneNumber),
    }).then(res => res.data);
  }
  return (
    <div className="add-employee-page">
      <Nav/>
      <div className="add-employee-header">
        <h1>Add Employee</h1>
      </div>

      <div className="add-employee-form-container">
        <form onSubmit={handleSubmit}>
          <div className="add-employee-form-group">
            <label>Employee ID:</label>
            <input type="text" name="empId" onChange={handleChange} value={inputs.empId} required />
          </div>
          <div className="add-employee-form-group">
            <label>Name:</label>
            <input type="text" name="name" onChange={handleChange} value={inputs.name} required />
          </div>
          <div className="add-employee-form-group">
            <label>Email:</label>
            <input type="email" name="email" onChange={handleChange} value={inputs.email} required />
          </div>
          <div className="add-employee-form-group">
            <label>Age:</label>
            <input type="number" name="age" onChange={handleChange} value={inputs.age} required />
          </div>
          <div className="add-employee-form-group">
            <label>Address:</label>
            <input type="text" name="address" onChange={handleChange} value={inputs.address} required />
          </div>
          <div className="add-employee-form-group">
            <label>Employee Type:</label>
            <input type="text" name="empType" onChange={handleChange} value={inputs.empType} required />
          </div>
          <div className="add-employee-form-group">
            <label>Phone Number:</label>
            <input type="tel" name="phoneNumber" onChange={handleChange} value={inputs.phoneNumber} required />
          </div>
          <button type="submit" className="add-employee-submit-btn">SUBMIT</button>
        </form>
      </div>
      <footer className="add-employee-footer">
                <div className="add-employee-footer-content">
                    <div className="add-employee-footer-section">
                        <div className="add-employee-footer-logo">
                            <span className="add-employee-logo-icon">MEAL</span>
                            <span>mate</span>
                        </div>
                        <p className="add-employee-footer-about">
                            Your trusted partner for delicious and convenient hostel dining. We make every meal special with quality ingredients and excellent service.
                        </p>
                        <div className="add-employee-social-links">
                            <a href="#"><i className="fab fa-facebook-f"></i></a>
                            <a href="#"><i className="fab fa-twitter"></i></a>
                            <a href="#"><i className="fab fa-instagram"></i></a>
                            <a href="#"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>

                    <div className="add-employee-footer-section">
                        <h3>Quick Links</h3>
                        <ul className="add-employee-footer-links">
                            <li><a href="/">Home</a></li>
                            <li><a href="/menu">Menu</a></li>
                            <li><a href="/about">About Us</a></li>
                            <li><a href="/contact">Contact</a></li>
                        </ul>
                    </div>

                    <div className="add-employee-footer-section">
                        <h3>Services</h3>
                        <ul className="add-employee-footer-links">
                            <li><a href="/daily-meals">Daily Meals</a></li>
                            <li><a href="/special-diet">Special Diet</a></li>
                            <li><a href="/meal-plans">Meal Plans</a></li>
                            <li><a href="/quick-snacks">Quick Snacks</a></li>
                        </ul>
                    </div>

                    <div className="add-employee-footer-section">
                        <h3>Contact Info</h3>
                        <div className="add-employee-footer-contact">
                            <p><i className="fas fa-map-marker-alt"></i> Hostel Campus, University Road</p>
                            <p><i className="fas fa-phone"></i> +1 234 567 8900</p>
                            <p><i className="fas fa-envelope"></i> info@mealmate.com</p>
                            <p><i className="fas fa-clock"></i> Mon - Sun: 7:00 AM - 10:00 PM</p>
                        </div>
                    </div>
                </div>

                <div className="add-employee-footer-bottom">
                    <p>&copy; {new Date().getFullYear()} MEALmate. All rights reserved.</p>
                </div>
            </footer> 
    </div>
  )
}

export default Addemployee;