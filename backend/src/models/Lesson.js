import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  authorId: { type: String, required: true },
  lessonName: { type: String, required: true },
  lessonTitle: { type: String },
  date: { type: String, required: true },
  period: { type: Number, required: true },
  room: { type: String },
  notes: { type: String },
  starter: { type: String },
  main: { type: String },
  plenary: { type: String },
});

const Lesson = mongoose.model('Lesson', lessonSchema);

export default Lesson;
