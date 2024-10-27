import React, { useState } from 'react';
import './App.css';

const TodoList = () => {
    const [todos, setTodos] = useState<string[]>([]);
    const [newTodo, setNewTodo] = useState('');

    const addTodo = () => {
        if (newTodo) {
            setTodos([...todos, newTodo]);
            setNewTodo('');
        }
    };

    return (
        <div className="page-content">
            <h2 className="header">To-Do List</h2>
            <div className="wrapper">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new task"
                />
                <button onClick={addTodo}>Add Task</button>
                <ul style={{ width: '80vw', fontSize: '3vw' }}>
                    {todos.map((todo, index) => (
                        <li key={index}>{todo}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TodoList;