import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import "./i18n.js";
import Home from "./components/Home/Home";
import AddUser from "./components/AddUser/AddUser"; 
import Users from "./components/UserDetails/Users"; 
import UpdateUser from "./components/UpdateUser/UpdateUser";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import PaymentGateway from "./components/PaymentGateway/PaymentGateway";
import PaymentHistory from "./components/PaymentHistory/PaymentHistory";
import Home2 from "./components/Home2/Home2";
import Nav2 from "./components/Nav2/Nav2";
import Nav from "./components/Nav/Nav";
import Blog from "./components/Blog/Blog";
import AboutMealMate from "./components/AboutMealMate/AboutMealMate";
import { assets } from "./assets/assets";
import Menu from "./components/Menu/Menu";
import Contactus from "./components/Contactus/Contactus";
import PlaceOrde from "./components/Placeorder/PlaceOrde";
import Cart from "./components/Cart/Cart";
import UpdateFeedback from "./components/UpdateFeedback/UpdateFeedback";
import UpdateInventory from "./components/UpdateInventory/UpdateInventory";
import AddInventory from "./components/AddInventory/AddInventory";
import DisplayInventory from "./components/DisplayInventory/DisplayInventory";
import Inven from "./components/inven";
import Addemployee from "./components/AddEmployee/Addemployee";
import UpdateEmployee from "./components/UpdateEmployee/UpdateEmployee";
import Employeedetails from "./components/Employeedetails/Employeedetails";
import Profile from "./components/Profile/Profile";
import InitialNav from "./components/IntialNav/InitialNav";
import ContactusData from "./components/ContactusData/ContactusData";
import ContactusDisplay from "./components/Contactus/ContactusDisplay";
import UpdateContactus from "./components/UpdateContactus/UpdateContactus";
import MyOrders from "./components/MyOrders/MyOrders";
import { useState } from "react";
import InventDash from "./components/InventDash/InventDash";

import Waste from "./components/DisplayWaste/Waste";
import AddWaste from "./components/AddWaste/AddWaste";
import DisplayWaste from "./components/DisplayWaste/DisplayWaste";
import UpdateWaste from "./components/UpdateWaste/UpdateWaste";

import Ingredient from "./components/DisplayIngredReq/Ingredient";
import AddIngredReq from "./components/AddIngredReq/AddIngredReq";
import DisplayIngredReq from "./components/DisplayIngredReq/DisplayIngredReq";
import UpdateIngredReq from "./components/UpdateIngredReq/UpdateIngredReq";

import Consumption from "./components/DisplayConsumption/Consumption";
import AddConsumption from "./components/AddConsumption/AddConsumption";
import DisplayConsumption from "./components/DisplayConsumption/DisplayConsumption";
import UpdateConsumption from "./components/UpdateConsumption/UpdateConsumption";

import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import DepartmentList from "./components/Departments/DepartmentList";
import AddDepartment from "./components/Departments/AddDepartment";
import EditDepartment from "./components/Departments/EditDepartment";

import AddSalary from "./components/Salary/AddSalary";
import SalaryDetails from "./components/Salary/SalaryDetails";
import UpdateSalary from "./components/Salary/UpdateSalary";

import LeaveTable from "./components/Leave/LeaveTable";
import AddEmpLeave from "./components/EmpLeave/AddEmpLeave";
import EmpLeaveList from "./components/EmpLeave/EmpLeaveList";
import UpdateLeave from "./components/EmpLeave/UpdateLeave";

import EmployeeList from "./components/NewEmployee/EmployeeList";
import EmployeeAdd from "./components/NewEmployee/EmployeeAdd";
import EmployeeEdit from "./components/NewEmployee/EmployeeEdit";
import ViewEmployee from "./components/NewEmployee/ViewEmployee";

import Feedback from "./components/Feedback/Feedback";
import FeedbackDetails from "./components/FeedbackDetails/FeedbackDetails.js"
import AddFeedback from "./components/AddFeedback/AddFeedback";
import ComplaintAdd from "./components/ComplaintAdd/complaintAdd";
// import ComplaintDetails from "./components/ComplaintDetails/ComplaintDetails";

import FeedbackTrends from "./components/Admin_Feedback/FeedbackTrend";
import AdminFeedbackDetails from "./components/Admin_Feedback/AdminFeedbackDetails";
import AdminFeedbackView from "./components/Admin_Feedback/AdminFeedbackView";
import ComplaintDetails from "./components/ComplaintDetails/complaintDetaills";
import ComplaintTableDetails from "./components/AdminComplaint/ComplaintTableDetails";
import ComplaintView from "./components/AdminComplaint/ComplaintView";
import ComplaintUpdate from "./components/complaintUpdate/complaintUpdate.js";
import Complaint from "./components/Complaint/Complaint";
// import ComplaintUpdate from "./component/ComplaintUpdate/complaintUpdate";
// import ComplaintTableDetails from "./component/AdminComplaint/ComplaintTableDetails";
// import ComplaintView from "./component/AdminComplaint/ComplaintView";
// import AdminFeedbackDetails from "./component/Admin_Feedback/AdminFeedbackDetails";
// import AdminFeedbackView from "./component/Admin_Feedback/AdminFeedbackView";
// import FeedbackTrends from "./component/Admin_Feedback/FeedbackTrend";
import ComplaintReportPage from "./components/AdminComplaint/ComplaintReportPage";

// Protected Route wrapper for admin/staff pages
const AdminRoute = ({ children }) => {
  const userRole = localStorage.getItem("userRole");
  if (userRole === "admin" || userRole === "staff") {
    return children;
  }
  return <Navigate to="/log" />;
};

// Protected Route wrapper for user pages
const UserRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (token) {
    return children;
  }
  return <Navigate to="/log" />;
};

function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          <Route
            path="/"
            element={
            <>
              <Home showNav={false} />
            </>
            }
          />

          {/* User Routes - Nested under Nav layout */}
          <Route
            path="/"
            element={
              <UserRoute>
                <Nav />
              </UserRoute>
            }
          >
            <Route path="mainhome" element={<Home showNav={false} />} />
            <Route path="profile" element={<Profile />} />
            <Route path="menu" element={<Menu />} />
            <Route path="contactus" element={<Contactus />} />
            <Route path="cart" element={<Cart />} />
            <Route path="placeorder" element={<PlaceOrde />} />
            <Route path="myorders" element={<MyOrders />} />
            <Route path="payment" element={<PaymentGateway />} />
            <Route path="payment-history" element={<PaymentHistory />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="addfeedback" element={<AddFeedback />} />
            <Route path="complaintdetails" element={<ComplaintDetails />} />
            <Route path="addNewComplaint" element={<ComplaintAdd />} />
            <Route path="complaintupdate/:id" element={<ComplaintUpdate />} />
            <Route path="ContactusDisplay" element={<ContactusDisplay />} />
            <Route path="updatecontactus/:id" element={<UpdateContactus />} />
          </Route>

          {/* Admin/Staff Routes - Nested under Nav2 layout */}
          <Route
            path="/"
            element={
            <AdminRoute>
              <Nav2 />
            </AdminRoute>
            }
          >
            <Route path="home2" element={<Home2 />} />
            <Route path="menu" element={<Menu />} />
            <Route path="userdetails" element={<Users />} />
            <Route path="adduser" element={<AddUser />} />
            <Route path="updateuser/:id" element={<UpdateUser />} />
            <Route path="profile" element={<Profile />} />
            {/* <Route path="Inventorydashboard" element={<Inven />} /> */}
            <Route path="adminfeedback" element={<AdminFeedbackDetails />} />
            <Route path="admincomplaintTable" element={<ComplaintTableDetails />} />
            <Route path="ContactusDisplay" element={<ContactusDisplay />} />
            <Route path="admin-dashboard" element={<AdminDashboard />} />
            
            <Route path="/dashboard" element = {<InventDash/>} />

            <Route path="/displayinventory" element={<Inven/>} />
            <Route path="/addProduct" element={<AddInventory/>} />
            <Route path="/inven" element={<DisplayInventory/>} />
            <Route path="/inven/:id" element={<UpdateInventory/>} />

            <Route path="/displayFirst" element={<Waste/>}/>
            <Route path="/addWaste" element={<AddWaste/>}/>
            <Route path="/displayWaste" element={<DisplayWaste/>}/>
            <Route path="/displayWaste/:id" element={<UpdateWaste/>}/>
            
            <Route path="/displayOne" element={<Ingredient/>}/>
            <Route path="/addIngredient" element={<AddIngredReq/>}/>
            <Route path="/displayIngredient" element={<DisplayIngredReq/>}/>
            <Route path="/displayIngredient/:id" element={<UpdateIngredReq/>}/>

            <Route path="/displayBegin" element={<Consumption/>}/>
            <Route path="/addConsumption" element={<AddConsumption/>}/>
            <Route path="/displayConsumption" element={<DisplayConsumption/>}/>
            <Route path="/displayConsumption/:id" element={<UpdateConsumption/>}/>
            
            {/* <Route path="addinventory" element={<AddInventory />} />
            <Route path="displayinventory" element={<DisplayInventory />} />
            <Route path="updateinventory/:id" element={<UpdateInventory />} /> */}
            <Route path="addemployee" element={<Addemployee />} />
            <Route path="employeedetails" element={<Employeedetails />} />
            <Route path="updateemployee/:id" element={<UpdateEmployee />} />
            <Route path="updatefeedback/:id" element={<UpdateFeedback />} />
            <Route path="updatecontactus/:id" element={<UpdateContactus />} />
            <Route path="view/:id" element={<ComplaintView/>}/>
            <Route path="viewfeed/:id" element={<AdminFeedbackView />} />
            <Route path="feedbacktrends" element={<FeedbackTrends />} />
            <Route path="complaintReport" element={<ComplaintReportPage />} />
            <Route path="add-leave" element={<AddEmpLeave />} />
            <Route path="emp/:empid/emp-leave" element={<EmpLeaveList />} />
            <Route path="update-leave/:id" element={<UpdateLeave />} />
            <Route path="leave-details" element={<LeaveTable />} />
            <Route path="admin-salary-details/add" element={<AddSalary />} />
            <Route path="admin-salary-details" element={<SalaryDetails />} />
            <Route path="admin-salary-details/update/:id" element={<UpdateSalary />} />
            <Route path="admin-departments" element={<DepartmentList />} />
            <Route path="admin-dashboard/add-department" element={<AddDepartment />} />
            <Route path="admin-dashboard/department/:id" element={<EditDepartment />} />
          </Route>

          {/* Public Routes */}
          <Route path="/regi" element={<Register />} />
          <Route path="/log" element={<Login />} />
          <Route path="/about" element={<AboutMealMate />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/feedbackdetails" element={<FeedbackDetails />} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
