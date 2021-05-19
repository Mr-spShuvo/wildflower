feather.replace();
function focusForm() {
  const input = document.querySelector('input[name="firstName"]');
  input.focus();
}

function getTimeRemaining(endtime) {
  const t = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((t / 1000) % 60);
  const minutes = Math.floor((t / 1000 / 60) % 60);
  const hours = Math.floor((t / (1000 * 60 * 60)) % 24);

  return {
    total: t,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  };
}

function initializeClock(id, endtime) {
  const clock = document.getElementById(id);
  const hoursSpan = clock.querySelector('.hours');
  const minutesSpan = clock.querySelector('.minutes');
  const secondsSpan = clock.querySelector('.seconds');

  const timeinterval = setInterval(updateClock, 1000);

  function updateClock() {
    const t = getTimeRemaining(endtime);

    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }
  updateClock();
}

const time = 20 * 50 * 50 * 1000;
const localDeadline = localStorage.getItem('wildflower-deadline');

let deadline;
if (!localDeadline) {
  deadline = new Date(Date.now() + time);
  localStorage.setItem('wildflower-deadline', deadline);
} else deadline = localDeadline;

if (new Date(deadline) < new Date()) {
  deadline = new Date(Date.now() + time);
  localStorage.setItem('wildflower-deadline', deadline);
}

initializeClock('clockdiv', deadline);
