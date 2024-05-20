import {
  MIN_SCORE,
  MAX_SCORE,
  DOUBLE_SIX,
  DICE_SIX,
  diceSounds,
} from "./constants.js";
import {
  scoreInput,
  instructions,
  displayLimit,
  startBtn,
  rollBtn,
  holdBtn,
  newGame,
  diceOne,
  diceTwo,
} from "./domElements.js";

let player = 1;
let totalScore = 0;
let currentScore = 0;
let scores = { 1: 0, 2: 0 };





//-------------------//
//---- Check Input---//
//-------------------//

scoreInput.addEventListener("input", function () {
  const scoreValue = scoreInput.value;
  startBtn.disabled = !(scoreValue >= MIN_SCORE && scoreValue <= MAX_SCORE);
});





//----------------------//
//---- Start The Game --//
//----------------------//

startBtn.addEventListener("click", function () {
  totalScore = scoreInput.value;
  scoreInput.textContent = "";
  instructions.style.display = "none";
  game(totalScore);
});


function game(totalScore) {
  displayLimit.textContent = totalScore;
  rollBtn.removeEventListener("click", rollDice);
  rollBtn.addEventListener("click", rollDice);
}





//----------------------//
//---- Dice Roll -------//
//----------------------//

function rollDice() {
  const rollOne = Math.floor(Math.random() * DICE_SIX) + 1;
  const rollTwo = Math.floor(Math.random() * DICE_SIX) + 1;
  diceOne.src = `./assets/images/dice/${rollOne}.png`;
  diceTwo.src = `./assets/images/dice/${rollTwo}.png`;
  randomAudio();

  currentScore += rollOne + rollTwo;
  document.getElementById(`player${player}-current-points`).textContent =
    currentScore;

  // Enable hold button
  holdBtn.disabled = false;

  // If dices are 6 & 6
  if (rollOne === DICE_SIX && rollTwo === DICE_SIX) {
    scores[player] += currentScore - DOUBLE_SIX;
    document.getElementById(`player${player}-total-points`).textContent =
      scores[player];
    checkPoints();
  }
}





//----------------------//
//---- Switch Player ---//
//----------------------//

 function changePlayer() {
  currentScore = 0;
  document.getElementById(`player${player}-current-points`).textContent =
    currentScore;
  document.getElementById(`player${player}`).classList.remove("current-player");
  player = player === 1 ? 2 : 1;
  document.getElementById(`player${player}`).classList.add("current-player");
  holdBtn.disabled = true;
}





//----------------------//
//---- Hold Button------//
//----------------------//

holdBtn.addEventListener("click", function () {
  scores[player] += currentScore;
  document.getElementById(`player${player}-total-points`).textContent =
    scores[player];
  checkPoints();
});





//---------------------//
//---- Check Points ---//
//---------------------//

function checkPoints() {
  if (scores[player] == totalScore) {
    document.querySelector(
      `#player${player} > .player-upper > .player-title`
    ).textContent = "Super Win!";
    document.getElementById(`player${player}`).classList.add("winner");
    disableButtons();
  } else if (scores[player] > totalScore) {
    document.querySelector(
      `#player${player} > .player-upper > .player-title`
    ).textContent = "Looser!";
    document
      .getElementById(`player${player}`)
      .classList.remove("current-player");
    player = player === 1 ? 2 : 1;
    document.getElementById(`player${player}`).classList.add("winner");
    const winner = document.querySelector(
      `#player${player} > .player-upper > .player-title`
    );
    winner.textContent = "Winner!";
    disableButtons();
  } else {
    changePlayer();
  }
}





//---------------------//
//---- Reset Game------//
//---------------------//
newGame.addEventListener("click", function () {
  currentScore = 0;

  for (let i = 1; i <= 2; i++) {
    scores[i] = 0;
    document.getElementById(`player${i}-total-points`).textContent = scores[i];
    document.getElementById(`player${i}-current-points`).textContent = 0;
    document.querySelector(
      `#player${i} > .player-upper > .player-title`
    ).textContent = `Player ${i}`;
  }

  document.getElementById(`player${player}`).classList.remove("winner");
  document.getElementById(`player${player}`).classList.remove("current-player");
  document.getElementById(`player1`).classList.add("current-player");
  player = 1;
  rollBtn.disabled = false;
  instructions.style.display = "block";
});





//-----------------------//
//---- Disable Buttons --//
//-----------------------//

function disableButtons() {
  rollBtn.disabled = true;
  holdBtn.disabled = true;
}





//---------------------------//
//---- Random Dice Audio-----//
//---------------------------//

function randomAudio() {
  const index = Math.floor(Math.random() * 4 + 1);
  diceSounds[index].play();
}
