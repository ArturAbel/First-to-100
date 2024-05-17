
//Variables
let player = 1;
let currentScore = 0;
const scores = { 1: 0, 2: 0 };

// Elements
const scoreInput = document.getElementById('instruction-input');
const instructions = document.getElementById('instructions');
const displayLimit = document.getElementById('points-limit');

//Buttons
const startBtn = document.getElementById('instruction-btn');
const rollBtn = document.getElementById('roll-btn');
const holdBtn = document.getElementById('hold-btn');

// Dice
const diceOne = document.getElementById('dice1');
const diceTwo = document.getElementById('dice2');

// Points
const playerOneTotal = document.getElementById('player1-total-points');
const playerTwoTotal = document.getElementById('player2-total-points');



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
   const totalScore = scoreInput.value;
   scoreInput.textContent = '';
   instructions.style.display = 'none';
   game(totalScore);
});

 


function game(totalScore) {
   
   //Display total score
   displayLimit.textContent = totalScore;

   //Roll dices
   rollBtn.addEventListener('click', function(){

      const rollOne = Math.floor(Math.random() * 6) + 1;
      const rollTwo = Math.floor(Math.random() * 6) + 1;
      diceOne.src = `./assets/images/dice/${rollOne}.png`;
      diceTwo.src = `./assets/images/dice/${rollTwo}.png`;

      currentScore += (rollOne + rollTwo);
      document.getElementById(`player${player}-current-points`).textContent = currentScore;

      //Enable hold button
      holdBtn.disabled = false;

      if (rollOne === 6 && rollTwo === 6) {
         //if 6 and 6
      }
      

   

   });
}


//Hold button


// Switch Player
function switchPlayer() {
   
   document.getElementById(`player${player}`).classList.remove('current-player');
   currentScore = 0;
   player = player === 1 ? 2 : 1;
   document.getElementById(`player${player}`).classList.add('current-player');
   holdBtn.disabled = true;
}


