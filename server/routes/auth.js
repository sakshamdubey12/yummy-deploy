const express = require("express");
const router = express.Router();
const isLoggedIn = require('../middleware/auth')
const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = "shhh"
router.post("/signup", async (req, res) => {
    try {
      const { name, userName, email, password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await userModel.create({
        name,
        userName,
        email,
        password: hashedPassword,
      });
      const token = jwt.sign({ id: user._id, email: user.email, name: user.name, userName: user.userName }, secret, { expiresIn: '24h' });
      res.cookie("token", token, {
        httpOnly: true,
        secure: true, // Use secure cookies in production
        sameSite: 'None', // Adjust as needed
        maxAge: 24 * 60 * 60 * 1000 // Cookie expiration time (1 day)
      });
      res.status(200).json({ message: "Signup successful" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });


router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await userModel.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: "Wrong email or password!" });
      }
  
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign({ id: user._id, email: user.email, name: user.name, userName: user.userName }, secret, { expiresIn: '24h' });
        res.cookie('token', token, {
          httpOnly: true,
          secure:true, // Use secure cookies in production
          sameSite: 'None', // Adjust as needed
          maxAge: 24 * 60 * 60 * 1000 // Cookie expiration time (1 day)
        });
        console.log('token: ',token)
        res.status(200).json({ message: "Login successful" });
      } else {
        res.status(401).json({ message: "Wrong email or password!" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  router.get('/', isLoggedIn, (req, res) => {
    const loggedIn = req.isAuthenticated;
    res.status(200).json({ message: 'Profile data', user: req.user, loggedIn });
  });

  router.get('/logout', (req, res) => {
    // Clear the token from the cookies
    try {
    const token = req.cookies.token; // Get token from cookies
    console.log('before',token)
    res.clearCookie('token', { path: '/' });
    console.log('after',token)
    return res.status(200).json({ message: 'Successfully logged out' });
  } catch (error) {
    console.error('Error logging out:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
  });

  module.exports = router;
