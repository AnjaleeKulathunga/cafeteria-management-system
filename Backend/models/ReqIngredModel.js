const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reqIngredSchema = new Schema({

    requestID: {
        type: String,
        required: true,
        unique: true
    },
    dateOfRequest: {
        type: Date,
        default: Date.now,
        required: true
    },
    mealType: {
        type: String,
        enum: ["Breakfast", "Lunch", "Dinner"],
        required: true
    },
    mealDate: {
        type: Date,
        required: true
    },
    ingredientName: {
        type: String,
        required: true
    },
    quantityNeeded: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        enum: ["kg", "g", "L", "mL", "pieces", "items"],
        required: true
    },
    usageNote: {
        type: String, // e.g., "for chicken curry"
        required: false
    }
});

module.exports = mongoose.model(
    "ReqIngredModel",
    reqIngredSchema
)