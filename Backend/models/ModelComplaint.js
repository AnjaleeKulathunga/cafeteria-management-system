const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  idNo: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  userType: { type: String, enum: ['Student','Kitchen Staff', 'Cashier'], required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Rejected', 'Resolved'], default: 'Pending' },
  reply: { type: String, default: '' },
});

const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;