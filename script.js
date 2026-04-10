// Game State
let answer = 0;
let guessCount = 0;
let totalWins = 0;
let scores = [];
let times = [];
let fastestTime = Infinity;
let startTime = 0;
let currentRange = 3;

// Player Name
let playerName = prompt("Enter your name:", "enter name here") || "Player";
playerName =
  playerName.charAt(0).toUpperCase() +
  playerName.slice(1).toLowerCase();

alert("Hello, " + playerName + ". Goodluck guessing ;)");

// Month Names
let monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function daySuffix(day) {
  if (day >= 11 && day <= 13) return day + "th";
  let last = day % 10;
  if (last === 1) return day + "st";
  if (last === 2) return day + "nd";
  if (last === 3) return day + "rd";
  return day + "th";
}

function time() {
  let now = new Date();
  let month = monthNames[now.getMonth()];
  let day = daySuffix(now.getDate());
  let year = now.getFullYear();

  let h = now.getHours();
  let m = now.getMinutes();
  let s = now.getSeconds();

  let ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;

  let mm = m < 10 ? "0" + m : m;
  let ss = s < 10 ? "0" + s : s;

  return month + " " + day + ", " + year + " · " + h + ":" + mm + ":" + ss + " " + ampm;
}

// Live Date/Time
document.getElementById("date").textContent = time();
setInterval(function () {
  document.getElementById("date").textContent = time();
}, 1000);

// Start leaderboard as empty
let leaderboardItems = document.getElementsByName("leaderboard");
for (let i = 0; i < leaderboardItems.length; i++) {
  leaderboardItems[i].textContent = "--";
}

function play() {
  let radios = document.getElementsByName("level");
  let range = 3;

  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      range = parseInt(radios[i].value);
    }
  }

  currentRange = range;
  answer = Math.floor(Math.random() * range) + 1;
  guessCount = 0;
  startTime = new Date().getTime();

  document.getElementById("msg").textContent =
    playerName + ", guess a number between 1 and " + range;
  document.getElementById("guess").value = "";

  document.getElementById("guessBtn").disabled = false;
  document.getElementById("giveUpBtn").disabled = false;
  document.getElementById("playBtn").disabled = true;

  for (let i = 0; i < radios.length; i++) {
    radios[i].disabled = true;
  }
}

function makeGuess() {
  let input = document.getElementById("guess").value;
  let num = parseInt(input);

  if (isNaN(num)) {
    document.getElementById("msg").textContent = "Please enter a valid number!";
    return;
  }

  guessCount++;
  let diff = Math.abs(num - answer);
  let temp = "";

  if (diff <= 2) {
    temp = "Hot!";
  } else if (diff <= 5) {
    temp = "Warm!";
  } else {
    temp = "Cold!";
  }

  if (num === answer) {
    totalWins++;
    document.getElementById("msg").textContent =
      "Correct! " + playerName + " got it in " + guessCount + " guesses!";
    updateScore(guessCount);
    updateTimers(new Date().getTime());
    reset();
  } else if (num > answer) {
    document.getElementById("msg").textContent = "Too high. " + temp;
  } else {
    document.getElementById("msg").textContent = "Too low. " + temp;
  }
}

function updateScore(score) {
  scores.push(score);
  scores.sort(function (a, b) {
    return a - b;
  });

  document.getElementById("wins").textContent = "Total wins: " + totalWins;

  let totalScore = 0;
  for (let i = 0; i < scores.length; i++) {
    totalScore += scores[i];
  }

  let avgScore = totalScore / scores.length;
  document.getElementById("avgScore").textContent =
    "Average Score: " + avgScore.toFixed(1);

  let leaderboard = document.getElementsByName("leaderboard");
  for (let i = 0; i < leaderboard.length; i++) {
    if (i < scores.length) {
      leaderboard[i].textContent = scores[i];
    } else {
      leaderboard[i].textContent = "--";
    }
  }
}

function updateTimers(endMs) {
  let timeTaken = (endMs - startTime) / 1000;
  times.push(timeTaken);

  if (timeTaken < fastestTime) {
    fastestTime = timeTaken;
  }

  let totalTime = 0;
  for (let i = 0; i < times.length; i++) {
    totalTime += times[i];
  }

  let avgTime = totalTime / times.length;

  document.getElementById("fastest").textContent =
    "Fastest Game: " + fastestTime.toFixed(1) + "s";
  document.getElementById("avgTime").textContent =
    "Average Time: " + avgTime.toFixed(1) + "s";
}

function reset() {
  document.getElementById("guessBtn").disabled = true;
  document.getElementById("giveUpBtn").disabled = true;
  document.getElementById("playBtn").disabled = false;

  let radios = document.getElementsByName("level");
  for (let i = 0; i < radios.length; i++) {
    radios[i].disabled = false;
  }
}

function giveUp() {
  document.getElementById("msg").textContent =
    "The answer was " + answer + ". Better luck next time!";

  updateScore(currentRange);
  updateTimers(new Date().getTime());
  reset();
}

document.getElementById("playBtn").addEventListener("click", play);
document.getElementById("guessBtn").addEventListener("click", makeGuess);
document.getElementById("giveUpBtn").addEventListener("click", giveUp);