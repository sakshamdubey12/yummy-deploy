const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // userName: {
  //   type: String,
  //   required: true,
  // },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // Store emails in lowercase
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: null, // Optional avatar, can be null
  },
  posts: {
    type: [mongoose.Schema.Types.ObjectId], // Assuming posts will reference another model
    ref: 'Post', // Reference to the Post model
    default: [],
  },
  followers: {
    type: [mongoose.Schema.Types.ObjectId], // Followers referenced by ObjectId
    ref: 'User', // Reference to the User model
    default: [],
  },
  following: {
    type: [mongoose.Schema.Types.ObjectId], // Following users referenced by ObjectId
    ref: 'User', // Reference to the User model
    default: [],
  },
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt timestamps
});

// Create the model
const User = mongoose.model('User', userSchema);

module.exports = User;
