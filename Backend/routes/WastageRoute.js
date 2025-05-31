const express = require("express");
const router = express.Router();
//insert model
const Waste = require("../models/WastageModel");

//insert waste controller
const WastageController =require("../controllers/WastageController");

router.get("/", WastageController.getWastage);
router.post("/", WastageController.addWastage);
router.get("/:id", WastageController.getWasteById);
router.put("/:id", WastageController.updateWasteage);
router.delete("/:id", WastageController.deleteWastage);

router.get("/chart", async (req, res) => {
    try {
      const data = await Wastage.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m", date: "$dateOfWastage" } },
            totalQuantity: { $sum: "$wQuantity" },
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
  
//export
module.exports = router;