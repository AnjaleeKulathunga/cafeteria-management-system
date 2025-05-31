// controllers/productReviewsController.js

const Review = require("../models/productReviewsModel");

const getAllReview = async (req, res, next) => {
  let review;

  try {
    review = await Review.find();
  } catch (err) {
    console.log(err);
  }

  if (!review) {
    return res.status(404).json({ message: "Review Not Found" });
  }

  return res.status(200).json({ review });
};

// Insert
const addReview = async (req, res) => {
  try {
    const { name, email, rating, description } = req.body;

    const newReview = new Review({
      name,
      email,
      rating,
      description,
      date: new Date(), // ✅ Add the current date here
    });

    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: "Failed to add review", error });
  }
};

// Get by ID
const getById = async (req, res, next) => {
  const id = req.params.id;
  let review;

  try {
    review = await Review.findById(id);
  } catch (err) {
    console.log(err);
  }

  if (!review) {
    return res.status(404).json({ message: "Review not found" });
  }
  return res.status(200).json({ review });
};

const deleteFeedback = async (req, res, next) => {
  const id = req.params.id;
  let review;

  try {
    review = await Review.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }

  if (!review) {
    return res.status(400).json({ message: "Unable to delete" });
  }
  return res.status(200).json({ message: "Deleted successfully" });
};

// Export controllers after their definitions
module.exports = {
  getAllReview,
  addReview,
  getById,
  deleteFeedback,
};