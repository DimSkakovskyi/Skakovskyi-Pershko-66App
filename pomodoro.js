let workTime = 25 * 60;  // 25 minutes
let breakTime = 5 * 60;  // 5 minutes

function startTimer(duration, display) {
  let timer = duration, minutes, seconds;
  setInterval(() => {
    minutes = Math.floor(timer / 60);
    seconds = timer % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;
    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      timer = duration;
    }
  }, 1000);
}

window.addEventListener('beforeunload', () => {
  const currentTime = timer; // Store the remaining time
  localStorage.setItem('remainingTime', currentTime);
  localStorage.setItem('isWorkPhase', isWorkPhase); // Save work/break phase
});

window.onload = () => {
  let remainingTime = localStorage.getItem('remainingTime') || workTime;
  let isWorkPhase = JSON.parse(localStorage.getItem('isWorkPhase')) || true; // Determine phase

  startTimer(remainingTime, display, isWorkPhase);
};

window.addEventListener('beforeunload', async () => {
  const stopTime = new Date();
  await fetch('/api/pomodoro_sessions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_id: userId,
      work_duration: '25:00', // Or dynamic value
      break_duration: '05:00',
      number_of_streaks: streakCount,
      stop_time: stopTime.toISOString(),
    }),
  });
});

  
