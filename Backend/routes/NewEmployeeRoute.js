const express = require("express")
const router = express.Router();
const NewEmployee = require("../models/NewEmployeeModel")
const newempController = require("../controllers/NewEmployeeController")


// GET - Get employees by department name
router.get('/department/:deptName', newempController.fetchemployeebyDepName);

router.get("/newemployee/count", async (req, res) => {
  try {
    const employeeCount = await NewEmployee.countDocuments(); // Get the number of employees
    res.json({ success: true, count: employeeCount }); // Send count back in response
  } catch (err) {
    console.error('Error fetching employee count:', err);
    res.status(500).json({ success: false, error: 'get employee server error' });
  }
});

// POST - Add new department
router.post('/', newempController.addemployee)
// GET - Get all departments
router.get('/', newempController.getemployee)
// // GET - Get single department
router.get('/:id', newempController.getByIDEmployee)


module.exports = router;