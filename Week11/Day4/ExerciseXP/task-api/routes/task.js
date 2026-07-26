const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const filePath = path.join(__dirname, '../tasks.json');

function readTasks() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2));
    return [];
  }
  try {
    const fileData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileData) || [];
  } catch (error) {
    return [];
  }
}

function writeTasks(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

router.get('/', (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});


router.get('/:id', (req, res) => {
  const tasks = readTasks();
  const task = tasks.find(t => t.id === req.params.id);
  
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  
  res.json(task);
});


router.post('/', (req, res) => {
  const tasks = readTasks();
  
  const newTask = {
    id: Date.now().toString(),
    title: req.body.title,
    completed: req.body.completed || false,
    ...req.body
  };
  
  tasks.push(newTask);
  writeTasks(tasks);
  
  res.status(201).json({ message: 'Task created successfully', newTask });
});


router.put('/:id', (req, res) => {
  const tasks = readTasks();
  const taskIndex = tasks.findIndex(t => t.id === req.params.id);
  
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  
  
  tasks[taskIndex] = { ...tasks[taskIndex], ...req.body, id: req.params.id };
  writeTasks(tasks);
  
  res.json({ message: 'Task updated successfully', updatedTask: tasks[taskIndex] });
});

router.delete('/:id', (req, res) => {
  const tasks = readTasks();
  const taskIndex = tasks.findIndex(t => t.id === req.params.id);
  
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  
  const deletedTask = tasks.splice(taskIndex, 1);
  writeTasks(tasks);
  
  res.json({ message: 'Task deleted successfully', deletedTask: deletedTask[0] });
});


module.exports = router;

