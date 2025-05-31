//const express = require("express");
//import multer from "multer";
const express = require("express");
const multer = require("multer");
const router = express.Router();



//Insert Model
const Food= require("../models/FoodModel");

//Insert Controller
const FoodController= require("../controllers/FoodController");
//Image storage engin
const storage= multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)

    }
})

const upload= multer({storage:storage})


router.post('/add',upload.single("image"),FoodController.addfood);
router.get('/list',FoodController.listfood );
router.get('/:id',FoodController.getFoodById );
router.delete('/:id',FoodController.removeFood);



//export
module.exports= router;