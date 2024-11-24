import React, { useState } from "react";
import "./App.css";

const TodoList = () => {
  const [todos, setTodos] = useState<{ text: string; completed: boolean }[]>(
    []
  );
  const [newTodo, setNewTodo] = useState<string>("");

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { text: newTodo.trim(), completed: false }]);
      setNewTodo("");
    }
  };

  const toggleTodo = (index: number) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const calculateProgress = () => {
    if (todos.length === 0) return 0;
    const completedTasks = todos.filter((todo) => todo.completed).length;
    return Math.floor((completedTasks / todos.length) * 100);
  };

  return (
    <div className="page-content">
      <h2 className="header">To-Do List with Progress</h2>

      {/* Progress Bar */}
      <div className="progress-bar-wrapper">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>
        <p>{calculateProgress()}% Completed</p>
      </div>

      {/* To-Do List Form */}
      <div className="wrapper">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTodo}>Add Task</button>
      </div>

      {/* To-Do List Items */}
      <ul style={{ width: "80vw", fontSize: "3vw" }}>
        {todos.map((todo, index) => (
          <li
            key={index}
            className={todo.completed ? "completed" : ""}
            onClick={() => toggleTodo(index)}
            style={{
              cursor: "pointer",
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;