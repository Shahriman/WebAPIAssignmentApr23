//npm install express jsonwebtoken
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const secretKey = '740810085709';

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }
    req.user = decoded;
    next();
  });
};

// Login route
app.post('/login', (req, res) => {
  // Simulating user authentication
  const user = {
    id: 123,
    username: 'exampleUser'
  };

  // Generate a JWT
  const token = jwt.sign(user, secretKey, { expiresIn: '1h' });

  res.json({ token });
});

// Protected route
app.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'Protected route accessed successfully', user: req.user });
});

// Start the server
app.listen(5000, () => {
  console.log('Server started on port 5000');
});