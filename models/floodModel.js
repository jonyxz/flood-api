const mongoose = require('mongoose'); 

const floodSchema = new mongoose.Schema({
    location: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: 'active' }, // e.g., active, resolved
    date: { type: Date, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { versionKey: false });

const Flood = mongoose.model('Flood', floodSchema);

module.exports = Flood;