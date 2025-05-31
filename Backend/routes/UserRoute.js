const express = require('express');
const router = express.Router();

// Import controller and middleware
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middleware/auth');

// Route to get all users
router.get("/", UserController.getAllUsers);

// Route to add a new user
router.post("/", UserController.addUsers);

// Route to get a user by ID
router.get("/:id", UserController.getById);

// Route to update a user by ID
router.put("/:id", UserController.updateUser);

// Route to delete a user by ID
router.delete("/:id", UserController.deleteUser);

// Route to login
router.post("/login", UserController.loginUser);

// Route to update profile (protected)
router.put('/profile/:userId', authMiddleware, UserController.updateUserProfile);

module.exports = router;
