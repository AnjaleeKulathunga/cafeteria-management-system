const Food= require("../models/FoodModel");
const fs = require("fs"); 

//add food Items
const addfood= async(req ,res)=>{

    if (!req.file) {
        return res.status(400).json({ success: false, message: "Image upload failed" });
    }
    let image_filename = `${req.file.filename}`;
        const food= new Food({
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            category:req.body.category,
            image:image_filename 
        });

        try{
        await food.save();
        return res.status(201).json({success:true,message: 'Food added',food});

    }catch(error){
        console.log(error)
         res.json({success:false,message:"Error"});
    }

}

//all food list
const listfood= async(req,res)=>{

    try{
        const foods= await Food.find({});
        res.json({success:true, data:foods})

    }catch(error){
        console.log(error);
        res.json({success:false, message:"Error"})

    }

}

const getFoodById = async (req, res) => {
    const id = req.params.id;
    try {
        const food = await Food.findById(id);
        if (!food) {
            return res.status(404).json({ message: 'Food Not Found' });
        }
        return res.status(200).json({ food }); 
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: err.message }); 
    }
};


//remove food item
const removeFood= async(req,res) =>{
    const id = req.params.id;
    try{
        const food=await Food.findById(id);
       fs.unlink(`uploads/${food.image}`,()=>{})

        await Food.findByIdAndDelete(id);
        res.json({success:true,message:"Food Removed"})

    }catch(err){
        console.log(err);
        res.json({success:false, message:"Error"})

    }

}

exports.addfood=addfood;
exports.listfood=listfood;
exports.getFoodById=getFoodById;
exports.removeFood=removeFood;