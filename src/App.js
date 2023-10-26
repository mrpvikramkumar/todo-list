import React, { useState, useEffect } from "react";
import "./App.css";
function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask) {
      // Create a new to-do item with an ID and the task description
      const newTodo = {
        id: tasks.length,
        task: newTask,
      };

      setTasks([...tasks, newTodo]);

      setNewTask("");

      // Send a POST request to the server to add the new task
      fetch("/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo), // Send the new to-do item to the server
      })
        .then((response) => response.json())
        .then((data) => {
          // You can handle the response from the server, but it's not required for displaying the added task in the UI
        });
    }
  };

  const handleDeleteTask = (id) => {
    fetch(`/todos/${id}`, {
      method: "DELETE",
    }).then(() => {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
    });
  };

  useEffect(() => {
    fetch("/todos")
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div>
        <input
          className="styled-input"
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        &nbsp;
        <button className="gradient-button" onClick={handleAddTask}>
          Add
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li className="list-item" key={task.id}>
            {task.task}
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
