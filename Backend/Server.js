const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const Register = require("./models/Register");
const StaffUser = require("./models/UserModel");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
    next();
});

// Ensure upload directory exists
const uploadDir = './uploads/profiles';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Static file serving
app.use("/images", express.static('uploads'));
app.use("/uploads", express.static('uploads'));

// Import Routes
app.use("/users", require('./routes/UserRoute'));
app.use("/feedback", require('./routes/FeedbackRoute'));
app.use("/order", require('./routes/OrderRoute'));
app.use("/contact", require('./routes/ContactusRoute'));
app.use("/food", require('./routes/FoodRoute'));
app.use("/cart", require('./routes/CartRoute'));
app.use("/inventory", require('./routes/inventoryRoute'));
app.use("/employee", require('./routes/EmployeeRoute'));
app.use("/information", require('./routes/InformationRoute'));
app.use("/waste", require('./routes/WastageRoute'));
app.use("/ingredient", require('./routes/ReqIngredRoute'));
app.use("/consumption", require('./routes/DailyConsumptionRoute'));
app.use("/departments", require('./routes/DepartmentRoute'));
app.use("/newemployee", require('./routes/NewEmployeeRoute'));
app.use("/salaries", require('./routes/SalaryRoute'));
app.use("/leaves", require('./routes/LeaveRoute'));
app.use("/review", require('./routes/productReviewsRoute'));
app.use("/complaint", require('./routes/RouteComplaint'));

// MongoDB Connection
const MONGODB_URI = process.env.MONGO_URI || "mongodb+srv://vihangavimukthi2001:vihangavimukthi2001@cluster0.xrjkjw7.mongodb.net/hostel_caf_db?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log("✅ Connected to MongoDB successfully!");
        http.listen(8070, () => {
            console.log("🚀 Server is running on http://localhost:8070");
        });
    })
    .catch(err => {
        console.error("❌ MongoDB connection error:", err);
    });

// Registration Route
app.post("/register", async (req, res) => {
    const { name, gmail, password } = req.body;
    if (!name || !gmail || !password) {
        return res.status(400).json({ status: "error", message: "Name, gmail, and password are required" });
    }
    if (password.length < 6) {
        return res.status(400).json({ status: "error", message: "Password must be at least 6 characters" });
    }

    try {
        let existingUser = await Register.findOne({ gmail }) || await StaffUser.findOne({ gmail });
        if (existingUser) {
            return res.status(409).json({ status: "error", message: "User with this email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await Register.create({ name, gmail, password: hashedPassword, role: 'customer' });

        res.status(201).json({ status: "ok", message: "Registration successful" });
    } catch (err) {
        res.status(500).json({ status: "error", message: "Server error during registration", error: err.message });
    }
});

// Login Route
app.post("/login", async (req, res) => {
    const { gmail, password } = req.body;
    if (!gmail || !password) {
        return res.status(400).json({ status: "error", message: "Email and password are required" });
    }

    try {
        let user = await Register.findOne({ gmail }) || await StaffUser.findOne({ gmail });
        if (!user) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }

        const isPasswordValid = user.password.startsWith('$2a$') || user.password.startsWith('$2b$')
            ? await bcrypt.compare(password, user.password)
            : password === user.password;

        if (isPasswordValid) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'fallback_secret_key', { expiresIn: '1d' });
            return res.status(200).json({
                status: "ok",
                role: user.role,
                name: user.name,
                userId: user._id,
                token
            });
        } else {
            return res.status(401).json({ status: "error", message: "Incorrect password" });
        }
    } catch (err) {
        res.status(500).json({ status: "error", message: "Server error during login", error: err.message });
    }
});

// Socket.IO setup
const http = require("http").createServer(app);
const { Server } = require("socket.io");

const io = new Server(http, {
    cors: {
        origin: "*", // Replace with frontend domain in production
        methods: ["GET", "POST"]
    }
});
global.io = io;

// Example socket connection listener
io.on("connection", (socket) => {
    console.log("⚡ A user connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("🔌 A user disconnected:", socket.id);
    });

    // You can define more events here
});
