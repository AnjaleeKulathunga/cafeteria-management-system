const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const informationSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    studentid: {
        type: String,
        required: true
    },
    specialInstructions: {
        type: String,
        required: true
    },
    pickupTime: {
        type: String,
        required: true
    },
    pickupDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    address: {
        type: String,
    },

})

const InformationModel = mongoose.model("InformationModel", informationSchema);

// Service functions
const getAllInformation = async () => {
    return await InformationModel.find();
};

const getInformationById = async (id) => {
    return await InformationModel.findById(id);
};

const createInformation = async (informationData) => {
    const information = new InformationModel(informationData);
    return await information.save();
};

const updateInformation = async (id, informationData) => {
    return await InformationModel.findByIdAndUpdate(id, informationData, { new: true });
};

const deleteInformation = async (id) => {
    return await InformationModel.findByIdAndDelete(id);
};

module.exports = {
    getAllInformation,
    getInformationById,
    createInformation,
    updateInformation,
    deleteInformation
};