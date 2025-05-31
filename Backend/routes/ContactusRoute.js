const express = require("express");
const router = express.Router();
//Insert Model

const Contact = require("../models/ContactusModel");
//Insert Contact us controller
const ContactusController = require("../controllers/ContactusController");

router.get("/", ContactusController.getAllContact);
router.post("/", ContactusController.addContact);
router.get("/:id", ContactusController.getById);
router.put("/:id", ContactusController.updateContact);
router.delete("/:id", ContactusController.deleteContact);
//export
module.exports= router;