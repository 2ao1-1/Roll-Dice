'use strict';

// selected  element
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');

// buttons
const diceEl = document.querySelector('.dice');
const newGame = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

// set the initial values
let scores, currentScore, activePlayer, playing;
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0.textContent = score1.textContent = 0;
  current0.textContent = current1.textContent = 0;
  diceEl.classList.add('hidden');

  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};
init();

//switch function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

// start the game
rollBtn.addEventListener('click', function () {
  if (playing) {
    //scroll the dice
    const dice = Math.trunc(Math.random() * 6 + 1);

    //showing the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //check if dice = 1
    if (dice !== 1) {
      //add current sore
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

// hold the score
holdBtn.addEventListener('click', function () {
  if (playing) {
    //add current score to active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //check if score >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      //finish game
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //switch
      switchPlayer();
    }
  }
});

// reset button for new game
newGame.addEventListener('click', init);
