const Waste = require("../models/WastageModel");


//data display
const getWastage = async(req, res, next) =>{

    let waste;

    try{
        waste = await Waste.find();
    }catch(err){
        console.log(err);
    }

    //not found
    if(!waste){
        return res.status(404).json({message:"Waste entry not found"});
    }

    //display all waste entries
    return res.status(200).json({waste});

};

//data insert

const addWastage = async(req, res, next)=>{

    const {lossID, lossType,mealName, mealTime, wQuantity, 
        unit, category, dateOfWastage,estimatedCost, notes} = req.body;

        let waste;

        try{
            waste = new Waste({lossID, 
                               lossType,
                               mealName, 
                               mealTime, 
                               wQuantity, 
                               unit, 
                               category, 
                               dateOfWastage,
                               estimatedCost, 
                               notes});
                await waste.save();
        }catch(err){
            console.log(err);
        }

        //data not inserting
        if(!waste){
            return res.status(404).json({message:"Unable to add entry"});
        }
    
        //display all waste entries
        return res.status(200).json({waste});
    
};

//get by id

const getWasteById = async(req,res, next)=> {
    
    const id = req.params.id;

    let waste;

    try{
        waste = await Waste.findById(id);
    }catch(err){
        console.log(err);
    }
    //data not displaying
    if(!waste){
        return res.status(404).json({message:"Unable to find entry"});
    }

    //display all waste entries
    return res.status(200).json({waste});
};

//update waste entry

const updateWasteage = async(req, res, next) =>{

    const id = req.params.id;

    const {lossID, lossType,mealName, mealTime, wQuantity, 
        unit, category, dateOfWastage,estimatedCost, notes} = req.body;

    let waste;

    try{
        waste = await Waste.findByIdAndUpdate(id,
            {lossID:lossID, lossType: lossType, mealName: mealName, mealTime:mealTime, wQuantity: wQuantity, 
                unit:unit, category:category, dateOfWastage:dateOfWastage ,estimatedCost:estimatedCost, notes:notes});
        
        waste = await waste.save();
    }catch(err){
        console.log(err);
    }

    //update unsuccessful
    if(!waste){
        return res.status(404).json({message:"Update Unsuccessfull"});
    }

    //display all waste entries
    return res.status(200).json({waste});
};

//delete entry
const deleteWastage = async(req, res, next ) =>{

    const id = req.params.id;

    let waste;

    try{
        waste = await Waste.findByIdAndDelete(id);
    }catch(err){
        console.log(err);
    }
    //deletion unsuccessful
    if(!waste){
        return res.status(404).json({message:"Delete Unsuccessfull"});
    }

    //display all waste entries
    return res.status(200).json({waste});
}

exports.getWastage =  getWastage;
exports.addWastage =  addWastage;
exports.getWasteById = getWasteById;
exports.updateWasteage = updateWasteage;
exports.deleteWastage = deleteWastage;