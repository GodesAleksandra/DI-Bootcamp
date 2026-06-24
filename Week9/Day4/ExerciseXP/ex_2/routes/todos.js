const express = require('express')
const router = express.Router()

const todos = [
  { id: 1, task: "visit a doctor" },
  { id: 2, task: "go to the shop" }
];

// Get all to-do items
router.get('/todos', (req, res) => {
    res.json(todos);
});

// Add a new to-do item
router.post('/todos', (req, res) => {
    const { id, task } = req.body;
    const newTodo = { id: todos.length + 1, name };
    books.push(newTodo);
    res.status(201).json(newTodo);
});

// Update a to-do item by ID
router.put('/todos/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = todos.findIndex((todo) => todo.id === id);
    if (index === -1) {
        return res.status(404).send("Todo not found");
    }
    const updatedTodo = {
        id: todos[index].id,
        name: req.body.name,
    };
    todos[index] = updatedTodo;
    res.status(200).json("Todo updated");
});

// Delete a to-do item by ID
router.delete('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const todoIndex = todos.findIndex((t) => t.id === todoId);
    if (todoIndex === -1) {
        return res.status(404).json({ error: "Todo not found" });
    }
    todos.splice(todoIndex, 1);
    res.status(200).json({ message: "Todo deleted successfully" });
});

module.exports = router;