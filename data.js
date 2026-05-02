function saveHighScore() {
    localStorage.setItem('highScore', JSON.stringify(highScore));
}

function loadHighScore() {
    const saved = JSON.parse(localStorage.getItem('highScore'));
    highScore = saved || 0;
}