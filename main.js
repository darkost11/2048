const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const WIDTH = canvas.width = canvas.clientWidth;
const HEIGHT = canvas.height = canvas.clientHeight; 

const ROWS = 4;
const COLS = 4;
const TILE_SIZE = 120;
const TILE_GAP = 24;

let tiles = [];
const grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];
generateTile();
generateTile();


function mainLoop() {
    dt = calcDt();
    if (tilesMoving) {
        animTiles(dt);
    }
    clearCanvas();
    drawGrid();

    requestAnimationFrame(mainLoop);
}

mainLoop();

