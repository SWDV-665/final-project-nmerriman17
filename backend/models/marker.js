const mongoose = require('mongoose');

const markerSchema = new mongoose.Schema({
  location: String,
  date: String,
  latitude: Number,
  longitude: Number,
});

module.exports = mongoose.model('Marker', markerSchema);
