const express = require('express');
const router = express.Router();
const ControllerComplaint = require('../controllers/ControllerComplaint');

router.get('/', ControllerComplaint.getAllComplaint);
router.post('/', ControllerComplaint.addComplaint);
router.get('/:id', ControllerComplaint.getById);
router.delete('/:id', ControllerComplaint.deleteComplaint);
router.put('/:id', ControllerComplaint.updateComplaint);

module.exports = router;