const Flood = require('../models/floodModel');

exports.createFloodReport = async (req, res) => {
    const { location, description, date, status } = req.body;
    try {
        const flood = new Flood({
            location,
            description,
            status: status || 'active',
            date,
            user: req.user._id
        });
        const savedFlood = await flood.save();
        res.status(201).json(savedFlood);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAllFloodReports = async (req, res) => {
    try {
        const floods = await Flood.find().populate('user', 'name email').select('-__v');
        res.status(200).json(floods);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateFloodReport = async (req, res) => {
    const { id } = req.params;
    const { location, description, date, status } = req.body;
    try {
        const flood = await Flood.findByIdAndUpdate(
            id,
            { location, description, date, status },
            { new: true, runValidators: true }
        );
        if (!flood) {
            return res.status(404).json({ message: 'Flood report not found' });
        }
        res.status(200).json(flood);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteFloodReport = async (req, res) => {
    const { id } = req.params;
    try {
        const flood = await Flood.findByIdAndDelete(id);
        if (!flood) {
            return res.status(404).json({ message: 'Flood report not found' });
        }
        res.status(200).json({ message: 'Flood report deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};