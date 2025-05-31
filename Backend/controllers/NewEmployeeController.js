const{response} = require("express");
const NewEmployee = require("../models/NewEmployeeModel");
// const { createSearchIndex } = require("../models/DepartmentModel");

const addemployee = async(req,res,next) =>{
    const{empname,empid,empemail,empphone,empdob,empgender,empplace,empdep,empsalary,emppassword,emprole} = req.body;

    let newemployee;

    try{
         newemployee=new NewEmployee({empname,empid,empemail,empphone,empdob,empgender,empplace,empdep,empsalary,emppassword,emprole});
            await newemployee.save();
        }catch (err){
            console.log(err);
            return res.status(500).json({message:"Error adding employee", error: err.message})
        }
    
        //not insert employees
        if(!newemployee){
            return res.status(404).json({message:"unable to add employees"});
        }
        return res.status(200).json({newemployee});

};

const getemployee= async(req,res,next) =>{
    try{
        const newemployee = await NewEmployee.find()
        return res.status(200).json({success:true, newemployee})
    }catch(error){
        return res.status(500).json({success:false, error: "add employee server error"})
    }
}

const getByIDEmployee= async(req,res,next) =>{
    const {id} = req.params;
    try{
        const newemployee = await NewEmployee.findById(id)
        if (!newemployee) {
            return res.status(404).json({ success: false, error: "Employee not found" });
        }
        return res.status(200).json({success:true, employee:newemployee})
    }catch(error){
        return res.status(500).json({success:false, error: "get employee server error"})
    }
}

const fetchemployeebyDepName = async (req, res) => {
  const { deptName } = req.params;
  try {
    const employees = await NewEmployee.find({ empdep: deptName });
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Error fetching employees by department" });
  }
};

exports.addemployee=addemployee;
exports.getemployee=getemployee;
exports.getByIDEmployee=getByIDEmployee;
exports.fetchemployeebyDepName=fetchemployeebyDepName;