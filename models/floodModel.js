const mongoose = require('mongoose'); 

const floodSchema = new mongoose.Schema({
    location: { type: String, required: true },
    severity: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { versionKey: false });

const Flood = mongoose.model('Flood', floodSchema);

module.exports = Flood;
