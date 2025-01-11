const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
 
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, 
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: null, 
  },
  posts: {
    type: [mongoose.Schema.Types.ObjectId], 
    ref: 'Post', 
    default: [],
  },
  followers: {
    type: [mongoose.Schema.Types.ObjectId], 
    ref: 'User', 
    default: [],
  },
  following: {
    type: [mongoose.Schema.Types.ObjectId], 
    ref: 'User', 
    default: [],
  },
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt timestamps
});

// Create the model
const User = mongoose.model('User', userSchema);

module.exports = User;
