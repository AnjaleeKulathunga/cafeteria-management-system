const informationService = require('../models/InformationModel');

// Get All Information
const getAllInformation = async (req, res) => {
    try {
        const information = await informationService.getAllInformation();
        res.status(200).json(information);
    } catch (error) {
        console.error('Error fetching all information:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Get Information By ID
const getInformationById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'ID parameter is required' });
        }

        const information = await informationService.getInformationById(id);
        if (!information) {
            return res.status(404).json({ message: 'Information not found' });
        }

        res.status(200).json(information);
    } catch (error) {
        console.error(`Error fetching information with ID ${req.params.id}:`, error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Create Information
const createInformation = async (req, res) => {
    try {
        const {
            firstname,
            lastname,
            email,
            phone,
            studentid,
            specialInstructions,
            pickupTime,
            pickupDate,
            address
        } = req.body;

        if (!firstname || !lastname || !email || !phone || !studentid || !pickupDate || !pickupTime || !address) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const information = await informationService.createInformation({
            firstname,
            lastname,
            email,
            phone,
            studentid,
            specialInstructions,
            pickupTime,
            pickupDate,
            address
        });

        await information.save();
        res.status(201).json(information);
    } catch (error) {
        console.error('Error creating information:', error);
        res.status(500).json({ message: 'Failed to create information' });
    }
}

// Update Information
const updateInformation = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        if (!id) {
            return res.status(400).json({ message: 'ID parameter is required' });
        }

        const information = await informationService.updateInformation(id, updatedData);
        if (!information) {
            return res.status(404).json({ message: 'Information not found' });
        }

        res.status(200).json(information);
    } catch (error) {
        console.error(`Error updating information with ID ${req.params.id}:`, error);
        res.status(500).json({ message: 'Failed to update information' });
    }
}

// Delete Information
const deleteInformation = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'ID parameter is required' });
        }

        const information = await informationService.deleteInformation(id);
        if (!information) {
            return res.status(404).json({ message: 'Information not found' });
        }

        res.status(204).send(); // No content
    } catch (error) {
        console.error(`Error deleting information with ID ${req.params.id}:`, error);
        res.status(500).json({ message: 'Failed to delete information' });
    }
}

exports.getAllInformation = getAllInformation;
exports.getInformationById = getInformationById;
exports.createInformation = createInformation;
exports.updateInformation = updateInformation;
exports.deleteInformation = deleteInformation;