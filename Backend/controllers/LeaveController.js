const Leave = require("../models/LeaveModel");
const {response} = require("express")

const getAllLeaves = async(req,res,next) =>{
    let leaves;

    try{
        leaves = await Leave.find();
    }catch(err){
        console.log(err);
    }

    if(!leaves){
        return res.status(404).json({message:"leave not found"})
    }

    //Display all leaves
    return res.status(200).json({leaves});
};
const addleaves = async(req,res,next) =>{
    const {empid,leavetype,leavefrom,leaveto,leavedescription,applieddate} = req.body;

    let leaves;
    try{
        leaves=new Leave({empid,leavetype,leavefrom,leaveto,leavedescription,applieddate});
        await leaves.save();
    }catch(err){
        console.log(err);
    }

    if(!leaves){
        return res.status(404).json({message:"Unable to add leaves"});
    }
    return res.status(200).json({leaves});
};



const getByIDleave = async (req, res, next) => {
    const empid = req.params.empid;

    let leaves;
    try {
        leaves = await Leave.find({ empid: empid }); // Use find() to get all leaves
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error fetching leaves" });
    }

    if (!leaves || leaves.length === 0) {
        return res.status(404).json({ message: "No leaves found for this employee" });
    }

    return res.status(200).json({ leaves });
};


const deleteempleave = async (req, res) => {
  try {
    const updatedLeave = await Leave.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedLeave) return res.status(404).json({ message: "Leave not found" });
    return res.status(200).json({ leave: updatedLeave });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to update leave" });
  }
};
const deleteLeave = async(req,res,next) =>{

const leaveId = req.params.id;

let leave;
try {
  leave = await Leave.findByIdAndDelete(leaveId);
} catch (err) {
  console.log(err);
  return res.status(500).json({ message: "Server error while deleting" });
}

if (!leave) {
  return res.status(404).json({ message: "Leave not found" });
}
return res.status(200).json({ message: "Leave deleted successfully", leave });
}


const updateLeaveStatus = async (req, res) => {
  const leaveId = req.params.id;
  const { status } = req.body;

  try {
    const leave = await Leave.findByIdAndUpdate(leaveId, { status }, { new: true });
    if (!leave) return res.status(404).json({ message: "Leave not found" });
    return res.status(200).json({ message: "Status updated", leave });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const updateLeave = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!leave) {
      return res.status(404).json({ error: "Leave not found" });
    }
    res.status(200).json({ message: "Leave updated", leave });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



const getPendingLeaveCount = async (req, res) => {
  try {
    const count = await Leave.countDocuments({ status: "Pending" });
    return res.status(200).json({ success: true, count });
  } catch (error) {
    console.error("Error fetching pending leave count:", error);
    return res.status(500).json({ success: false, error: "Error fetching pending leave count" });
  }
};

const getLeaveById = async (req, res) => {
  const leaveId = req.params.id;

  try {
    const leave = await Leave.findById(leaveId);
    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }
    return res.status(200).json({ leave });
  } catch (err) {
    console.error("Error fetching leave by ID:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getAllLeaves=getAllLeaves;
exports.addleaves=addleaves;
exports.getByIDleave=getByIDleave;
exports.updateLeave=updateLeave;
exports.deleteLeave=deleteLeave;
exports.updateLeaveStatus = updateLeaveStatus;
// exports.getLeaveByID=getLeaveByID;
exports.getPendingLeaveCount = getPendingLeaveCount;
exports.deleteempleave = deleteempleave;
exports.getLeaveById = getLeaveById;