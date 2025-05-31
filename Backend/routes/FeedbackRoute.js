const express = require("express");
const router = express.Router();

//insert model
const Feedback = require("../models/FeedbackModel");

//Insert controller
const FeedbackController = require("../controllers/FeedbackController");

router.get("/",FeedbackController.getAllFeedback);
router.post("/",FeedbackController.addFeedback);
router.get("/:id",FeedbackController.getById);
router.put("/:id",FeedbackController.updateFeedback);
router.delete("/:id",FeedbackController.deleteFeedback);

//export
module.exports = router;