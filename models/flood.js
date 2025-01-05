const mongoose = require('mongoose');

const floodSchema = new mongoose.Schema({
  location: String,
  severity: String,
  description: String,
  date: { type: Date, default: Date.now },
});

const Flood = mongoose.model('Flood', floodSchema);

module.exports = Flood;

