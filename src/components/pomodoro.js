import React, { useState, useEffect } from 'react';

function PomodoroTimer() {
  const [timer, setTimer] = useState(localStorage.getItem('remainingTime') || 25 * 60);
  const [isWorkPhase, setIsWorkPhase] = useState(localStorage.getItem('isWorkPhase') === 'true' || true);
  const [streakCount, setStreakCount] = useState(parseInt(localStorage.getItem('streakCount')) || 0);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const display = document.getElementById('time');
    display.textContent = `${Math.floor(timer / 60)}:${timer % 60 < 10 ? '0' : ''}${timer % 60}`;
    
    if (timer === 0) {
      if (isWorkPhase) {
        setStreakCount(streakCount + 1);
        // Save streaks to backend
        savePomodoroSession();
      }
      setIsWorkPhase(!isWorkPhase);
      setTimer(isWorkPhase ? 5 * 60 : 25 * 60);
    }

    if (intervalId) {
      clearInterval(intervalId);
    }
    const newIntervalId = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);
    setIntervalId(newIntervalId);

    return () => clearInterval(newIntervalId); // Cleanup on component unmount
  }, [timer, isWorkPhase]);

  useEffect(() => {
    window.addEventListener('beforeunload', saveToLocalStorage);
    return () => window.removeEventListener('beforeunload', saveToLocalStorage);
  }, [timer, isWorkPhase, streakCount]);

  const saveToLocalStorage = () => {
    localStorage.setItem('remainingTime', timer);
    localStorage.setItem('isWorkPhase', isWorkPhase);
    localStorage.setItem('streakCount', streakCount);
  };

  const savePomodoroSession = () => {
    fetch('/api/pomodoro_sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: 1, // Replace with dynamic user ID if available
        work_duration: '25:00',
        break_duration: '05:00',
        number_of_streaks: streakCount,
        stop_time: new Date().toISOString(),
      }),
    });
  };

  return (
    <div>
      <h1>Pomodoro Timer</h1>
      <div id="time"></div>
      <p>{isWorkPhase ? 'Work Phase' : 'Break Phase'}</p>
    </div>
  );
}

export default PomodoroTimer;