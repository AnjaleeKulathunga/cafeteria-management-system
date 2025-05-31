const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const invenotrySchema =  new Schema({
    productID:{
        type: String,
        required: true,
    },
    productName:{
        type: String, //datatype
        required: true,  //validation
    },
    productType:{
        type: String,
        required: true,
    },
    cQuantity:{
        type: Number,
        required: true,
    },
   
    productStatus:{
        type: String,
        required: true,
        enum: ["Available", "Unavailable", "Unusable"]
    }
});

module.exports = mongoose.model(
    "inventoryModel", //filename
    invenotrySchema 
)