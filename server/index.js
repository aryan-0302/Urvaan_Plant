const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

// Plant Schema
const plantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  categories: { type: [String], required: true },
  available: { type: Boolean, default: true },
  imageUrl: { type: String },
  description: { type: String },
  careLevel: { type: String }
});

const Plant = mongoose.model('Plant', plantSchema);

// Notification Schema
const notificationSchema = new mongoose.Schema({
  email: { type: String, required: true },
  plantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plant', required: true },
  notified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Notification = mongoose.model('Notification', notificationSchema);




// GET /api/plants
app.get('/api/plants', async (req, res) => {
  console.log('GET /api/plants request received'); 
  try {
    const { search, category, sort } = req.query;
    let query = {};

    const searchFilter = search ? {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { categories: { $regex: search, $options: 'i' } }
      ]
    } : null;

    const categoryFilter = (category && category !== 'All') ? { categories: category } : null;

    if (searchFilter && categoryFilter) {
      query = { $and: [searchFilter, categoryFilter] };
    } else if (searchFilter) {
      query = searchFilter;
    } else if (categoryFilter) {
      query = categoryFilter;
    }
    
    let sortOption = {};
    switch (sort) {
      case 'price_asc':
        sortOption = { price: 1 };
        break;
      case 'price_desc':
        sortOption = { price: -1 };
        break;
      case 'name_asc':
        sortOption = { name: 1 };
        break;
      default:
        break;
    }
    
    const plants = await Plant.find(query).sort(sortOption);
    res.json(plants);
  } catch (error) {
    console.error('Error fetching plants:', error);
    res.status(500).json({ message: 'Server error while fetching plants.' });
  }
});








// POST /api/plants - Add a new plant
app.post('/api/plants', async (req, res) => {
  console.log('POST /api/plants request received with body:', req.body); 
  try {
    const { name, price, categories, available, imageUrl, description, careLevel } = req.body;

    if (!name || !price || !categories || !Array.isArray(categories) || categories.length === 0) {
      return res.status(400).json({ message: 'Name, price, and at least one category are required.' });
    }

    const newPlant = new Plant({ name, price, categories, available, imageUrl, description, careLevel });
    const savedPlant = await newPlant.save();
    res.status(201).json(savedPlant);
  } catch (error) {
    console.error('Error adding plant:', error);
    res.status(500).json({ message: 'Error adding plant to the database.' });
  }
});













// POST /api/notifications - For out-of-stock notifications
app.post('/api/notifications', async (req, res) => {
  console.log('POST /api/notifications request received with body:', req.body);
  try {
    const { email, plantId } = req.body;

    if (!email || !plantId) {
      return res.status(400).json({ message: 'Email and Plant ID are required.' });
    }

    const existing = await Notification.findOne({ email, plantId });
    if (existing) {
      return res.status(200).json({ message: 'You are already on the notification list for this plant.' });
    }

    const newNotification = new Notification({ email, plantId });
    await newNotification.save();
    res.status(201).json({ message: 'Success! We will notify you when the plant is back in stock.' });
  } catch (error) {
    console.error('Error saving notification:', error);
    res.status(500).json({ message: 'Server error while saving notification.' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));