const express = require('express');
const router = express.Router();
const yachtController = require('../controllers/yachtController');

// Public routes
router.get('/yachts', yachtController.getAllYachts);
router.get('/yachts/featured', yachtController.getFeaturedYachts);
router.get('/yachts/stats', yachtController.getStats);
router.get('/yachts/:id', yachtController.getYachtById);

// Admin routes (in production, add authentication middleware)
router.post('/yachts', yachtController.createYacht);
router.put('/yachts/:id', yachtController.updateYacht);
router.delete('/yachts/:id', yachtController.deleteYacht);

module.exports = router;
