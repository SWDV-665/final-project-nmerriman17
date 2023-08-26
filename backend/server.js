const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

// Set up MongoDB connection
mongoose.connect('mongodb://localhost:27017/markers', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to the database');
});

// Define the marker schema and model
const markerSchema = new mongoose.Schema({
  location: String,
  date: String,
  latitude: Number,
  longitude: Number,
});
const Marker = mongoose.model('Marker', markerSchema);

// API to save a new marker
app.post('/api/markers', async (req, res) => {
  const { location, date, latitude, longitude } = req.body;
  const marker = new Marker({ location, date, latitude, longitude });
  await marker.save();
  res.json(marker);
});

// API to retrieve all markers
app.get('/api/markers', async (req, res) => {
  const markers = await Marker.find();
  res.json(markers);
});

// Use your defined routes
const routes = require('./routes'); // Import your routes file
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
