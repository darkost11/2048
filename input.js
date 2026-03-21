window.addEventListener("keydown", (e) => {
    if (["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(e.key)){

        endTilesAnim();

        if (e.key == 'ArrowRight') {
            console.log("moving tiles right");
            moveTilesRight();
        }
        else if (e.key == "ArrowLeft") {
            console.log("moving tiles to the left");
            moveTilesLeft();
        }

        else if (e.key == "ArrowUp") {
            console.log("moving tiles up");
            moveTilesUp();
        }

        else if (e.key == "ArrowDown") {
            console.log("moving tiles down");
            moveTilesDown();
        }
        
        generateTile();
        startTilesAnim();
    }
})