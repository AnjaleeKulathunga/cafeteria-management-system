const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const salarySchema = new Schema({
    empdep: {type: String, required: true},
    empid: {type: String, required: true},
    empbasicsal: {type: Number, required: true},
    empallowance: {type: Number, required: true},
    empdeduction: {type: Number, required: true},
    empnetsalary: {type: Number, required: true},
    emppaydate: {type: Date, required: true},
    
})

module.exports = mongoose.model(
    "SalaryModel", //filename
    salarySchema //function name
)