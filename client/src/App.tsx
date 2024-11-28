import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import TodoList from './TodoList';
import PomodoroTimer from './PomodoroTimer';
import './App.css';

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">To-Do List</Link></li>
          <li><Link to="/pomodoro">Pomodoro Timer</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/pomodoro" element={<PomodoroTimer />} />
        <Route path="/register" element={<RegistrationForm />} />
      </Routes>
    </Router>
  );
};

export default App;