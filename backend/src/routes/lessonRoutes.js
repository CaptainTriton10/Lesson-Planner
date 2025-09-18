import express from 'express';
import Lesson from '../models/Lesson.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/create', verifyToken, (req, res) => {
  try {
    const lesson = new Lesson({ ...req.body, authorId: req.user.id });

    lesson.save();
    res.send('Lesson saved successfully.');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/get/all', verifyToken, async (req, res) => {
  try {
    const lessons = await Lesson.find({ authorId: req.user.id });

    res.json(lessons);
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
