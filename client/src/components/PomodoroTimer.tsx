import React, { useState, useEffect } from 'react';
import './App.css';

const PomodoroTimer = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsRunning(false);
            alert("Time's up!");
        }
        return () => clearInterval(timer);
    }, [isRunning, timeLeft]);

    const startTimer = () => setIsRunning(true);
    const resetTimer = () => {
        setTimeLeft(25 * 60);
        setIsRunning(false);
    };

    return (
        <div className="page-content">
            <h2 className="header">Pomodoro Timer</h2>
            <div className="wrapper">
                <p style={{ fontSize: '4vw' }}>
                    {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}
                </p>
                <button onClick={startTimer}>Start</button>
                <button onClick={resetTimer}>Reset</button>
            </div>
        </div>
    );
};

export default PomodoroTimer;