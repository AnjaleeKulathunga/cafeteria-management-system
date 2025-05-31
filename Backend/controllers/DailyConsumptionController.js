const Consumption = require("../models/DailyConsumptionModel");


//data display
const getConsumption = async(req, res, next) =>{

    let consumption;

    try{
        consumption = await Consumption.find();
    }catch(err){
        console.log(err);
    }

    //not found
    if(!consumption){
        return res.status(404).json({message:"Consumption entry not found"});
    }

    //display all waste entries
    return res.status(200).json({consumption});

};

//data insert

const addConsumption = async(req, res, next)=>{

    const {consumptionID, dateOfConsumption, mealType, ingredientName, quantityUsed, 
        unit, notes} = req.body;

        let consumption;

        try{
            consumption = new Consumption({consumptionID, dateOfConsumption, mealType, ingredientName, quantityUsed, 
                unit, notes});
                await consumption.save();
        }catch(err){
            console.log(err);
        }

        //data not inserting
        if(!consumption){
            return res.status(404).json({message:"Unable to add entry"});
        }
    
        //display all waste entries
        return res.status(200).json({consumption});
    
};

//get by id

const getConsumptionById = async(req,res, next)=> {
    
    const id = req.params.id;

    let consumption;

    try{
        consumption = await Consumption.findById(id);
    }catch(err){
        console.log(err);
    }
    //data not displaying
    if(!consumption){
        return res.status(404).json({message:"Unable to find entry"});
    }

    //display all waste entries
    return res.status(200).json({consumption});
};

//update waste entry

const updateConsumption = async(req, res, next) =>{

    const id = req.params.id;

    const {consumptionID, dateOfConsumption, mealType, ingredientName, quantityUsed, 
        unit, notes} = req.body;

    let consumption;

    try{
        consumption = await Consumption.findByIdAndUpdate(id,
            {consumptionID: consumptionID, dateOfConsumption: dateOfConsumption, mealType: mealType, ingredientName: ingredientName, quantityUsed: quantityUsed, 
                unit:unit, notes:notes});
        
        consumption = await consumption.save();
    }catch(err){
        console.log(err);
    }

    //update unsuccessful
    if(!consumption){
        return res.status(404).json({message:"Update Unsuccessfull"});
    }

    //display all waste entries
    return res.status(200).json({consumption});
};

//delete entry
const deleteConsumption = async(req, res, next ) =>{

    const id = req.params.id;

    let consumption;

    try{
        consumption = await Consumption.findByIdAndDelete(id);
    }catch(err){
        console.log(err);
    }
    //deletion unsuccessful
    if(!consumption){
        return res.status(404).json({message:"Delete Unsuccessfull"});
    }

    //display all waste entries
    return res.status(200).json({consumption});
}

exports.getConsumption =  getConsumption;
exports.addConsumption =  addConsumption;
exports.getConsumptionById = getConsumptionById;
exports.updateConsumption = updateConsumption;
exports.deleteConsumption = deleteConsumption;