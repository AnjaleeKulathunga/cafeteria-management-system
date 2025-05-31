const express = require("express");
const router = express.Router();
//import authMiddleware from "../middleware/auth"

const { addToCart, removeFromCart, getCart } = require("../controllers/CartController");
const authMiddleware = require("../middleware/auth");
const CartController =require("../controllers/CartController")

router.post("/add",authMiddleware,CartController.addToCart);
router.delete("/remove",authMiddleware,CartController.removeFromCart);
router.get("/get",authMiddleware,CartController.getCart);

//export

module.exports = router;

// export default authMiddleware;