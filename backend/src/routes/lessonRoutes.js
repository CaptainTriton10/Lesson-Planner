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

router.post('/delete', async (req, res) => {
  try {
    const { id } = req.body;

    const lesson = await Lesson.findOneAndDelete({ _id: id });
    if (!lesson) throw new Error('Lesson does not exist.');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
