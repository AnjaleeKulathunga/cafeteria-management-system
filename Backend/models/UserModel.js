const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    gmail: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['staff', 'admin'],
        required: true
    },
    department: { // New Department Field
        type: String,
        required: false, // Or true, depending on your requirements
    },
    employeeId: { // New Employee ID Field
        type: String,
        required: false, // Or true, depending on your requirements
    },
    cartData: {
        type: Map,
        of: Number,
        default: {}
    }
});

module.exports = mongoose.model(
    "UserModel",
    userSchema
)