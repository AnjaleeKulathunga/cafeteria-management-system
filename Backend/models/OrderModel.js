const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId: {
      type: String,
      required: true
    },
    contact: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      studentId: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true }
    },
    items: {
      type: Array,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    specialInstructions: {
      type: String,
      required: false
    },
    status: {
      type: String,
      default: 'Pending'
    },
    orderDate: {
      type: Date,
      default: Date.now
    },
    Payment: {
      type: Boolean,
      default: true
    }
  });

module.exports = mongoose.model(
    "OrderModel",
    orderSchema
);