const Feedback = require("../models/FeedbackModel");

// Get all feedback
const getAllFeedback = async (req, res, next) => {
    let feedback;
    try {
        feedback = await Feedback.find();
    } catch (err) {
        console.log(err);
    }

    if (!feedback) {
        return res.status(404).json({ message: "Feedback Not Found" });
    }

    return res.status(200).json({ feedback });
};

// Insert feedback
const addFeedback = async (req, res, next) => {
    const { idNo, name, email, userType, feedbackType, rating, description } = req.body;
    let feedback;

    try {
        feedback = new Feedback({ idNo, name, email, userType, feedbackType, rating, description });
        await feedback.save();
    } catch (err) {
        console.log(err);
    }

    if (!feedback) {
        return res.status(400).json({ message: "Unable to add feedback" });
    }
    return res.status(201).json({ feedback });
};

// Get feedback by ID
const getById = async (req, res, next) => {
    const id = req.params.id;
    let feedback;

    try {
        feedback = await Feedback.findById(id);
    } catch (err) {
        console.log(err);
    }

    if (!feedback) {
        return res.status(404).json({ message: "Feedback not found" });
    }
    return res.status(200).json({ feedback });
};

// Update feedback
const updateFeedback = async (req, res, next) => {
    const id = req.params.id;
    const { idNo, name, email, userType, feedbackType, rating, description } = req.body;
    let feedback;

    try {
        feedback = await Feedback.findByIdAndUpdate(
            id,
            { idNo, name, email, userType, feedbackType, rating, description },
            { new: true } // Ensures it returns the updated document
        );
    } catch (err) {
        console.log(err);
    }

    if (!feedback) {
        return res.status(400).json({ message: "Unable to update feedback" });
    }
    return res.status(200).json({ feedback });
};

// Delete feedback
const deleteFeedback = async (req, res, next) => {
    const id = req.params.id;
    let feedback;

    try {
        feedback = await Feedback.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
    }

    if (!feedback) {
        return res.status(400).json({ message: "Unable to delete feedback" });
    }
    return res.status(200).json({ message: "Feedback deleted successfully" });
};

// Export controllers
exports.getAllFeedback = getAllFeedback;
exports.addFeedback = addFeedback;
exports.getById = getById;
exports.updateFeedback = updateFeedback;
exports.deleteFeedback = deleteFeedback;