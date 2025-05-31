const express = require("express");
const router = express.Router();


const Review = require("../models/productReviewsModel");

//Insert controller
const productReviewsController = require("../controllers/productReviewsController");

router.get("/",productReviewsController.getAllReview);
router.post("/",productReviewsController.addReview);
router.get("/:id",productReviewsController.getById);
router.delete("/:id", productReviewsController.deleteFeedback);


module.exports = router;