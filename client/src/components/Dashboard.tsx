import React, { useState, useEffect } from 'react';
import './App.css';

const Dashboard = () => {
    const [progress, setProgress] = useState(0);
    const [streak, setStreak] = useState(0);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch('/api/habits/progress')
            .then((response) => response.json())
            .then((data) => {
                setProgress(data.progress);
                setStreak(data.streak);
                setMessage(data.message);
            })
            .catch((error) => console.error('Error fetching progress:', error));
    }, []);

    return (
        <div className="dashboard-container">
            <div className="progress-bar">
                <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <div className="streak-counter">
                <p>🔥 Streak: {streak} days</p>
            </div>
            <div className="motivational-message">
                <p>{message}</p>
            </div>
        </div>
    );
};

export default Dashboard;