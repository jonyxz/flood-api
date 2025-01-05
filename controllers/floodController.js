const Flood = require('../models/floodModel');

exports.createFloodReport = async (req, res) => {
    const { location, severity, description, date } = req.body;
    try {
        const flood = new Flood({
            location,
            severity,
            description,
            date,
            user: req.user._id
        });
        const savedFlood = await flood.save();
        res.status(201).json(savedFlood);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllFloodReports = async (req, res) => {
    try {
        const floods = await Flood.find().populate('user', 'username email').select('-__v');
        res.status(200).json(floods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateFloodReport = async (req, res) => {
    const { id } = req.params;
    const { location, severity, description, date } = req.body;
    try {
        const flood = await Flood.findByIdAndUpdate(
            id,
            { location, severity, description, date },
            { new: true }
        ).select('-__v');
        if (!flood) {
            return res.status(404).json({ message: 'Flood report not found' });
        }
        res.status(200).json(flood);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteFloodReport = async (req, res) => {
    const { id } = req.params;
    try {
        const flood = await Flood.findByIdAndDelete(id);
        if (!flood) {
            return res.status(404).json({ message: 'Flood report not found' });
        }
        res.status(200).json({ message: 'Flood report deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};