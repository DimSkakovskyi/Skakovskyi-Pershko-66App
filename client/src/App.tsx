import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import TodoList from './TodoList';
import PomodoroTimer from './PomodoroTimer';
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="wrapper">
                <nav className="navbar">
                    <a href="/">Register</a>
                    <a href="/todo">To-Do List</a>
                    <a href="/pomodoro">Pomodoro Timer</a>
                </nav>
                <Routes>
                    <Route path="/" element={<RegistrationForm />} />
                    <Route path="/todo" element={<TodoList />} />
                    <Route path="/pomodoro" element={<PomodoroTimer />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;