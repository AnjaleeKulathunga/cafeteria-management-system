const{response} = require("express");
const Department = require("../models/DepartmentModel")

const addDepartment=async(req,res,next)=>{
    const{dep_name,description} = req.body;
    let departments;

    try{
        departments = new Department({dep_name,description})
        await departments.save()
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Error adding department", error: err.message})
    }

    if(!departments){
        return res.status(404).json({message:"unable to add department"})
    }
    return res.status(200).json({departments});
};

const getDepartment= async(req,res,next) =>{
    try{
        const department = await Department.find()
        return res.status(200).json({success:true, department})
    }catch(error){
        return res.status(500).json({success:false, error: "add department server error"})
    }
}

const getByIDDepartment = async (req, res, next) => {
    console.log("getByIDDepartment called with id:", req.params.id);
    try {
        const { id } = req.params;
        const department = await Department.findById(id); 

        if (!department) {
            return res.status(404).json({ success: false, message: "Department not found" });
        }

        return res.status(200).json({ success: true, department });
    } catch (error) {
        return res.status(500).json({ success: false, error: "get department server error" });
    }
};

const editDepartment = async (req,res,next) =>{
    try{
        const{id} = req.params;
        const {dep_name,description} =req.body;
        const updateDep = await Department.findByIdAndUpdate({_id: id}, {
            dep_name,
            description
        }) 
        return res.status(200).json({ success: true, updateDep })
    } catch (error) {
        return res.status(500).json({ success: false, error: "edit department server error" });
    }

  }

const deleteDepartment = async (req,res,next) =>{
    try{
        const{id} = req.params;
       
        const deleteDep = await Department.findByIdAndDelete(id);

        if (!deleteDep) {
      return res.status(404).json({ success: false, message: "Department not found" });
    }

        return res.status(200).json({ success: true, deleteDep })
    } catch (error) {
        return res.status(500).json({ success: false, error: "Delete department server error" });
    }

};

const getDepartmentCount = async (req, res) => {
  try {
    const count = await Department.countDocuments();
    return res.status(200).json({ success: true, count });
  } catch (error) {
    console.error("Error fetching department count:", error);
    return res.status(500).json({ success: false, error: "Error fetching department count" });
  }
};

exports.addDepartment=addDepartment;
exports.getDepartment=getDepartment;
exports.getByIDDepartment = getByIDDepartment;
exports.editDepartment=editDepartment;
exports.deleteDepartment=deleteDepartment;
exports.getDepartmentCount = getDepartmentCount;