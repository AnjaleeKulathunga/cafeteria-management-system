const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const leaveSchema = new Schema({
    empid: {type: String, required: true},
    leavetype: {type: String, required: true},
    leavefrom: {type: Date, required: true},
    leaveto: {type: Date, required: true},
    leavedescription: {type: String, required: true},
    applieddate: {type:Date, default:Date.now},
    status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
})

module.exports = mongoose.model(
    "LeaveModel",
    leaveSchema
)