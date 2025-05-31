const express = require('express');
const router = express.Router();
const informationController = require('../controllers/InformationController');

router.get('/', informationController.getAllInformation);
router.get('/:id', informationController.getInformationById);
router.post('/create', informationController.createInformation);
router.put('/:id', informationController.updateInformation);
router.delete('/:id', informationController.deleteInformation);

module.exports = router;