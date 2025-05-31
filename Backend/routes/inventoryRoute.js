const express = require('express');
const router = express.Router();

//insert model
const Inventory = require("../models/inventoryModel");

//insert inventory controller
const inventoryController = require("../controllers/inventoryController");

router.get("/", inventoryController.getInventory);
router.post("/", inventoryController.addInventory);
router.get("/:id", inventoryController.getById); 
router.put("/:id", inventoryController.updateInventory);
router.delete("/:id", inventoryController.deleteInventory);

router.get("/chart", async (req, res) => {
    try {
      const data = await Inventory.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
            totalQuantity: { $sum: "$cQuantity" },
          },
        },
        { $sort: { _id: 1 } },
        { $limit: 5 },
      ]);
      res.json({
        labels: data.map((d) => d._id),
        values: data.map((d) => d.totalQuantity),
      });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });
  
  // Get stock levels for Featured bar chart
  router.get("/stock", async (req, res) => {
    try {
      const data = await Inventory.find().limit(5);
      res.json({
        labels: data.map((d) => d.productName),
        quantities: data.map((d) => d.cQuantity),
      });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });

//export
module.exports= router;