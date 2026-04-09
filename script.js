//Game State
let answer = 0;
let guessCount = 0;
let totalWins = 0;
let totalGuesses = 0;
let scores = [];
let timerInterval;
let seconds = 0;
let startTime; 
let times = []; // Array to store all completion times
let fastestTime = Infinity; 

//Player Name
let playerName = prompt("Enter your name:","enter name here");
alert("Hello, " + playerName +". Goodluck guessing ;)");

var monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

function daySuffix(day) {
  if (day >= 11 && day <= 13) return day + "th";
  var last = day % 10;
  if (last === 1) return day + "st";
  if (last === 2) return day + "nd";
  if (last === 3) return day + "rd";
  return day + "th";
}

function time() {
  var now = new Date();
  var month = monthNames[now.getMonth()];
  var day   = daySuffix(now.getDate());
  var year  = now.getFullYear();

  var h = now.getHours();
  var m = now.getMinutes();
  var s = now.getSeconds();
  var ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  var mm = m < 10 ? "0" + m : m;
  var ss = s < 10 ? "0" + s : s;

  return month + " " + day + ", " + year + "  ·  " + h + ":" + mm + ":" + ss + " " + ampm;
}

// Update the clock immediately and every second
document.getElementById("date").textContent = time();
setInterval(function() {
  document.getElementById("date").textContent = time();
}, 1000);



//Play
//get level
document.getElementById("playBtn").addEventListener("click", function(){
    let radios = document.getElementsByName("level");
    let range = 3;
    for(let i=0; i < radios.length; i++){
        if(radios[i].checked){
            range = parseInt(radios[i].value);
        }
    }

//round setup
answer = Math.floor(Math.random() * range) + 1;
guessCount = 0; //reset guess count for new round

//disable and enable buttons and radio choices

document.getElementById("msg").textContent = playerName + ", guess a number between 1 and " + range;
document.getElementById("guess").value="";
document.getElementById("guessBtn").disabled = false;
document.getElementById("giveUpBtn").disabled = false;
document.getElementById("playBtn").disabled = true;


let levelRadios = document.getElementsByName("level");

 for(let i=0; i < levelRadios.length; i++){
        levelRadios[i].disabled = true;
        }
    startTime = Date.now(); 

    //round setup
    answer = Math.floor(Math.random() * range) + 1;
    // ... existing playBtn code ...

});

//Guessing
document.getElementById("guessBtn").addEventListener("click", function(){
    let input = document.getElementById("guess").value;
    let num = parseInt(input);

    if (isNaN(num)){
        document.getElementById("msg").textContent = "Please enter a valid number!"
        return;
    }

    guessCount ++;
    let diff = Math.abs(num - answer);
    
    //correct
    if(num === answer){
        document.getElementById("msg").textContent = "Correct! " + playerName + " got it in " + guessCount + " guesses!";
    updateScore(guessCount);
    resetButtons(); //stop guessing and give up restart play
    }

 //higher
    else if (num > answer){
        let temp = "";
        if(diff <= 2){
            temp = "Hot!";
        } else if (diff <= 5){
            temp = "Warm!";
        } else {
            temp = "Cold!";
        }

        document.getElementById("msg").textContent = "Too high. " + temp;
    }
//lower
    else{
               let temp = "";
        if(diff <= 2){
            temp = "Hot!";
        } else if (diff <= 5){
            temp = "Warm!";
        } else {
            temp = "Cold!";
        }

        document.getElementById("msg").textContent = "Too low. " + temp;
    }


})

//update score when win
function updateScore(score){
    totalWins ++;
    totalGuesses += score;
//score for round and average
    document.getElementById("wins").textContent = "Total wins: " + totalWins;
    document.getElementById("avgScore").textContent = "Average score: " + (totalGuesses / totalWins).toFixed(1);


    let levelRadios = document.getElementsByName("level");
    for(let i=0; i < levelRadios.length; i++){
        levelRadios[i].disabled = false;
    }
      // 1. ALWAYS calculate the time first so the data exists
    let endTime = Date.now();
    let timeTaken = (endTime - startTime) / 1000; 
    times.push(timeTaken); // Now the 'times' array has a number in it!

    // 2. Update basic stats
    totalWins++;
    totalGuesses += score;
    document.getElementById("wins").textContent = "Total wins: " + totalWins;
    document.getElementById("avgScore").textContent = "Average score: " + (totalGuesses / totalWins).toFixed(1);

    // 3. Update Fastest Time
    if (timeTaken < fastestTime) {
        fastestTime = timeTaken;
        document.getElementById("fastest").textContent = "Fastest Game: " + fastestTime.toFixed(1) + "s";
    }

    // 4. Calculate Average Time (This won't be NaN anymore!)
    let totalTime = times.reduce((a, b) => a + b, 0);
    let avgTime = (totalTime / times.length).toFixed(1);
    document.getElementById("avgTime").textContent = "Average Time: " + avgTime + "s";


    let leaderboard = document.getElementsByName("leaderboard");
    for(let i =0; i < leaderboard.length; i++){
        if(i < scores.length){
            leaderboard[i].textContent = scores[i];
        }
        else{
            leaderboard[i].textContent = "--";
        }
    }

        // --- TIME CALCULATIONS ---

    times.push(timeTaken);

    // Update Fastest Time
    if (timeTaken < fastestTime) {
        fastestTime = timeTaken;
        document.getElementById("fastest").textContent = "Fastest Game: " + fastestTime.toFixed(1) + "s";
    }


}

function resetButtons(){
    document.getElementById("guessBtn").disabled = true;
    document.getElementById("giveUpBtn").disabled = true;
    document.getElementById("playBtn").disabled = false;


    let levelRadios = document.getElementsByName("level");

    for(let i=0; i < levelRadios.length; i++){
            levelRadios[i].disabled = false;
        }


}


//give up 
document.getElementById("giveUpBtn").addEventListener("click", function() {
    clearInterval(timerInterval);
    document.getElementById("msg").textContent = "The answer was " + answer + ". Better luck next time!";
    resetButtons();
});

