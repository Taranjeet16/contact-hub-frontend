// =====================================================
// EXPRESS + MONGODB BACKEND CODE
// =====================================================
// This is reference code for your external backend.
// Create a new Node.js project and use this as a starting point.
// 
// Setup:
// 1. npm init -y
// 2. npm install express mongoose cors dotenv
// 3. Create .env file with MONGO_URI=your_mongodb_connection_string
// 4. Run with: node server.js
// =====================================================

/*
// ============ server.js ============
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: '*', // In production, set this to your Lovable app URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, default: '' },
  category: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// ============ ROUTES ============

// GET all contacts
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// POST new contact
app.post('/api/contacts', async (req, res) => {
  try {
    const { name, email, phone, message, category } = req.body;
    
    // Validation
    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone are required' });
    }
    
    const contact = new Contact({ name, email, phone, message, category });
    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create contact' });
  }
});

// PUT update contact
app.put('/api/contacts/:id', async (req, res) => {
  try {
    const { name, email, phone, message, category } = req.body;
    
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, message, category },
      { new: true, runValidators: true }
    );
    
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update contact' });
  }
});

// DELETE contact
app.delete('/api/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete contact' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
*/

// ============ .env file ============
// MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/contacts_db

export {};
