const mongoose = require('mongoose');

// Define the Country schema
const CuisineSchema = new mongoose.Schema({
  country: String,
  cuisines: [
    {
      cuisine: String,
      description: String,
    }
  ]
});

// Create the Country model
module.exports = mongoose.model('cuisine', CuisineSchema);


