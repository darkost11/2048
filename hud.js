const HUD = document.querySelector("#hud");
const SCORE = document.querySelector("#hud #score");
const HIGH_SCORE = document.querySelector("#hud #high-score");
const GAME_OVER_SCREEN = document.querySelector("#game-over");
const GAME_OVER_SCORE = document.querySelector("#game-over .score");
const NEW_HIGH_SCORE_MESSAGE = document.querySelector("#toolbar #new-high-score-message");

let currentScore;
let highScore;
let oldHighScore;

function initScores() {
    currentScore = 0;
    loadHighScore();
    oldHighScore = highScore;
    updateHud();
}

function updateScoreDisplay() {
    SCORE.textContent = `Score: ${currentScore}`;
}

function updateHighScoreDisplay() {
    HIGH_SCORE.textContent = `High Score: ${highScore}`;
}

function incrementScore(val) {
    currentScore += val;
}

function updateHighScore(val) {
    highScore = Math.max(highScore, currentScore);
    saveHighScore();
}

function updateHud() {
    updateScoreDisplay();
    updateHighScoreDisplay();
}

function updateScores(val) {
    incrementScore(val);
    updateHighScore(val);
    updateHud();
}

function displayGameOverScreen() {
    canvas.style.setProperty('filter', 'blur(5px)');
    swipeArea.style.setProperty('display', 'none');
    GAME_OVER_SCORE.innerHTML = `Score:<br>${currentScore}`;
    GAME_OVER_SCREEN.style.setProperty('display', 'block');
    if (highScore > oldHighScore) {
        displayNewHighScoreMessage();
    }
}

function updateNewHighScoreMessage() {
    NEW_HIGH_SCORE_MESSAGE.textContent = `New high score! Old: ${oldHighScore}`;
}
function displayNewHighScoreMessage() {
    updateNewHighScoreMessage();
    NEW_HIGH_SCORE_MESSAGE.style.setProperty('display', 'block');
}
