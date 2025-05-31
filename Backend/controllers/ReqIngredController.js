const Ingredient = require("../models/ReqIngredModel");


//data display
const getIngredient = async(req, res, next) =>{

    let ingredient;

    try{
        ingredient = await Ingredient.find();
    }catch(err){
        console.log(err);
    }

    //not found
    if(!ingredient){
        return res.status(404).json({message:"Unable to find Request"});
    }

    //display all waste entries
    return res.status(200).json({ingredient});

};

//data insert

const addIngredientReq = async(req, res, next)=>{

    const {
        requestID,
        dateOfRequest,
        mealType,
        mealDate,
        ingredientName,
        quantityNeeded,
        unit,
        usageNote
    } = req.body;

        let ingredient;

        try{
            ingredient = new Ingredient({
                requestID,
                dateOfRequest,
                mealType,
                mealDate,
                ingredientName,
                quantityNeeded,
                unit,
                usageNote
            });
                await ingredient.save();
        }catch(err){
            console.log(err);
        }

        //data not inserting
        if(!ingredient){
            return res.status(404).json({message:"Unable to add Request"});
        }
    
        //display all waste entries
        return res.status(200).json({ingredient});
    
};

//get by id

const getIngredientReqById = async(req,res, next)=> {
    
    const id = req.params.id;

    let ingredient;

    try{
        ingredient = await Ingredient.findById(id);
    }catch(err){
        console.log(err);
    }
    //data not displaying
    if(!ingredient){
        return res.status(404).json({message:"Unable to find request"});
    }

    //display all waste entries
    return res.status(200).json({ingredient});
};

//update waste entry

const updateIngredientReq = async(req, res, next) =>{

    const id = req.params.id;

    const {
        requestID,
        dateOfRequest,
        mealType,
        mealDate,
        ingredientName,
        quantityNeeded,
        unit,
        usageNote
    } = req.body;

    let ingredient;

    try{
        ingredient = await Ingredient.findByIdAndUpdate(id,
            {
                requestID: requestID,
                dateOfRequest: dateOfRequest,
                mealType: mealType,
                mealDate: mealDate,
                ingredientName: ingredientName,
                quantityNeeded:quantityNeeded,
                unit: unit,
                usageNote:usageNote,
            });
        
        ingredient = await ingredient.save();
    }catch(err){
        console.log(err);
    }

    //update unsuccessful
    if(!ingredient){
        return res.status(404).json({message:"Update Unsuccessfull"});
    }

    //display all waste entries
    return res.status(200).json({ingredient});
};

//delete entry
const deleteIngredientReq = async(req, res, next ) =>{

    const id = req.params.id;

    let ingredient;

    try{
        ingredient = await Ingredient.findByIdAndDelete(id);
    }catch(err){
        console.log(err);
    }
    //deletion unsuccessful
    if(!ingredient){
        return res.status(404).json({message:"Delete Unsuccessfull"});
    }

    //display all waste entries
    return res.status(200).json({ingredient});
}

exports.getIngredient =  getIngredient;
exports.addIngredientReq =  addIngredientReq;
exports.getIngredientReqById = getIngredientReqById;
exports.updateIngredientReq = updateIngredientReq;
exports.deleteIngredientReq = deleteIngredientReq;