const { response } = require("express");
const Employee = require("../models/EmployeeModel");

//data display
const getAllEmployees = async (req,res,next)=>{  //create function to display details

    let Employees; //create variable

    //get all users..just check whether there are employees
    try{
        Employees = await Employee.find();
    }catch(err){
        console.log(err)
    }
    //not found
    if(!Employees){
        return res.status(404).json({message:"Employee not found"})
    }
    //display all users
    return res.status(200).json({Employees})
};


//insert data
const addEmployees=async(req,res,next)=>{
    const {empId,name,email,age,address,empType,phoneNumber} = req.body;
    let employees;

    try{
        employees=new Employee({empId,name,email,age,address,empType,phoneNumber});
        await employees.save();
    }catch (err){
        console.log(err);
    }

    //not insert employees
    if(!employees){
        return res.status(404).json({message:"unable to add employees"});
    }
    return res.status(200).json({employees});
};

  //Get By Id
  const getById=async(req,res,next)=>{

    const id=req.params.id;

    let employee;

    try{
        employee = await Employee.findById(id);
    }catch(err){
        console.log(err);
    }
    //not available employees
    if(!employee){
        return res.status(404).json({message:"Employee not found"});
    }
    return res.status(200).json({employee});
  };

  //update employee details
  const updateEmployee = async(req,res,next) =>{
    const id=req.params.id;
    const {empId,name,email,age,address,empType,phoneNumber} = req.body;

    let employees;

    try{
        employees=await Employee.findByIdAndUpdate(id,
            {empId:empId,name:name,email:email,age:age,address:address,empType:empType,phoneNumber:phoneNumber});
            employees = await employees.save();
    }catch(err){
        console.log(err);
    }
    if(!employees){
        return res.status(404).json({message:"Unable to update employee details"});
    }
    return res.status(200).json({employees});
  };

  //delete employee
  const deleteEmployee = async(req,res,next)=>{
    
    const id=req.params.id;
    
    let employee;

    try{
        employee=await Employee.findByIdAndDelete(id)
    }catch(err){
        console.log(err);
    }
    if(!employee){
        return res.status(404).json({message:"Unable to delete employee details"});
    }
    return res.status(200).json({employee});
  };

exports.getAllEmployees=getAllEmployees;
exports.addEmployees=addEmployees;
exports.getById=getById;
exports.updateEmployee=updateEmployee;
exports.deleteEmployee=deleteEmployee;