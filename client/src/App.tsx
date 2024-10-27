import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RegistrationPage from './pages/RegistrationPage';
import TodoPage from './pages/TodoPage';
import PomodoroPage from './pages/PomodoroPage';

function App() {
    return (
        <Router>
            <nav>
                <Link to="/">Register</Link> | 
                <Link to="/todo">To-Do List</Link> | 
                <Link to="/pomodoro">Pomodoro</Link>
            </nav>
            <Routes>
                <Route path="/" element={<RegistrationPage />} />
                <Route path="/todo" element={<TodoPage />} />
                <Route path="/pomodoro" element={<PomodoroPage />} />
            </Routes>
        </Router>
    );
}

export default App;