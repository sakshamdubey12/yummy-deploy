// const express = require("express");
// const isLoggedIn = require('./middleware/auth')
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const http = require("http");
// const Message = require('./models/messageModel')
// require('dotenv').config();
// require('./utils/db')
// const app = express();
// const server = http.createServer(app);
// var io = require('socket.io')(server, {
//   cors: {
//     origin: '*',
//   }
// });

// // Middlewares
// app.use(cors({
//   origin: true,
//   credentials: true
// }));
// app.use(cookieParser());
// app.use(express.json({ limit: '50mb' }));
// app.options('*', cors());

// // Socket.IO setup
// io.on('connection', (socket) => {
//   console.log('A user connected:', socket.id);

//   socket.on('sendMessage', async (message) => {
//     // Broadcast the message to the specified receiver
//     console.log(message)
//     // io.to(message.receiver).emit('receiveMessage', message);
//     try {
//       const newMessage = new Message({
//         text: message.text,
//         sender: message.sender,   // Assuming message.sender is a string
//         receiver: message.receiver, // Assuming message.receiver is a string
//       });
      
//       await newMessage.save();
//       console.log('Message saved to database:', newMessage);
      
//       // Broadcast the message to the specified receiver
//       io.to(message.receiver).emit('receiveMessage', message);
//     } catch (error) {
//       console.error('Error saving message:', error);
//     }
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//   });
// });

// app.get('/',(req,res)=>{
//   res.send('api is working');
// })

// // Routes
// const generateRoute = require("./routes/generate");
// app.use('/AI', generateRoute);

// const authRoutes = require("./routes/auth");
// app.use('/auth', authRoutes);

// const postRoute = require("./routes/post");
// app.use('/post',isLoggedIn, postRoute);

// const userRoute = require("./routes/user");
// app.use('/users',isLoggedIn, userRoute);

// const cuisinesModel = require("./models/cuisinesModel")
// app.get("/cuisines/country/:country",async(req,res)=>{
//   const country = req.params.country;
//   const data = await cuisinesModel.find({country})
//   if (!data[0]){
//     res.status(404)
//   }else{

//     res.json(data[0].cuisines)
//     // console.log(data[0].cuisines)
//   }
// })

// const chatRoute = require("./routes/chat");
// app.use('/chat',isLoggedIn, chatRoute);

// // Example profile route (optional)
// // app.get('/profile', isLoggedIn, (req, res) => {
// //   res.status(200).json({ message: 'Profile data', user: req.user });
// // });

// // Start the server
// const PORT = process.env.PORT || 3001;
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


const express = require("express");
const isLoggedIn = require('./middleware/auth')
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const Message = require('./models/messageModel')
require('dotenv').config();
require('./utils/db')
const app = express();
const server = http.createServer(app);
var io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

// Middlewares
app.use(cors({
  origin: true,  // Allow all origins
  credentials: true
}));
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.options('*', cors());  // Enable pre-flight for all routes

// Socket.IO setup
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('sendMessage', async (message) => {
    console.log(message)
    try {
      const newMessage = new Message({
        text: message.text,
        sender: message.sender,
        receiver: message.receiver,
      });
      
      await newMessage.save();
      console.log('Message saved to database:', newMessage);
      
      io.to(message.receiver).emit('receiveMessage', message);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

app.get('/',(req,res)=>{
  res.send('api is working');
})

// Routes
const generateRoute = require("./routes/generate");
app.use('/AI', generateRoute);

const authRoutes = require("./routes/auth");
app.use('/auth', authRoutes);

const postRoute = require("./routes/post");
app.use('/post',isLoggedIn, postRoute);

const userRoute = require("./routes/user");
app.use('/users',isLoggedIn, userRoute);

const cuisinesModel = require("./models/cuisinesModel")
app.get("/cuisines/country/:country",async(req,res)=>{
  const country = req.params.country;
  const data = await cuisinesModel.find({country})
  if (!data[0]){
    res.status(404)
  }else{
    res.json(data[0].cuisines)
  }
})

const chatRoute = require("./routes/chat");
app.use('/chat',isLoggedIn, chatRoute);

// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});