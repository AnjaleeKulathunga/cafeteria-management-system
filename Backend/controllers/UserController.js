const User = require("../models/UserModel"); // This is UserModel
const Register = require("../models/Register"); // Changed from RegisterModel to Register
const bcrypt = require('bcryptjs'); // Add bcryptjs import

const getAllUsers = async (req, res, next) => {
    let usersFromUserModel;
    let usersFromRegisterModel;

    try {
        usersFromUserModel = await User.find();
        usersFromRegisterModel = await Register.find();
    } catch (err) {
        console.error("Error fetching users:", err);
        return res.status(500).json({ message: "Error fetching users", error: err.message });
    }

    // Combine the results
    const allUsers = [...usersFromUserModel, ...usersFromRegisterModel];

    if (!allUsers || allUsers.length === 0) {
        return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json({ users: allUsers });
};

const addUsers = async (req, res, next) => {
    console.log("Received request body:", req.body);
    const { name, gmail, age, address, password, role, department, employeeId } = req.body;

    if (!name || !gmail || !age || !address || !password || !role) {
        console.log("Missing required fields:", { name, gmail, age, address, password, role });
        return res.status(400).json({ 
            message: "Missing required fields",
            received: { name, gmail, age, address, password, role }
        });
    }

    try {
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        let users = new User({
            name,
            gmail,
            age: Number(age),
            address,
            password: hashedPassword, // Use hashed password
            role,
            department,
            employeeId
        });
        
        console.log("Attempting to save user:", users);
        await users.save();
        console.log("User saved successfully:", users);
        
        return res.status(201).json({ 
            users: {
                ...users._doc,
                password: undefined // Remove password from response
            }
        });
    } catch (err) {
        console.error("Error saving user:", err);
        return res.status(400).json({
            message: "Error adding user",
            error: err.message,
            details: err
        });
    }
};

const getById = async (req, res, next) => {
    const id = req.params.id;

    let user;

    try {
        user = await User.findById(id);
    } catch (err) {
        console.log(err);
    }

    if (!user) {  
        return res.status(404).json({ message: "User not found" });  
    }

    return res.status(200).json({ user });  
};

const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const { name, gmail, age, address, role } = req.body;

    let user;

    try {
        user = await User.findByIdAndUpdate(id, { name, gmail, age, address, role }, { new: true });
    } catch (err) {
        console.log(err);
    }

    if (!user) {  
        return res.status(404).json({ message: "Unable to update user details" });
    }

    return res.status(200).json({ user }); 
};

const deleteUser = async (req, res, next) => {
    const id = req.params.id;

    let user;
    let message = "";

    try {
        user = await User.findByIdAndDelete(id);
        if (user) {
            message = "User deleted from UserModel";
        } else {
            user = await Register.findByIdAndDelete(id);
            if (user) {
                message = "User deleted from Register";
            } else {
                return res.status(404).json({ message: "User not found in either model" });
            }
        }
    } catch (err) {
        console.error("Error deleting user:", err);
        return res.status(500).json({ message: "Failed to delete user", error: err.message });
    }

    return res.status(200).json({ message: message, user: user });
};

exports.getAllUsers = getAllUsers;
exports.addUsers = addUsers;
exports.getById = getById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;

// Added loginUser function
const jwt = require('jsonwebtoken');

const loginUser = async (req, res, next) => {
    const { gmail, password } = req.body;

    if (!gmail || !password) {
        return res.status(400).json({ success: false, message: "Please provide email and password." });
    }

    try {
        // Attempt to find user in UserModel (staff/admin)
        let user = await User.findOne({ gmail });

        // If not found in UserModel, attempt to find in RegisterModel (customer)
        if (!user) {
            user = await Register.findOne({ gmail });
        }

        // If user still not found in either model
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials. User not found." });
        }

        // Check if the password is stored as hash or plain text
        let isPasswordValid = false;
        
        if (user.password.startsWith('$2a$') || user.password.startsWith('$2b$')) {
            // Password is hashed, verify it
            isPasswordValid = await bcrypt.compare(password, user.password);
        } else {
            // Legacy plain text password (temporary fallback for existing accounts)
            isPasswordValid = (user.password === password);
        }

        if (!isPasswordValid) {
            console.log(`Login attempt for ${gmail}: Password verification failed`);
             return res.status(401).json({ success: false, message: "Invalid credentials. Password incorrect." });
        }

        // User authenticated, create JWT
        // Ensure the payload includes necessary info, like _id and role (if available)
        const payload = {
            id: user._id,
            // Include role only if it exists on the user object (from UserModel)
            role: user.role ? user.role : 'customer' // Assign 'customer' role if role is not found
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET || 'fallback_secret_key_for_jwt', 
            { expiresIn: '1d' } // Changed to 1 day to match Server.js
        );

        console.log(`User ${user.gmail} logged in. Token payload being signed:`, payload);

        res.json({ 
            success: true, 
            message: "Login successful", 
            token: token,
            userId: user._id,
            role: user.role ? user.role : 'customer' // Send back the determined role
        });

    } catch (error) {
        console.error("Login server error:", error);
        res.status(500).json({ success: false, message: "Server error during login." });
    }
};

exports.loginUser = loginUser; // Added export for loginUser

// New function to update user profile (name and email)
const updateUserProfile = async (req, res) => {
    const { userId } = req.params; // Get userId from URL parameter
    const { name, email } = req.body; // Get name and email from request body

    // Security check: Ensure the authenticated user (from token) is updating their own profile
    if (req.user._id.toString() !== userId) {
        return res.status(403).json({ success: false, message: "Forbidden: You can only update your own profile." });
    }

    if (!name || !email) {
        return res.status(400).json({ success: false, message: "Name and email are required." });
    }

    try {
        let userToUpdate = null;
        let updatedInModel = null;

        // Try to find and update in Register model first
        let potentialUserInRegister = await Register.findById(userId);
        if (potentialUserInRegister) {
            potentialUserInRegister.name = name;
            potentialUserInRegister.gmail = email;
            userToUpdate = await potentialUserInRegister.save();
            updatedInModel = "Register";
        }

        // Try finding in User model as well
        let potentialUserInUserModel = await User.findById(userId);
        if (potentialUserInUserModel) {
            potentialUserInUserModel.name = name;
            potentialUserInUserModel.gmail = email;
            userToUpdate = await potentialUserInUserModel.save(); 
            updatedInModel = updatedInModel ? `${updatedInModel} & UserModel` : "UserModel";
        }
        
        if (!userToUpdate) {
            return res.status(404).json({ success: false, message: "User not found in any accessible records." });
        }

        res.json({ 
            success: true, 
            message: `Profile updated successfully (in ${updatedInModel}).`, 
            user: { // Send back the fields the frontend expects for UI update
                name: userToUpdate.name, 
                email: userToUpdate.gmail, // Send back the field name frontend uses for email (e.g., 'email' or 'gmail')
                role: userToUpdate.role, 
                _id: userToUpdate._id 
            }
        });

    } catch (error) {
        console.error("Error updating user profile:", error);
        // More specific error for duplicate email if your schema has unique constraint on email/gmail
        if (error.code === 11000) { // MongoDB duplicate key error
             return res.status(400).json({ success: false, message: "Email already in use by another account." });
        }
        res.status(500).json({ success: false, message: "Server error while updating profile." });
    }
};
exports.updateUserProfile = updateUserProfile;