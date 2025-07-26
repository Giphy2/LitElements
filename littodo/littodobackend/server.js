// server.js

const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const DATA_FILE = './data.json';

// Enable CORS so frontend can access this server
app.use(cors());

// Parse JSON request bodies
app.use(bodyParser.json());

// Utility: read tasks from data.json
function readTodos() {
  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(data);
}

// Utility: write tasks to data.json
function writeTodos(todos) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));
}

// GET /todos → return all tasks
app.get('/todos', (req, res) => {
  try {
    const todos = readTodos();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read todos.' });
  }
});

// POST /todos → add a new task
app.post('/todos', (req, res) => {
  const { text, dueDate, completed } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Task text is required.' });
  }

  try {
    const todos = readTodos();
    const newTask = {
      id: Date.now(), // simple unique ID
      text,
      dueDate: dueDate || '',
      completed: completed || false
    };
    todos.push(newTask);
    writeTodos(todos);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save todo.' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
