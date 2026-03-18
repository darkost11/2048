const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const WIDTH = canvas.width = canvas.clientWidth;
const HEIGHT = canvas.height = canvas.clientHeight; 
const grid = [
    [1, 1, 1, 1],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [1, 1, 1, 1]
];

const GRID_DIMS = [4, 4];
const CELL_SIZE = 120;
const CELL_GAP = 24;

function drawGrid(){
    for (let i = 0; i < GRID_DIMS[0]; i++) {
        for (let j = 0; j < GRID_DIMS[1]; j++) {
            if (grid[i][j]) {
                console.log(`drawing (${i}, ${j})`)
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

drawGrid();


