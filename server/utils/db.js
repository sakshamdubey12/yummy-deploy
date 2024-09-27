const mongoose = require('mongoose');

// MongoDB connection URI
const mongoURI = 'mongodb+srv://sakshamakki06:akki123@cluster0.vwekv.mongodb.net/yummy?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your actual MongoDB URI

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
  });
