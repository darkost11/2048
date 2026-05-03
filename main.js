const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

let width = canvas.width = canvas.clientWidth;
let height = canvas.height = canvas.clientHeight; 

const ROWS = 4;
const COLS = 4;
let tileSize = 120;
let tileGap = 24;

let tiles = [];
const grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

syncSize();

initScores();
generateTile();
generateTile();
let isTileGenerated = true;

function isGameOver() {
    return !(
        isMoveRightAvailable() ||
        isMoveLeftAvailable() ||
        isMoveUpAvailable() ||
        isMoveDownAvailable()
    )
}

function reloadWindow() {
    window.location.reload();
}

function mainLoop() {
        
    dt = calcDt();
    if (tilesMoving) {
        animTiles(dt);
    }
    animTilesPopUp(dt);

    clearCanvas();
    drawGrid();

    requestAnimationFrame(mainLoop);
}

mainLoop();

