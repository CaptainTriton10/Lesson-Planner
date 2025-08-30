import { config } from 'dotenv';
config();

import express from 'express';
import bcrypt, { hash } from 'bcrypt';
import { MongoClient, ServerApiVersion } from 'mongodb';
import mongoose from 'mongoose';

import User from './models/User.js';
import Lesson from './models/Lesson.js';

const mongoDbUsername = encodeURIComponent(process.env.USER_NAME);
const mongoDbPassword = encodeURIComponent(process.env.USER_PASSWORD);
const uriMain = process.env.URI;
const uriMongooseMain = process.env.URI_MONGOOSE;

const uri = `mongodb+srv://${mongoDbUsername}:${mongoDbPassword}${uriMain}`;
const uriMongoose = `mongodb+srv://${mongoDbUsername}:${mongoDbPassword}${uriMongooseMain}`;

// MongoDB client
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  tls: true,
  tlsAllowInvalidCertificates: false,
});

mongoose.connect(uriMongoose);

const [lessons, users] = await client.db(process.env.DB_NAME).collections();

const app = express();
app.use(express.json()); // Allows server to use JSON

app.post('/signup', async (req, res) => {
  try {
    const user = new User(req.body);

    // Try to find username in DB
    if (await users.findOne({ username: user.username })) {
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

app.post('/login', async (req, res) => {
  try {
    const user = new User(req.body);

    const userInDb = await users.findOne({ username: user.username }); // Try to find user in DB
    if (!userInDb) {
      throw new Error('Username not found.');
    }

    console.log(userInDb.password);

    // Compare passwords
    const passwordCorrect = await bcrypt.compare(
      user.password,
      userInDb.password
    );
    if (passwordCorrect) {
      res.send('Login successful');
    } else {
      throw new Error('Password incorrect.');
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/new-lesson', async (req, res) => {
  try {
    const lesson = new Lesson(req.body);

    lesson.save();
    res.send('Lesson saved successfully.');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000);
