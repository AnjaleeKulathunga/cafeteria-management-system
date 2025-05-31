const Inventory = require('../models/inventoryModel'); // ✅ Corrected path

//data display
const getInventory = async(req, res, next)=> {

    let inventory;
    //get invenotry
    try{
        inventory = await Inventory.find();
    }catch(err){
        console.log(err);
    }

    //not found
    if(!inventory){
        return res.status(404).json({message: "Inventory not found"});
    }

    //display inventory
    return res.status(200).json({inventory});
};

//data insert
const addInventory = async(req, res, next) =>{

    const {productID, productName, productType, cQuantity, productStatus} = req.body;

    let inventory;

    try{
        inventory = new Inventory({productID, productName, productType, cQuantity,productStatus});
        await inventory.save();
    }catch (err){
        console.log(err);
    }

    //insert not working
    if(!inventory){
        return res.status(404).send({message: "Unable to add inventory"});
    }
    return res.status(200).json({inventory});
};

//Get by ID
const getById = async (req,res,next) =>{
    
    const id = req.params.id;

    let inventory;

    try{
        inventory = await Inventory.findById(id);
    }catch (err){
        console.log(err);
    }
    //product not found
    if(!inventory){
        return res.status(404).send({message: "Product Not Found"});
    }
    return res.status(200).json({inventory});
};

//update inventory

const updateInventory = async (req,res,next) =>{

    const id = req.params.id;
    const {productID, productName, productType, cQuantity, productStatus} = req.body;
    
    let inventory;

    try{
        inventory = await Inventory.findByIdAndUpdate(id,
            {productID: productID , productName: productName, productType: productType , cQuantity: cQuantity , productStatus: productStatus });
            inventory = await inventory.save();
    }catch(err){
        console.log(err);
    }

    //update unsuccessful
    if(!inventory){
        return res.status(404).send({message: "Unable to Update product details"});
    }
    return res.status(200).json({inventory});
};

//delete
const deleteInventory = async (req,res,next) =>{

    const id = req.params.id;

    let inventory; 

    try{
        inventory = await Inventory.findByIdAndDelete(id)
    }catch(err){
        console.log(err);
    }
    //deletion unsuccessful
    if(!inventory){
        return res.status(404).send({message: "Unable to delete product details"});
    }
    return res.status(200).json({inventory});
}

exports.getInventory = getInventory;
exports.addInventory = addInventory;
exports.getById = getById;
exports.updateInventory = updateInventory;
exports.deleteInventory = deleteInventory;