import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/Dashboard.css";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  due_date: string;
}

const TaskDashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', due_date: '' });
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/tasks', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTasks(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, [token]);

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/tasks', newTask, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks([...tasks, res.data]);
      setNewTask({ title: '', description: '', due_date: '' });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (taskId: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error(error);
    }
  };

  const markAsCompleted = async (taskId: number) => {
    try {
      const updatedTask = tasks.find(task => task.id === taskId);
      if (!updatedTask) return;

      const res = await axios.put(
        `http://localhost:5000/api/tasks/${taskId}`,
        { ...updatedTask, status: 'Completed' },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTasks(tasks.map(task => (task.id === taskId ? res.data : task)));
    } catch (error) {
      console.error(error);
    }
  };

  const startEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const updateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTask) return;

    try {
      const res = await axios.put(
        `http://localhost:5000/api/tasks/${editingTask.id}`,
        editingTask,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTasks(tasks.map(task => (task.id === editingTask.id ? res.data : task)));
      setEditingTask(null);
    } catch (error) {
      console.error(error);
    }
  };

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); 
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
  
  <div className="dashboard-content">
    {/* Left Column - Task Form */}
    <div className="task-form">
      <h3>{editingTask ? 'Edit Task' : 'Add New Task'}</h3>
      <form onSubmit={editingTask ? updateTask : addTask}>
        <input
          type="text"
          placeholder="Title"
          value={editingTask ? editingTask.title : newTask.title}
          onChange={(e) =>
            editingTask
              ? setEditingTask({ ...editingTask, title: e.target.value })
              : setNewTask({ ...newTask, title: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={editingTask ? editingTask.description : newTask.description}
          onChange={(e) =>
            editingTask
              ? setEditingTask({ ...editingTask, description: e.target.value })
              : setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <input
          type="date"
          placeholder="Due Date"
          value={editingTask ? editingTask.due_date : newTask.due_date}
          onChange={(e) =>
            editingTask
              ? setEditingTask({ ...editingTask, due_date: e.target.value })
              : setNewTask({ ...newTask, due_date: e.target.value })
          }
        />
        <button type="submit">{editingTask ? 'Update Task' : 'Add Task'}</button>
        {editingTask && <button onClick={() => setEditingTask(null)} className="cancel-btn">Cancel</button>}
      </form>
    </div>

    {/* Right Column - Task List */}
    <div className="task-list">
      <h3>Task List</h3>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className="task-item">
          <div className="task-details">
            <h4 className="task-title">{task.title}</h4>
            <p className="task-description">{task.description || "No description provided"}</p>
            <p className="task-status">
              <span>Status:</span> <strong>{task.status}</strong>
            </p>
            <p className="task-due">
              <span>Due Date:</span> {task.due_date ? new Date(task.due_date).toLocaleDateString() : "Not set"}
            </p>
          </div>
          
          <div className="task-buttons">
            <button onClick={() => startEditTask(task)}>Edit</button>
            <button onClick={() => deleteTask(task.id)} className="delete-btn">Delete</button>
            {task.status !== 'Completed' && (
              <button onClick={() => markAsCompleted(task.id)} className="complete-btn">Mark as Completed</button>
            )}
          </div>
        </li>
        ))}
      </ul>
    </div>
  </div>
</div>

  );
};

export default TaskDashboard;
