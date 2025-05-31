const express = require("express");
const router = express.Router();
//Insert model
const Employee = require("../models/EmployeeModel")
//set emp controller
const EmployeeController = require("../controllers/EmployeeController");

router.get("/",EmployeeController.getAllEmployees);
router.post("/",EmployeeController.addEmployees);
router.get("/:id",EmployeeController.getById);
router.put("/:id",EmployeeController.updateEmployee);
router.delete("/:id",EmployeeController.deleteEmployee);

//export
module.exports=router;