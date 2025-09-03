import express from 'express';
import cors from "cors"
import authRoutes from './routes/authRoutes.js';
import lessonRoutes from './routes/lessonRoutes.js';

const app = express();
app.use(express.json());
app.use(cors())

app.use('/auth', authRoutes);
app.use('/lesson', lessonRoutes);

app.get("/", (req, res) => {
    res.send("Connected to server.")
})

app.listen(3000, () => {
    console.log("Server is connected on http://localhost:3000")
});
