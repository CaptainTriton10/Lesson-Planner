import express from 'express';
import Lesson from '../models/Lesson.js';

const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const lesson = new Lesson(req.body);

    lesson.save();
    res.send('Lesson saved successfully.');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
