const mongoose = require('mongoose');

// Define the Message schema
const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  receiver: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Create the Message model
const Message = mongoose.model('message', messageSchema);

module.exports = Message;
