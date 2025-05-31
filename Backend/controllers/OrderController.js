const OrderModel = require("../models/OrderModel");
const Order = require("../models/OrderModel");
const UserAnjaleeModel = require("../models/UserModel");
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Get order by ID
const getOrderById = async(req, res) => {
    try {
        const order = await OrderModel.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        res.json({ success: true, data: order });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching order" });
    }
};

// Update order
const updateOrder = async(req, res) => {
    try {
        const { status, specialInstructions } = req.body;
        const order = await OrderModel.findByIdAndUpdate(
            req.params.id,
            { 
                status,
                specialInstructions,
                ...(req.body.contact && { contact: req.body.contact })
            },
            { new: true }
        );
        
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        res.json({ success: true, data: order });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating order" });
    }
};

// Delete order
const deleteOrder = async(req, res) => {
    try {
        const order = await OrderModel.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        res.json({ success: true, message: 'Order deleted successfully' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error deleting order" });
    }
};

//placing user order from frontend
const createOrder = async(req, res) => {
    const frontend_url= "http://localhost:3000";

try {
    const newOrder= new OrderModel({
        userId:req.body.userId,
        contact:req.body.contact,
        items:req.body.items,
        amount:req.body.amount,
        specialInstructions:req.body.specialInstructions,
        
    })
    await newOrder.save();
    await UserAnjaleeModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

    const line_items= req.body.items.map((item)=>({
        price_data:{
            currency:"USD",
            product_data:{
                name:item.name
            },
            unit_amount:item.price*100
        },
        quantity: item.quantity
    }))

    line_items.push({
        price_data:{
            currency:"USD",
            product_data:{
                name:"Delivery charges",
            
            },
            unit_amount:0*100
        },
        quantity:1
    })

    const session = await stripe.checkout.sessions.create({
        line_items:line_items,
        mode:'payment',
        //  success_url:${frontend_url}/verify?success=true&orderId=${newOrder._id},
        success_url:`${frontend_url}/myorders`,
        // cancel_url:${frontend_url}/verify?success=false&orderId=${newOrder._id}
        cancel_url:`${frontend_url}/mainhome`
    })
   
    

    res.json({success:true,session_url:session.url})


} catch (error) {
    console.log(error);
    res.json({success:false, message:"Error"})
}

};

//user order for frontend
const userOrders = async(req,res)=>{
    try {
        console.log('[UserOrders] req.user object received:', req.user);
        const currentUserId = req.user ? req.user._id : null;
        if (!currentUserId) {
            console.error('[UserOrders] Error: User ID is not available from req.user');
            return res.status(401).json({ success: false, message: "Unauthorized: User ID missing." });
        }
        console.log(`[UserOrders] Fetching orders for specific userId: ${currentUserId}`);
        // Use the authenticated user's ID from the token (set by authMiddleware)
        const orders= await OrderModel.find({userId: currentUserId});
        console.log(`[UserOrders] Found ${orders.length} orders for userId: ${currentUserId}`);
        res.json({success:true, data:orders})
    } catch (error) {
        console.error("[UserOrders] Error fetching user orders:", error);
        res.json({success:false, message:"Error fetching user orders"})
    }

};

//listing orders for admin panel
const listOrders= async(req,res)=>{
    try {
        const orders = await OrderModel.find({});
        res.json({success:true, data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }

}

exports.createOrder = createOrder;
exports.userOrders = userOrders;
exports.listOrders = listOrders;
exports.getOrderById = getOrderById;
exports.updateOrder = updateOrder;
exports.deleteOrder = deleteOrder;