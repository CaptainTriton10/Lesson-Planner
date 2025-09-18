import { config } from 'dotenv';
config();

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import express from 'express';
import mongoose from 'mongoose';
import User from '../models/User.js';
import { uriMongoose } from '../mongodb.js';

const router = express.Router();

mongoose.connect(uriMongoose);

router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);

    // Try to find username in DB
    if (await User.findOne({ username: user.username })) {
      throw new Error('User already registered');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10); // Hash and salt password

    user.password = hashedPassword;

    await user.save();

    res.send('Registration successful.');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = new User(req.body);

    const userInDb = await User.findOne({ username: user.username }); // Try to find user in DB
    if (!userInDb) {
      throw new Error('Username not found.');
    }

    // Compare passwords
    const passwordCorrect = await bcrypt.compare(
      user.password,
      userInDb.password
    );

    if (!passwordCorrect) {
      throw new Error('Password incorrect.');
    }

    const token = jwt.sign(
      { id: userInDb.id, username: user.username },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '5hr',
      }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
