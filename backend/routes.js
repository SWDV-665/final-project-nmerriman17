const express = require('express');
const router = express.Router();
const Marker = require('./models/marker'); // Assuming you have a Marker model

// Define route to save a new marker
router.post('/markers', async (req, res) => {
  try {
    const { location, date, latitude, longitude } = req.body;
    const marker = new Marker({ location, date, latitude, longitude });
    await marker.save();
    res.status(201).json(marker);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while saving the marker.' });
  }
});

// Define route to fetch all markers
router.get('/markers', async (req, res) => {
  try {
    const markers = await Marker.find();
    res.json(markers);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching markers.' });
  }
});

module.exports = router;
