const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productReviewsSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    date: {
         type: Date, 
         default: Date.now }
})

module.exports = mongoose.model("Review",productReviewsSchema);