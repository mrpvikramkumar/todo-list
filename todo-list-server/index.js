const express = require("express");
const app = express();
const port = 8000;

app.use(express.json());

// Simulated in-memory database
let todos = [];
let todoId = 1;

// Route to return the list of to-do items
app.get("/todos", (req, res) => {
  res.json(todos);
});

// Route to add a new to-do item
app.post("/todos", (req, res) => {
  const newTodo = req.body;
  newTodo.id = todoId++;
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Route to delete a specific to-do item by its ID
app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter((todo) => todo.id !== id);
  res.json({ message: "Todo deleted successfully" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
