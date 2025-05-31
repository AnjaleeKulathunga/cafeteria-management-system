const express = require("express")
const router = express.Router();
const Leave = require("../models/LeaveModel")
const LeaveController = require("../controllers/LeaveController")

router.post("/",LeaveController.addleaves);
router.get("/pending/count", LeaveController.getPendingLeaveCount);
router.get("/",LeaveController.getAllLeaves);
router.get("/emp/:empid",LeaveController.getByIDleave);
router.put("/update/:id", LeaveController.updateLeave);
// router.delete("/emp/:empid",LeaveController.deleteLeave);
router.put("/:id/status", LeaveController.updateLeaveStatus);
// router.get("/:id", LeaveController.getLeaveByID);
router.delete("/delete/:id",LeaveController.deleteLeave);
router.get("/:id", LeaveController.getLeaveById);


module.exports = router;