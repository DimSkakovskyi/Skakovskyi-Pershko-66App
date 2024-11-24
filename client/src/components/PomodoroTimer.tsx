import React, { useState, useEffect } from 'react';
import './App.css';

const PomodoroTimer = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const progress = ((25 * 60 - timeLeft) / (25 * 60)) * 100;

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    const alarm = new Audio('/assets/alarm.mp3');

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
    const stopTimer = () => setIsRunning(false);

    const [isBreak, setIsBreak] = useState(false);

    useEffect(() => {
        if (timeLeft === 0) {
            alarm.play();
            if (isBreak) {
                alert("Break over, back to work!");
                setIsBreak(false);
                setTimeLeft(25 * 60);
            } else {
                alert("Time's up! Take a break!");
                setIsBreak(true);
                setTimeLeft(5 * 60);
            }
        }
    }, [timeLeft, isBreak]);

    return (
        <div className="page-content">
            <h2 className="header">Pomodoro Timer</h2>
            <div className="wrapper">
                <div className="progress-bar">
                     <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
            <p style={{ fontSize: '4vw' }}>{formatTime(timeLeft)}</p>
            <button onClick={startTimer} disabled={isRunning}>Start</button>
            <button onClick={resetTimer} disabled={timeLeft === 25 * 60}>Reset</button>
            <button onClick={stopTimer}>Stop</button>
            </div>
        </div>
    );
};

export default PomodoroTimer;