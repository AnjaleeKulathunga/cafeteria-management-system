const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    empId:{
        type:String,
        required:true,
    },
    name:{
        type:String, //datatype
        required:true, //validate
    },
    email:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    empType:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:Number,
        required:true,
    }
});

module.exports=mongoose.model(
    "EmployeeModel", //filename
    employeeSchema //function name
)