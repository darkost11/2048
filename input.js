const swipeArea = document.getElementById('swipe-area');
const hammer = new Hammer(swipeArea);

hammer.get('swipe').set({
    direction: Hammer.DIRECTION_ALL,
    threshold: 5,
    velocity: 0.5
});

hammer.on('swiperight', () => {
    endTilesAnim();
    handleMoveRight();
    startTilesAnim();
    if (isGameOver()) {
        setTimeout(displayGameOverScreen, 1000);
    }
});

hammer.on('swipeleft', () => {
    endTilesAnim();
    handleMoveLeft();
    startTilesAnim();
    if (isGameOver()) {
        setTimeout(displayGameOverScreen, 1000);
    }
});

hammer.on('swipeup', () => {
    endTilesAnim();
    handleMoveUp();
    startTilesAnim();
    if (isGameOver()) {
        setTimeout(displayGameOverScreen, 1000);
    }
});

hammer.on('swipedown', () => {
    endTilesAnim();
    handleMoveDown();
    startTilesAnim();
    if (isGameOver()) {
        setTimeout(displayGameOverScreen, 1000);
    }
});

window.addEventListener("keydown", (e) => {
    if (["Enter", "KeyR", "Space"].includes(e.code)){
        if (isGameOver()) {
            handleRestartGame();
        }
    }
    else if ([
        "ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown",
        "KeyD", "KeyA", "KeyW", "KeyS" 
    ].includes(e.code)){

        endTilesAnim();

        if (e.code == 'ArrowRight' || e.code == "KeyD") {
            handleMoveRight();
        }

        else if (e.code == "ArrowLeft" || e.code == "KeyA") {
            handleMoveLeft();
        }

        else if (e.code == "ArrowUp" || e.code == "KeyW") {
            handleMoveUp();
        }

        else if (e.code == "ArrowDown" || e.code == "KeyS") {
            handleMoveDown();
        }

        startTilesAnim();

        if (isGameOver()) {
            setTimeout(displayGameOverScreen, 1000);
        }
    }
})

function handleMoveRight() {
    if (isMoveRightAvailable()) {
        moveTilesRight();
        isTileGenerated = generateTile();
    }
}

function handleMoveLeft() {
    if (isMoveLeftAvailable()) {

        moveTilesLeft();
        isTileGenerated = generateTile();
    }  
}

function handleMoveUp() {
    if (isMoveUpAvailable()) {
        moveTilesUp();
        isTileGenerated = generateTile();
    }
}

function handleMoveDown() {
    if (isMoveDownAvailable()) {
        moveTilesDown();
        isTileGenerated = generateTile();
    }
}

function handleRestartGame() {
    reloadWindow();
}

document.addEventListener('click', e => {
    if (e.target.classList.contains("new-game-button")) {
        handleRestartGame();
    }
}); 