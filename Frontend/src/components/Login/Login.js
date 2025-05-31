import React, { useState, useContext } from "react"; // Added useContext
import { useNavigate } from "react-router-dom";
import Nav from "../IntialNav/InitialNav";
import axios from "axios";
import "./Login.css";
import { StoreContext } from '../context/StoreContext'; // Import StoreContext

function Login() {
  const navigate = useNavigate();
  const { setToken, user: userCon, setUser: setUserCon, userLogin } = useContext(StoreContext); // Get setToken from context
  const [user, setUser] = useState({
    gmail: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    gmail: "",
    password: ""
  });

  const validateInputs = () => {
    let tempErrors = {};
    let isValid = true;

    // Email validation
    if (!user.gmail) {
      tempErrors.gmail = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.gmail)) {
      tempErrors.gmail = "Please enter a valid email address";
      isValid = false;
    }

    // Password validation
    // if (!user.password) {
    //   tempErrors.password = "Password is required";
    //   isValid = false;
    // } else if (user.password.length < 6) {
    //   tempErrors.password = "Password must be at least 6 characters long";
    //   isValid = false;
    // } else if (!/[A-Z]/.test(user.password)) {
    //   tempErrors.password = "Password must contain at least one uppercase letter";
    //   isValid = false;
    // } else if (!/[a-z]/.test(user.password)) {
    //   tempErrors.password = "Password must contain at least one lowercase letter";
    //   isValid = false;
    // } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(user.password)) {
    //   tempErrors.password = "Password must contain at least one special character";
    //   isValid = false;
    // }

    setErrors(tempErrors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    try {
      const response = await sendRequest();

      // Updated to handle response from UserController.loginUser
      if (response.data && response.data.success && response.data.token) {
        console.log("Login successful, token from backend:", response.data.token);

        // Store token and user info in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userRole', response.data.role);
        localStorage.setItem('userName', response.data.name || 'User'); // Fallback name
        localStorage.setItem('userEmail', user.gmail); 
        localStorage.setItem('userId', response.data.userId);
        
        // Update token in StoreContext
        console.log("Calling setToken from context with token:", response.data.token);
        userLogin({
            token: response.data.token,
            role: response.data.role,
            userId: response.data.userId,
            name: response.data.name,
            email: user.gmail
        });
        setToken(response.data.token); 
        
        alert(`Welcome ${response.data.name || 'User'}!`);
        
        // Navigate based on role
        if (response.data.role === "admin" || response.data.role === "staff") {
          navigate("/home2");
        } else {
          navigate("/"); 
        }
      } else {
        // Handle login failure
        let errorMessage = "Invalid credentials or server error.";
        if (response.data && response.data.message) {
            errorMessage = response.data.message;
        }
        console.error("Login failed. Response:", response.data);
        setErrors({
          gmail: errorMessage,
          password: "" 
        });
      }
    } catch (err) {
      console.error("Login error (catch block):", err);
      let detailedErrorMessage = "Login failed due to a network or server error. Please try again.";
      if (err.response && err.response.data && err.response.data.message) {
        detailedErrorMessage = err.response.data.message;
      } else if (err.message) {
        detailedErrorMessage = err.message;
      }
      setErrors({
        gmail: detailedErrorMessage,
        password: ""
      });
    }
  };

  const sendRequest = async () => {
    // Change to use the /users/login endpoint defined in UserRoute.js
    return await axios.post("http://localhost:8070/users/login", {
      gmail: user.gmail,
      password: user.password,
    });
  };

  return (
    <div className="signin-container">
      <Nav />
      <div className="signin-header">
        <h1>Welcome Back</h1>
      </div>

      <div className="signin-form-container">
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="signin-form-group">
            <label>Email</label>
            <input
              type="email"
              name="gmail"
              value={user.gmail}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
              autoComplete="new-password"
            />
            {errors.gmail && <span className="signin-error-message">{errors.gmail}</span>}
          </div>

          <div className="signin-form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
              autoComplete="new-password"
            />
            {errors.password && <span className="signin-error-message">{errors.password}</span>}
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
