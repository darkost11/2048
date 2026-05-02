const swipeArea = document.getElementById('swipe-area');
const hammer = new Hammer(swipeArea);

hammer.get('swipe').set({
    direction: Hammer.DIRECTION_ALL,
    threshold: 20,
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
    else if (["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(e.code)){

        endTilesAnim();

        if (e.code == 'ArrowRight') {
            handleMoveRight();
        }

        else if (e.code == "ArrowLeft") {
            handleMoveLeft();
        }

        else if (e.code == "ArrowUp") {
            handleMoveUp();
        }

        else if (e.code == "ArrowDown") {
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
        console.log("moving tiles right");
        moveTilesRight();
        isTileGenerated = generateTile();
    }
    else 
        console.log("can't go right");
}

function handleMoveLeft() {
    if (isMoveLeftAvailable()) {
        console.log("moving tiles to the left");
        moveTilesLeft();
        isTileGenerated = generateTile();
    }
    else
        console.log("can't go left")     
}

function handleMoveUp() {
    if (isMoveUpAvailable()) {
        console.log("moving tiles up");
        moveTilesUp();
        isTileGenerated = generateTile();
    }
    else
        console.log("can't go up");
}

function handleMoveDown() {
    if (isMoveDownAvailable()) {
        console.log("moving tiles down");
        moveTilesDown();
        isTileGenerated = generateTile();
    }
    else 
        console.log("can't go down");
}

function handleRestartGame() {
    reloadWindow();
}

NEW_GAME_BUTTON.addEventListener('click', () => {
    handleRestartGame();
});