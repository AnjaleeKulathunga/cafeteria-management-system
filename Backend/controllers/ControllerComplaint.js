const Complaint = require('../models/ModelComplaint');

const addComplaint = async (req, res, next) => {
  const { idNo, name, email, userType, description } = req.body;

  console.log("Incoming complaint:", req.body); // 👈 Add this line

  try {
    const complaint = new Complaint({ idNo, name, email, userType, description });
    await complaint.save();
    return res.status(201).json({ complaint });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Unable to add complaint', error: error.message });
  }
};


const getAllComplaint = async (req, res, next) => {
  try {
    const complaints = await Complaint.find();
    if (!complaints || complaints.length === 0) {
      return res.status(404).json({ message: 'No complaints found' });
    }
    return res.status(200).json({ complaints });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching complaints', error: error.message });
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    return res.status(200).json({ complaint });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching complaint', error: error.message });
  }
};

const deleteComplaint = async (req, res, next) => {
  const { id } = req.params;

  try {
    const complaint = await Complaint.findByIdAndDelete(id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    return res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error deleting complaint', error: error.message });
  }
};

const updateComplaint = async (req, res, next) => {
  const { id } = req.params;
  const { idNo, name, email, userType, description, status, reply } = req.body;

  try {
    const complaint = await Complaint.findByIdAndUpdate(
      id,
      { idNo, name, email, userType, description, status, reply },
      { new: true, runValidators: true }
    );
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    return res.status(200).json({ complaint });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating complaint', error: error.message });
  }
};

module.exports = {
  addComplaint,
  getAllComplaint,
  getById,
  deleteComplaint,
  updateComplaint,
};