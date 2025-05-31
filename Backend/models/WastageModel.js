const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wastageSchema =  new Schema({
    lossID: {
        type: String,
        required: true,
        unique: true 
    },
    lossType: {
        type: String,
        enum: ["Spoiled", "Expired", "Leftovers", "Overcooked", "Preparation Error", "Plate Waste", "Other"],
        required: true
    },
    mealName: {
        type: String,
        required: true
    },
    mealTime: {
        type: String,
        enum: ["Breakfast", "Lunch", "Dinner","Other"],
        required: true
    },
    wQuantity: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        enum: ["kg", "g", "L", "mL", "items", "servings", "plates"],
        required: true
    },
    category: {
        type: String,
        enum: ["Vegetables", "Fruits", "Meat", "Dairy", "Grains", "Cooked Food", "Bakery", "Other"],
        required: true
    },
    dateOfWastage: {
        type: Date,
        default: Date.now
    },
    estimatedCost: {
        type: Number,
        required: false
    },
    
    notes: {
        type: String,
        required: false
    }
});


module.exports = mongoose.model(
    "WastageModel", //filename
    wastageSchema  //function name
)