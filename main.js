const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const WIDTH = canvas.width = canvas.clientWidth;
const HEIGHT = canvas.height = canvas.clientHeight; 

const nRows = 4;
const nCols = 4;

const TILE_SIZE = 120;
const TILE_GAP = 24;

const grid = [
    [new Tile(0, 0, 2), 0, 0, new Tile(0, 3, 2)],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];
function drawGrid(){
    
    for (let i = 0; i < nRows; i++) {
        for (let j = 0; j < nCols; j++) {
            let tile = grid[i][j];
            if (tile) {
                tile.draw(i, j);
            }
        }
    }
}

function moveTileRight(i, j) {
    let col;
    for(col = j; col < nCols-1 && !grid[i][col + 1]; col++) {
        let tile = grid[i][col];
        grid[i][col] = 0;
        grid[i][col + 1] = tile;
        tile.j++;
    }
    if (col < nCols - 1 ) {
        tile1 = grid[i][col];
        tile2 = grid[i][col + 1];
        if (tile1.val == tile2.val) {
            grid[i][col] = 0;
            tile2.val *= 2;
        }     
    }
}

function moveTileLeft(i, j) {
    let col;
    for (col = j; col > 0 && !grid[i][col - 1]; col--) {
        let tile = grid[i][col];
        grid[i][col] = 0;
        grid[i][col - 1] = tile;
        tile.j--;
    }

    if (col > 0) {
        tile1 = grid[i][col];
        tile2 = grid[i][col - 1];
        if (tile1.val == tile2.val) {
            grid[i][col] = 0;
            tile2.val *= 2;
        }     
    }
}

function moveTileUp(i, j) {
    let row;
    for (row = i; row > 0 && !grid[row - 1][j]; row--) {
        let tile = grid[row][j];
        grid[row][j] = 0;
        grid[row - 1][j] = tile;
        tile.i--;
    }

    if (row > 0) {
        tile1 = grid[row][j];
        tile2 = grid[row - 1][j];
        if (tile1.val == tile2.val) {
            grid[row][j] = 0;
            tile2.val *= 2;
        }     
    }
}

function moveTileDown(i, j) {
    let row;
    for (row = i; row < nRows-1 && !grid[row+1][j]; row++) {
        let tile = grid[row][j];
        grid[row][j] = 0;
        grid[row + 1][j] = tile;
        tile.i++;
    }
    if (row < nRows-1) {
        tile1 = grid[row][j];
        tile2 = grid[row + 1][j];
        if (tile1.val == tile2.val) {
            grid[row][j] = 0;
            tile2.val *= 2;
        }     
    }
}
function moveTilesRight() {
    for (let i = 0; i < nRows; i++) {
        for(let j = nCols-2; j >= 0; j--) {
            if (grid[i][j])
                moveTileRight(i, j);
        }
    }
}

function moveTilesLeft() {
    for (let i = 0; i < nRows; i++) {
        for (let j = 1; j < nRows; j++) {
            if (grid[i][j])
                moveTileLeft(i, j);
        }
    }
}

function moveTilesUp() {
    for (let i = 1; i < nRows; i++) {
        for (let j = 0; j < nCols; j++) {
            if(grid[i][j])
                moveTileUp(i, j);
        }
    }
}

function moveTilesDown() {
    for (let i = nRows - 2; i >= 0; i--) {
        for (let j = 0; j < nCols; j++) {
            if (grid[i][j])
                moveTileDown(i, j);
        }
    }
}

function generateTile() {
    const val = Math.pow(2, Math.floor(Math.random()*2 + 1));
    let emptyCells = [];
    for (let i = 0; i < nRows; i++) {
        for (let j = 0; j < nCols; j++) {
            if (!grid[i][j])   
                emptyCells.push([i, j]);
        }
    }

    if (emptyCells.length > 0){
        const idx = Math.floor(Math.random() * emptyCells.length);
        const [i, j] = emptyCells[idx];
        grid[i][j] = new Tile(val);
    };
}
window.addEventListener("keydown", (e) => {
    if (["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(e.key)){
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
        // generateTile();
        // clearCanvas();
        // drawGrid();
        console.log(grid);
    }
})

function mainLoop() {
    clearCanvas();
    drawGrid();
    requestAnimationFrame(mainLoop);
}

drawGrid();
mainLoop();

function clearCanvas() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
}