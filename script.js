//Game State
let answer = 0;
let guessCount = 0;
let totalWins = 0;
let totalGuesses = 0;
let scores = [];

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