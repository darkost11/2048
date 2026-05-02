const HUD = document.querySelector("#hud");
const SCORE = document.querySelector("#hud #score");
const HIGH_SCORE = document.querySelector("#hud #high-score");

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

