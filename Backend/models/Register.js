const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    gmail: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    age: {
        type: Number,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    department: {
        type: String,
        required: false,
    },
    employeeId: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        default: 'customer',
        enum: ['customer', 'admin', 'staff']
    }
});

module.exports = mongoose.model(
    "Register",
    registerSchema
)