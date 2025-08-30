import mongoose, { model } from 'mongoose';

const lessonSchema = new mongoose.Schema({
  authorId: { type: String, required: true },
  lessonName: { type: String, required: true },
  lessonTitle: { type: String },
  date: { type: String, required: true },
  period: { type: String, required: true },
  room: { type: String },
});

const Lesson = mongoose.model('Lesson', lessonSchema);

export default Lesson;
