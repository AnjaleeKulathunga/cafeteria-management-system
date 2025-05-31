const Contactus = require("../models/ContactusModel");

// Get all contacts
const getAllContact = async (req, res) => {
    try {
        const contacts = await Contactus.find();
        return res.status(200).json({ contacts });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Add a new contact
const addContact = async (req, res) => {
    const { name, email, contact, address, servicetype, message } = req.body;

    try {
        const newContact = new Contactus({ name, email, Contact: contact, address, servicetype, message });
        await newContact.save();
        return res.status(201).json({ contact: newContact });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// Get contact by ID
const getById = async (req, res) => {
    const id = req.params.id;

    try {
        const contact = await Contactus.findById(id);
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        return res.status(200).json({ contact });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Update contact details
const updateContact = async (req, res) => {
    const id = req.params.id;
    const { name, email, contact, address, servicetype, message } = req.body;

    try {
        const updatedContact = await Contactus.findByIdAndUpdate(
            id,
            { name, email, contact, address, servicetype, message },
            { new: true } // Returns the updated document
        );

        if (!updatedContact) {
            return res.status(404).json({ message: "Unable to update details" });
        }
        return res.status(200).json({ contact: updatedContact });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Delete contact
const deleteContact = async (req, res) => {
    const id = req.params.id;

    try {
        const deletedContact = await Contactus.findByIdAndDelete(id);
        if (!deletedContact) {
            return res.status(404).json({ message: "Unable to delete" });
        }
        return res.status(200).json({ contact: deletedContact });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.getAllContact = getAllContact;
exports.addContact = addContact;
exports.getById = getById;
exports.updateContact = updateContact;
exports.deleteContact = deleteContact;