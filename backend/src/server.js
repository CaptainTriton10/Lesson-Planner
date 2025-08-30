import express from 'express';
import authRoutes from './routes/authRoutes.js';
import lessonRoutes from './routes/lessonRoutes.js';

const app = express();
app.use(express.json()); // Allows server to use JSON

app.use('/auth', authRoutes);
app.use('/lesson', lessonRoutes);

app.listen(3000);
