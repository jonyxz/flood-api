const express = require('express');
const Flood = require('../models/flood');
const { protect } = require('./authRoutes');

const router = express.Router();

router.post('/', protect, async (req, res) => {
  const { location, severity, description, date } = req.body;
  try {
    const newFlood = new Flood({ location, severity, description, date });
    await newFlood.save();
    res.status(201).json(newFlood);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create flood report' });
  }
});

router.get('/', protect, async (req, res) => {
  try {
    const floods = await Flood.find();
    res.status(200).json(floods);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch flood reports' });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const updatedFlood = await Flood.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedFlood);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update flood report' });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    await Flood.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Flood report deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete flood report' });
  }
});

module.exports = router;
