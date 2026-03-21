window.addEventListener("keydown", (e) => {
    if (["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(e.key)){

        endTilesAnim();

        if (e.key == 'ArrowRight') {
            handleMoveRight();
        }

        else if (e.key == "ArrowLeft") {
            handleMoveLeft();
        }

        else if (e.key == "ArrowUp") {
            handleMoveUp();
        }

        else if (e.key == "ArrowDown") {
            handleMoveDown();
        }

        startTilesAnim();

        if (isGameOver()) {
            setTimeout(reloadWindow, 2000);
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