const mongoose =require("mongoose");
const Schema= mongoose.Schema;

const contactSchema= new Schema({
    name:{
        type:String, //data type
        required:true, //validate
    },
    email:{
        type:String,
        required:true,
    },
    Contact:{
        type:Number,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    servicetype:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    },

});

module.exports= mongoose.model(
    "ContactusModel", //file name
    contactSchema //function name
)