const HUD = document.querySelector("#hud");
const SCORE = document.querySelector("#hud #score");
const HIGH_SCORE = document.querySelector("#hud #high-score");
const GAME_OVER_SCREEN = document.querySelector("#game-over");
const GAME_OVER_SCORE = document.querySelector("#game-over .score");
const NEW_GAME_BUTTON = document.querySelector("#game-over .new-game-button");

let currentScore = 0;
let highScore;
loadHighScore();
updateHud();

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
    GAME_OVER_SCORE.textContent = `Score:\n${currentScore}`;
    GAME_OVER_SCREEN.style.setProperty('display', 'block');
}

