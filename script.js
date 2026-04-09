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
startTime = new Date().getTime(); // Records current time in milliseconds
seconds = 0; // Reset seconds for the display

// Keep your setInterval here to update the display every second
clearInterval(timerInterval);
timerInterval = setInterval(function() {
    seconds++;
    document.getElementById("avgTime").textContent = "Time: " + seconds + "s";
}, 1000);

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

//     Elapsed Time
    let endTime = new Date().getTime();
    let elapsedSeconds = Math.floor((endTime - startTime) / 1000);
    times.push(elapsedSeconds);

    // 2. Update Fastest Time
    if (elapsedSeconds < fastestTime) {
        fastestTime = elapsedSeconds;
    }
  // STOP THE TIMER HERE
    clearInterval(timerInterval);

    document.getElementById("guessBtn").disabled = true;
    document.getElementById("giveUpBtn").disabled = true;
    document.getElementById("playBtn").disabled = false;

    let levelRadios = document.getElementsByName("level");
    for(let i=0; i < levelRadios.length; i++){
        levelRadios[i].disabled = false;
    }
    // 3. Calculate Average Time
    let totalTime = times.reduce((a, b) => a + b, 0);
    let avgTime = (totalTime / times.length).toFixed(1);
    //update leaderboard
    scores.push(score);
    scores.sort(function(a,b){return a-b;});

    let leaderboard = document.getElementsByName("leaderboard");
    for(let i =0; i < leaderboard.length; i++){
        if(i < scores.length){
            leaderboard[i].textContent = scores[i];
        }
        else{
            leaderboard[i].textContent = "--";
        }
    }
        document.getElementById("fastest").textContent = "Fastest Game: " + fastestTime + "s";
    document.getElementById("avgTime").textContent = "Average Time: " + avgTime + "s";
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