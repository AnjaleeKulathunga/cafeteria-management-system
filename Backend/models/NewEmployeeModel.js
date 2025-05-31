const mongoose = require("mongoose");

const newemployeeSchema = new mongoose.Schema({
    empname: {type:String, required: true},
    empid: {type:String, required: true, unique:true},
    empemail: {type:String, required: true},
    empphone: {type:Number, required: true},
    empdob: {type:Date, required: true},
    empgender: {type:String, required: true},
    empplace: {type:String, required: true},
    empdep: {type:String, required: true},
    empsalary: {type:Number},
    emppassword: {type:String, required: true},
    emprole: {type:String, required: true},
})

module.exports=mongoose.model(
    "NewEmployeeModel", //filename
    newemployeeSchema //function name
)