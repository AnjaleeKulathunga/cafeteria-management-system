const express = require("express")
const router = express.Router();
const Department = require("../models/DepartmentModel")
// const DepartmentController = require("../controllers/DepartmentController")
const deptController = require("../controllers/DepartmentController")

// POST - Add new department
router.post('/', deptController.addDepartment)
router.get("/count", deptController.getDepartmentCount)
// GET - Get all departments
router.get('/', deptController.getDepartment)
// GET - Get single department
router.get('/:id', deptController.getByIDDepartment)
router.put('/:id', deptController.editDepartment)
router.delete('/:id', deptController.deleteDepartment)

module.exports = router;