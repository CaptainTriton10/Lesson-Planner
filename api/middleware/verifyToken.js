import { config } from 'dotenv';
config();

import jwt from 'jsonwebtoken';

function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) throw new Error('No token provided.');

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) throw new Error('Unauthorised');

      req.user = decoded;

      next();
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export default verifyToken;
