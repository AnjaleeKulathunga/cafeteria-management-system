const express = require("express");
const router = express.Router();
//insert model
const Ingredient = require("../models/ReqIngredModel");

//insert waste controller
const ReqIngredController =require("../controllers/ReqIngredController");

router.get("/", ReqIngredController.getIngredient);
router.post("/", ReqIngredController.addIngredientReq);
router.get("/:id", ReqIngredController.getIngredientReqById);
router.put("/:id", ReqIngredController.updateIngredientReq);
router.delete("/:id", ReqIngredController.deleteIngredientReq);

router.get("/requests", async (req, res) => {
    try {
      const data = await ReqIngred.find().limit(5);
      console.log("Fetched requests:", data);
      res.json(
        data.map((item) => ({
          id: item.requestID,
          name: item.ingredientName,
          condition: item.quantityNeeded > 0 ? "Pending" : "Approved",
          lastRequest: item.dateOfRequest.toISOString().split("T")[0],
        }))
      );
    } catch (error) {
      console.error("Error fetching requests:", error.message);
      res.status(500).json({ error: "Server error" });
    }
  });
  
  // Approve a request
  router.patch("/requests/:id/approve", async (req, res) => {
    try {
      const request = await ReqIngred.findOneAndUpdate(
        { requestID: req.params.id },
        { quantityNeeded: 0 }, // Mark as approved
        { new: true }
      );
      if (!request) {
        return res.status(404).json({ error: "Request not found" });
      }
      console.log("Approved request:", request);
      res.json({ message: "Request approved", request });
    } catch (error) {
      console.error("Error approving request:", error.message);
      res.status(500).json({ error: "Server error" });
    }
  });

//export
module.exports = router;