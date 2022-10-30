const timeLeft = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");
let countDown;
function timer(seconds) {
  clearInterval(countDown);
  const now = Date.now();
  const then = now + seconds * 1000;

  displayTimeLeft(seconds);
  displayEndTime(then);

  countDown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // sotop form -ve value
    if (secondsLeft < 0) {
      clearInterval(countDown);
      return;
    }
    //display it
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  let minutes = Math.floor(seconds / 60);
  const remainSeconds = seconds % 60;
  const display = `${minutes}:${remainSeconds < 10 ? "0" : ""}${remainSeconds}`;
  timeLeft.innerHTML = display;
  document.title = display;
}

function displayEndTime(timeStamp) {
  const end = new Date(timeStamp);
  const hours = end.getHours();
  const minutes = end.getMinutes();

  const hoursData = `${hours < 10 ? "0" : ""}${
    hours > 12 ? hours - 12 : hours
  }`;

  endTime.textContent = `Be Back At ${hoursData}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach((button) => {
  button.addEventListener("click", startTimer);
});

document.customForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const mins = this.minutes.value;
  console.log(mins);
  timer(mins * 60);
  this.reset();
});
