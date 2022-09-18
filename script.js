const playerP1 = document.querySelector('.player_0');
const playerP2 = document.querySelector('.player_1');

let scoreP1 = document.getElementById('score_0');
let scoreP2 = document.getElementById('score_1');

let currentP1 = document.getElementById('current_0');
let currentP2 = document.getElementById('current_1');

const diceIcon = document.querySelector('.dice_pic');
const startBtn = document.querySelector('.start-btn');
const rollBtn = document.querySelector('.dice-btn');
const holdBtn = document.querySelector('.hold-btn');

let scores, currentScore, activePlayer, playing, currentWinnerTxt, currentWinner;

const NewGame = function() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    scoreP1.textContent = 0;
    scoreP2.textContent = 0;
    currentP1.textContent = 0;
    currentP2.textContent = 0;

    diceIcon.src = `images/dice-0.png`;
    playerP1.classList.remove('win-game');
    playerP2.classList.remove('win-game');
    playerP1.classList.add('active_player');
    playerP2.classList.remove('active_player');

    let audio = new Audio('media/start.mp3');
    audio.play();
};
NewGame();

const switchPlayer = function() {
    document.getElementById(`current_${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    playerP1.classList.toggle('active_player');
    playerP2.classList.toggle('active_player');
};

rollBtn.addEventListener('click', function() {
    if (playing) {

        const dice = Math.ceil(Math.random() * 6);

        diceIcon.classList.remove('d-none');
        diceIcon.src = `images/dice-${dice}.png`;

        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(
                `current_${activePlayer}`
            ).textContent = currentScore;
            let audio = new Audio('media/dice_rolling.mp3');
            audio.play();
        } else {
            let audio = new Audio('media/dice_rollingN1.mp3');
            audio.play();
            switchPlayer();
        }
    }
});

holdBtn.addEventListener('click', function() {
    if (playing) {

        scores[activePlayer] += currentScore;

        document.getElementById(`score_${activePlayer}`).textContent = scores[activePlayer];

        diceIcon.src = `images/dice-0.png`;

        let audio = new Audio('media/hold.mp3');
        audio.play();

        if (scores[activePlayer] >= 5) {
            playing = false;

            let audio = new Audio('media/winner.mp3');
            audio.play();

            document.querySelector(`.player_${activePlayer}`).classList.add('win-game');

            currentWinner = document.querySelector(`.player_${activePlayer}`);

            currentWinnerTxt = currentWinner.querySelector('.player').classList.add('winner');
            setTimeout(function() {
                currentWinnerTxt = currentWinner.querySelector('.player').classList.remove('winner');
                startBtn.classList.add('blink')
            }, 2500);

            document.querySelector(`.player_${activePlayer}`).classList.remove('active_player');
            diceIcon.src = `images/dice-0.png`;

        } else {
            switchPlayer();
        }
    }
});

startBtn.addEventListener('click', NewGame);