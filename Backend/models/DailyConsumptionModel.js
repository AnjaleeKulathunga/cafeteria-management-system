const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dailyConsumptionSchema = new Schema({
    consumptionID: {
        type: String,
        required: true,
        unique: true,
      },
      dateOfConsumption: {
        type: Date,
        required: true,
        default: Date.now,
      },
      mealType: {
        type: String,
        enum: ["Breakfast", "Lunch", "Dinner", "Snack"],
        required: true,
      },
      ingredientName: {
        type: String,
        required: true,
      },
      quantityUsed: {
        type: Number,
        required: true,
      },
      unit: {
        type: String,
        enum: ["kg", "g", "L", "mL", "pieces", "items"],
        required: true,
      },
      notes: {
        type: String,
        required: false,
      }
});

module.exports = mongoose.model(
    "DailyConsumptionModel",
    dailyConsumptionSchema
)