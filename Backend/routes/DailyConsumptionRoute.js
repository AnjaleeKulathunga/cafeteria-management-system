const express = require("express");
const router = express.Router();
//insert model
const Consumption = require("../models/DailyConsumptionModel");

//insert waste controller
const DailyConsumptionController =require("../controllers/DailyConsumptionController");

router.get("/", DailyConsumptionController.getConsumption);
router.post("/", DailyConsumptionController.addConsumption);
router.get("/:id", DailyConsumptionController.getConsumptionById);
router.put("/:id", DailyConsumptionController.updateConsumption);
router.delete("/:id", DailyConsumptionController.deleteConsumption);

router.get("/chart", async (req, res) => {
    try {
      const data = await DailyConsumption.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m", date: "$dateOfConsumption" } },
            totalQuantity: { $sum: "$quantityUsed" },
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