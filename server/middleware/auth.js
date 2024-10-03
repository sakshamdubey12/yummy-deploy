const jwt = require('jsonwebtoken');
const secret = "shhh";

const isLoggedIn = (req, res, next) => {
  const token = req.cookies.token;
  console.log("token set: ",token)
  req.isAuthenticated = false;

  if (!token) return res.status(401).json({ message: 'Not authenticated' });

  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });

    req.user = decoded;
    req.isAuthenticated = true;
    next();
  });
};


module.exports = isLoggedIn;
