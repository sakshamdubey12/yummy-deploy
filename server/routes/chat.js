// routes/chat.js
const express = require('express');
const router = express.Router();
const Message = require('../models/messageModel'); 
const mongoose = require('mongoose')
// Fetch messages between sender and receiver
router.get('/messages', async (req, res) => {
    try {
      const { sender, receiver } = req.query;

      const messages = await Message.find({
        $or: [
          { sender: sender, receiver: receiver },
          { sender: receiver, receiver: sender }
        ]
      }).sort({ timestamp: 1 });
  
      res.status(200).json(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ error: 'Server error while fetching messages' });
    }
  });
module.exports = router;
