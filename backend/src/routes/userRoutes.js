import { config } from 'dotenv';
config();

import express from 'express';
import mongoose from 'mongoose';
import verifyToken from '../middleware/verifyToken.js';
import { uriMongoose } from '../mongodb.js';
import User from '../models/User.js';

const router = express.Router();

mongoose.connect(uriMongoose);

router.get('/name', verifyToken, async (req, res) => {
  const user = await User.findOne({ _id: req.user.id });

  res.send(user.name);
});

export default router;
