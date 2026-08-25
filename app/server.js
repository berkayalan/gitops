const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongodb:27017/tasksdb';

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const Item = mongoose.model('Item', new mongoose.Schema({
  title: String,
  createdAt: { type: Date, default: Date.now }
}));

mongoose.connect(MONGO_URI)
  .then(() => console.log(`Connected to MongoDB at ${MONGO_URI}`))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/items', async (req, res) => {
  try {
    const newItem = new Item({ title: req.body.title });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/info', (req, res) => {
  res.json({
    environment: process.env.APP_ENV || 'local',
    hostname: process.env.HOSTNAME || 'localhost'
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});