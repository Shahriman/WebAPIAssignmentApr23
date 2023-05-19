//npm install jsonwebtoken
const jwt = require('jsonwebtoken');

// Example payload
const payload = {
  user: {
    id: 123,
    username: 'exampleUser'
  }
};

// Example secret key
const secretKey = '740810085709';

// Generate a JWT
const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

console.log('Generated token:', token);

// Verify a JWT
jwt.verify(token, secretKey, (err, decoded) => {
  if (err) {
    console.log('Token verification failed:', err.message);
  } else {
    console.log('Decoded payload:', decoded);
  }
});