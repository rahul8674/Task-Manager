// src/routes/tasks.ts
import { Router, Request, Response } from 'express';
import { AppDataSource } from "../data-source";
import { Task } from '../entities/Task';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Protect all routes below
router.use(authenticateToken);

// Retrieve all tasks for the logged-in user
router.get('/', async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const tasks = await AppDataSource.getRepository(Task).find({ where: { user: { id: userId } } });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new task
router.post('/', async (req: Request, res: Response) => {
  const { title, description, due_date } = req.body;
  try {
    const userId = (req as any).user.userId;
    const taskRepository = AppDataSource.getRepository(Task);
    const task = taskRepository.create({
      title,
      description,
      due_date,
      status: 'pending',
      user: { id: userId }
    });
    await taskRepository.save(task);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update an existing task
router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, description, status, due_date } = req.body;
  try {
    const userId = (req as any).user.userId;
    const taskRepository = AppDataSource.getRepository(Task);
    let task = await taskRepository.findOne({ where: { id: parseInt(id), user: { id: userId } } });
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    task = { ...task, title, description, status, due_date };
    await taskRepository.save(task);
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a task
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const userId = (req as any).user.userId;
    const taskRepository = AppDataSource.getRepository(Task);
    const task = await taskRepository.findOne({ where: { id: parseInt(id), user: { id: userId } } });
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    await taskRepository.remove(task);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
