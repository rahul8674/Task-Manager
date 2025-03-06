import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import taskRoutes from './routes/tasks';
import { errorHandler } from './middleware/errorHandler';
import { AppDataSource } from "./data-source";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Task Management System API');
});

AppDataSource.initialize().then(() => {
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
}).catch(console.error);

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use(errorHandler);
