const jwt = require('jsonwebtoken');

const secretKey = 'fer10'; 
const tokenOptions = {
  expiresIn: '1h',
};

function createToken(payload) {
  return jwt.sign(payload, secretKey, tokenOptions);
}

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
}

module.exports = { createToken, verifyToken };