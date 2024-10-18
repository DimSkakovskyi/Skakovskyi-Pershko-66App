let workTime = 25 * 60; // 25 minutes in seconds
let breakTime = 5 * 60; // 5 minutes in seconds
let timer = 0;
let isWorkPhase = true; // Track work or break phase
let intervalId;

function startTimer(duration, display) {
  timer = duration;
  intervalId = setInterval(() => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    display.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

    if (--timer < 0) {
      isWorkPhase = !isWorkPhase;
      timer = isWorkPhase ? workTime : breakTime;
    }
  }, 1000);
}

// Load state on window load
window.onload = () => {
  const savedTime = localStorage.getItem('remainingTime');
  const savedPhase = localStorage.getItem('isWorkPhase');
  
  if (savedTime) {
    timer = parseInt(savedTime);
    isWorkPhase = savedPhase === 'true';
  } else {
    timer = workTime; // Default to work time if no saved time
  }

  const display = document.querySelector('#time'); // Assuming you have an element with id "time"
  startTimer(timer, display);
};

// Save timer state before closing
window.addEventListener('beforeunload', () => {
  localStorage.setItem('remainingTime', timer);
  localStorage.setItem('isWorkPhase', isWorkPhase);
  
  const stopTime = new Date();
  fetch('/api/pomodoro_sessions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_id: 1, // Replace with dynamic user ID
      work_duration: '25:00',
      break_duration: '05:00',
      number_of_streaks: 1, // Adjust as necessary
      stop_time: stopTime.toISOString(),
    }),
  });
});
