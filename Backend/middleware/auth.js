const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');
const Register = require('../models/Register');


// Simple middleware for testing - allows all requests through
const auth = (req, res, next) => {
    next();
};

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Authorization header missing or malformed.' });
    }

    const token = authHeader.split(' ')[1];
    console.log('[AuthMiddleware] Token received:', token); // DEBUG LOG
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');

    const userId = decoded.id;
    console.log('[AuthMiddleware] Decoded user ID from token:', userId); // DEBUG LOG
    // Try to find user in both models
    const userFromRegister = await Register.findById(userId);
    const userFromUserModel = await UserModel.findById(userId);

    if (!userFromRegister && !userFromUserModel) {
      return res.status(401).json({ success: false, message: 'User not found in either model. Unauthorized.' });
    }

    // Attach found user to req (you could choose one to attach, or both)
    req.user = userFromUserModel || userFromRegister;
    console.log('[AuthMiddleware] Attaching req.user:', req.user ? req.user._id : 'User not found after DB check'); // DEBUG LOG

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token.', error: error.message });
  }
};


module.exports = authMiddleware;
