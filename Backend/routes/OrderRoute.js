const express= require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth");

//Insert Model
const Order = require("../models/OrderModel");
//Insert OrderController
const OrderController = require("../controllers/OrderController");

// Protected routes (require authentication)
router.post("/place", authMiddleware, OrderController.createOrder);
router.post("/userorders", authMiddleware, OrderController.userOrders);
router.get("/view/:id", authMiddleware, OrderController.getOrderById);
router.put("/update/:id", authMiddleware, OrderController.updateOrder);
router.delete("/delete/:id", authMiddleware, OrderController.deleteOrder);

// Admin routes (no auth required for now)
router.get("/list", OrderController.listOrders);

//export
module.exports = router;