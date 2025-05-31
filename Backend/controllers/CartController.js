const RegisterModel= require("../models/Register");
const UserModel= require("../models/UserModel");

//add to cart
const addToCart = async(req, res)=>{
    try{
        if (!req.user || !req.user._id) {
            return res.status(401).json({ success: false, message: "User not authenticated." });
        }
        const userId = req.user._id; // Use ID from authenticated user
        const { itemId } = req.body;

        let userData = await RegisterModel.findById(userId);

        if (!userData) {
            // If not found in RegisterModel, try UserModel
            userData = await UserModel.findById(userId);
        }

        if (!userData) {
            console.error(`[CartController.addToCart] User ${userId} not found in either RegisterModel or UserModel.`);
            return res.status(404).json({ success: false, message: "User record not found." });
        }

        let cartData = userData.cartData || {}; // Initialize cartData if it doesn't exist
        
        if(!cartData[itemId]) {
            cartData[itemId] = 1;
        } else {
            cartData[itemId] += 1;
        }

        userData.cartData = cartData;
        userData.markModified('cartData'); // Important for nested objects/maps
        await userData.save(); // Or use findByIdAndUpdate with the updated cartData

        res.json({success:true, message:"Added To cart"});

    }catch(error){
        console.error("[CartController.addToCart] Error:", error);
        res.status(500).json({success:false, message:"Error adding item to cart"})
    }
}


//remove item from user cart
const removeFromCart= async(req,res)=>{
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ success: false, message: "User not authenticated." });
        }
        const userId = req.user._id; // Use ID from authenticated user
        const { itemId } = req.body; // itemId is in req.body for DELETE via axios data property

        let userData = await RegisterModel.findById(userId);

        if (!userData) {
            // If not found in RegisterModel, try UserModel
            userData = await UserModel.findById(userId);
        }

        if (!userData || !userData.cartData) {
            console.error(`[CartController.removeFromCart] User ${userId} or cart not found.`);
            return res.status(404).json({ success: false, message: "User cart or item not found." });
        }

        let cartData = userData.cartData;
        
        if(cartData[itemId] > 0){
            cartData[itemId] -= 1;
            if (cartData[itemId] === 0) {
                delete cartData[itemId]; // Remove item if quantity is zero
            }
        } else {
            // Item not in cart or quantity already zero
            return res.status(400).json({success:false, message:"Item not in cart or quantity already zero"});
        }
        
        userData.cartData = cartData;
        userData.markModified('cartData');
        await userData.save();

        res.json({success:true, message:"Removed from cart"});
    } catch (error) {
        console.error("[CartController.removeFromCart] Error:", error);
        res.status(500).json({success:false, message:"Error removing item from cart"})
    }
}
//fetch user cart data
const getCart= async(req,res)=>{
    try {
        console.log("[CartController.getCart] User ID from req.user:", req.user._id);
        let userData = await RegisterModel.findById(req.user._id);

        if (!userData) {
            // If not found in RegisterModel, try UserModel
            console.log("[CartController.getCart] User not found in RegisterModel. Trying UserModel.");
            userData = await UserModel.findById(req.user._id);
        }

        console.log("[CartController.getCart] UserData found:", userData);

        if (!userData) {
            console.log("[CartController.getCart] User not found in either RegisterModel or UserModel. Returning empty cart.");
            return res.json({ success: true, cartData: {} }); // Return empty cart
        }

        let cartData = userData.cartData || {}; // Ensure cartData is at least an empty object if null/undefined
        res.json({ success: true, cartData });
    } catch (error) {
        console.error("[CartController.getCart] Error:", error);
        res.status(500).json({ success: false, message: "Error fetching cart data" });
    }
}

//export{addToCart,removeFromCart,getCart}

exports.addToCart=addToCart;
exports.removeFromCart=removeFromCart;
exports.getCart=getCart;