const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    measurement: { type: String, required: true }
}, { _id: false });

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: { type: [String], required: true },
    instructions: {
            type: String,
            required: true,
          },
    hashtags: { type: [String], required: true },
    image: { type: Object, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    likes: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
    createdAt: { type: Date, default: Date.now },
    
});


// const postSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   ingredients: [
//     {
//       name: {
//         type: String,
//         required: true,
//       },
//       measurement: {
//         type: String,
//         required: true,
//       },
//     },
//   ],
//   instructions: {
//     type: String,
//     required: true,
//   },
//   hashtags: [
//     {
//       type: String,
//     },
//   ],
//   imageUrl: {
//     type: String, // To store the path to the image uploaded via Multer
//     required: false,
//   },
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User', // Reference to the User who created the post
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });


const Post = mongoose.model('Post', postSchema);

module.exports = Post;
