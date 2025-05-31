const express = require("express")
const router = express.Router();
const Salary = require("../models/SalaryModel")
const SalaryController = require("../controllers/SalaryController")

// POST - Add new salary
// router.post('/', SalaryController.addsalary)
router.get("/",SalaryController.getAllSalaries);
router.get("/emp/:empidd", SalaryController.getByIDSalary);
router.post("/",SalaryController.addSalaries);
router.delete("/emp/:empid",SalaryController.deleteSalaries);
router.put("/emp/:empid", SalaryController.updateSalary);

module.exports = router;