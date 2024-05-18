
//Variables
let player = 1;
let totalScore = 0;
let currentScore = 0;
let scores = { 1: 0, 2: 0 };
const diceSounds = [];


// Elements
const scoreInput = document.getElementById('instruction-input');
const instructions = document.getElementById('instructions');
const displayLimit = document.getElementById('points-limit');

//Buttons
const startBtn = document.getElementById('instruction-btn');
const rollBtn = document.getElementById('roll-btn');
const holdBtn = document.getElementById('hold-btn');
const newGame = document.getElementById('new-btn');

// Dice
const diceOne = document.getElementById('dice1');
const diceTwo = document.getElementById('dice2');

//Audio
for (let i = 1; i <= 4; i++) {
   diceSounds[i] = new Audio(`./assets/audio/${i}.wav`);
}



// Verify score and enable start button
scoreInput.addEventListener('input', function(){
   const scoreValue  = scoreInput.value;
   if (scoreValue  >= 12 && scoreValue  <= 999) {
      startBtn.disabled  = false;
   }
   else{
      startBtn.disabled  = true;
   }
});




// Start the game
startBtn.addEventListener('click', function(){
   totalScore = scoreInput.value;
   scoreInput.textContent = '';
   instructions.style.display = 'none';
   game(totalScore);
});

 

// New game initiation
function game(totalScore) {
   
   //Display total score
   displayLimit.textContent = totalScore;

   rollBtn.removeEventListener('click', rollDice);
   rollBtn.addEventListener('click', rollDice);
}




   // Roll dice function
   function rollDice() {
      const rollOne = Math.floor(Math.random() * 6) + 1;
      const rollTwo = Math.floor(Math.random() * 6) + 1;
      diceOne.src = `./assets/images/dice/${rollOne}.png`;
      diceTwo.src = `./assets/images/dice/${rollTwo}.png`;
      randomAudio();

      currentScore += (rollOne + rollTwo);
      document.getElementById(`player${player}-current-points`).textContent = currentScore;

      // Enable hold button
      holdBtn.disabled = false;

      // If dices are 6 & 6
   if (rollOne === 6 && rollTwo === 6) {
      scores[player] += currentScore - 12;
      document.getElementById(`player${player}-total-points`).textContent = scores[player];
      checkPoints();
   }
}




// Switch Player
function changePlayer() {
   currentScore = 0;
   document.getElementById(`player${player}-current-points`).textContent = currentScore;
   document.getElementById(`player${player}`).classList.remove('current-player');
   player = player === 1 ? 2 : 1;
   document.getElementById(`player${player}`).classList.add('current-player');
   holdBtn.disabled = true;
}



//Hold button
holdBtn.addEventListener('click', function(){

   scores[player] += currentScore;
   document.getElementById(`player${player}-total-points`).textContent = scores[player];
   checkPoints();
});




// Check points
function checkPoints() {
   if(scores[player] == totalScore){

      document.querySelector(`#player${player} > .player-upper > .player-title`).textContent = 'Super Win!';
      document.getElementById(`player${player}`).classList.add('winner');
      disableButtons();
   }

   // If score is greater
   else if(scores[player] > totalScore) {

      document.querySelector(`#player${player} > .player-upper > .player-title`).textContent = 'Looser!';
      document.getElementById(`player${player}`).classList.remove('current-player');
      player = player === 1 ? 2 : 1;
      document.getElementById(`player${player}`).classList.add('winner');
      const winner = document.querySelector(`#player${player} > .player-upper > .player-title`);
      winner.textContent = 'Winner!';
      disableButtons()
   }
   else{
      changePlayer();
   }
}



// Reset the game
newGame.addEventListener('click', function(){
   currentScore = 0;

   for (let i = 1; i <= 2; i++) {
      scores[i] = 0;
      document.getElementById(`player${i}-total-points`).textContent = scores[i];
      document.getElementById(`player${i}-current-points`).textContent = 0;
      document.querySelector(`#player${i} > .player-upper > .player-title`).textContent = `Player ${i}`;
   }

   document.getElementById(`player${player}`).classList.remove('winner');
   document.getElementById(`player${player}`).classList.remove('current-player');
   document.getElementById(`player1`).classList.add('current-player');
   player = 1;
   rollBtn.disabled = false;
   instructions.style.display = 'block';
});




// Disable roll & hold buttons
function disableButtons() {
   rollBtn.disabled = true;
   holdBtn.disabled = true;
}




// Random dice audio
function randomAudio() {
   const index = Math.floor(Math.random() * 4 + 1);
   diceSounds[index].play();
}