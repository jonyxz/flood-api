const express = require('express');
const router = express.Router();
const floodController = require('../controllers/floodController');
const protect = require('../middleware/authMiddleware');

router.post('/flood', protect, floodController.createFloodReport);
router.get('/flood', floodController.getAllFloodReports);
router.put('/flood/:id', protect, floodController.updateFloodReport);
router.delete('/flood/:id', protect, floodController.deleteFloodReport);

module.exports = router;