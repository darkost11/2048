const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const WIDTH = canvas.width = canvas.clientWidth;
const HEIGHT = canvas.height = canvas.clientHeight; 
const grid = [
    [1, 1, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 0, 0, 0]
];

const nRows = 4;
const nCols = 4;

const CELL_SIZE = 120;
const CELL_GAP = 24;

function drawGrid(){
    for (let i = 0; i < nRows; i++) {
        for (let j = 0; j < nCols; j++) {
            if (grid[i][j]) {
                // console.log(`drawing (${i}, ${j})`)
                drawCell(i, j);
            }
        }
    }
}

function drawCell(i, j){
    let x = CELL_SIZE * j + CELL_GAP * (j + 1);
    let y = CELL_SIZE * i + CELL_GAP * (i + 1);
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
    ctx.closePath();
}

function moveCellRight(i, j) {
    for(let col = j; col < nCols-1 && !grid[i][col + 1]; col++) {
        grid[i][col] = 0;
        grid[i][col + 1] = 1;
    }
}

function moveCellLeft(i, j) {
    for (let col = j; col > 0 && !grid[i][col - 1]; col--) {
        grid[i][col] = 0;
        grid[i][col - 1] = 1;
    }
}

function moveCellUp(i, j) {
    for (let row = i; row > 0 && !grid[row - 1][j]; row--) {
        grid[row][j] = 0;
        grid[row - 1][j] = 1;
    }
}

function moveCellDown(i, j) {
    for (let row = i; row < nRows-1 && !grid[row+1][j]; row++) {
        grid[row][j] = 0;
        grid[row + 1][j] = 1;
    }
}
function moveCellsRight() {
    for (let i = 0; i < nRows; i++) {
        for(let j = nCols-2; j >= 0; j--) {
            if (grid[i][j])
                moveCellRight(i, j);
        }
    }
}

function moveCellsLeft() {
    for (let i = 0; i < nRows; i++) {
        for (let j = 1; j < nRows; j++) {
            if (grid[i][j])
                moveCellLeft(i, j);
        }
    }
}

function moveCellsUp() {
    for (let i = 1; i < nRows; i++) {
        for (let j = 0; j < nCols; j++) {
            if(grid[i][j])
                moveCellUp(i, j);
        }
    }
}

function moveCellsDown() {
    for (let i = nRows - 2; i >= 0; i--) {
        for (let j = 0; j < nCols; j++) {
            if (grid[i][j])
                moveCellDown(i, j);
        }
    }
}
window.addEventListener("keydown", (e) => {
    if (e.key == 'ArrowRight') {
        console.log("moving cells right");
        moveCellsRight();
    }
    else if (e.key == "ArrowLeft") {
        console.log("moving cells to the left");
        moveCellsLeft();
    }

    else if (e.key == "ArrowUp") {
        console.log("moving cells up");
        moveCellsUp();
    }

    else if (e.key == "ArrowDown") {
        console.log("moving cells down");
        moveCellsDown();
    }
})

function mainLoop() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    drawGrid();
    requestAnimationFrame(mainLoop);
}

mainLoop();