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
