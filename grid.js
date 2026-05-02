function getEmptyCells() {
    let emptyCells = [];
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            if (!grid[i][j])   
                emptyCells.push([i, j]);
        }
    }
    return (emptyCells.length > 0) ? emptyCells : null;
}

function generateTile() {
    const val = Math.pow(2, Math.floor(Math.random()*2 + 1));
    
    let emptyCells = getEmptyCells();
    if (emptyCells) {
        const idx = Math.floor(Math.random() * emptyCells.length);
        const [i, j] = emptyCells[idx];
        let newTile = new Tile(i, j, val);
        return true;
    }
    return false;
}

function drawGrid(){
    tiles.forEach(tile => {
        tile.draw();
    })
}

function moveTileRight(i, j) {
    let col;
    for(col = j; col < COLS-1 && !grid[i][col + 1]; col++) {
        let tile = grid[i][col];
        grid[i][col] = 0;
        grid[i][col + 1] = tile;
        tile.newJ++;
    }
    if (col < COLS - 1 ) {
        tile1 = grid[i][col];
        tile2 = grid[i][col + 1];
        if (tile1.val == tile2.val) {
            grid[i][col] = 0;
            let newTile = new Tile(i, col + 1, tile1.val*2);
            tile1.newJ++;
            tile1.merged = tile2.merged = true;
        }     
    }
}

function moveTileLeft(i, j) {
    let col;
    for (col = j; col > 0 && !grid[i][col - 1]; col--) {
        let tile = grid[i][col];
        grid[i][col] = 0;
        grid[i][col - 1] = tile;
        tile.newJ--;
    }

    if (col > 0) {
        tile1 = grid[i][col];
        tile2 = grid[i][col - 1];
        if (tile1.val == tile2.val) {
            grid[i][col] = 0;
            let newTile = new Tile(i, col - 1, tile1.val*2);
            tile1.newJ--;
            tile1.merged = tile2.merged = true;
        }     
    }
}

function moveTileUp(i, j) {
    let row;
    for (row = i; row > 0 && !grid[row - 1][j]; row--) {
        let tile = grid[row][j];
        grid[row][j] = 0;
        grid[row - 1][j] = tile;
        tile.newI--;

    }

    if (row > 0) {
        tile1 = grid[row][j];
        tile2 = grid[row - 1][j];
        if (tile1.val == tile2.val) {
            grid[row][j] = 0;
            let newTile = new Tile(row - 1, j, tile1.val*2);
            tile1.newI--;
            tile1.merged = tile2.merged = true;
        }     
    }
}

function moveTileDown(i, j) {
    let row;
    for (row = i; row < ROWS-1 && !grid[row+1][j]; row++) {
        let tile = grid[row][j];
        grid[row][j] = 0;
        grid[row + 1][j] = tile;
        tile.newI++;
    }
    if (row < ROWS-1) {
        tile1 = grid[row][j];
        tile2 = grid[row + 1][j];
        if (tile1.val == tile2.val) {
            grid[row][j] = 0;
            let newTile = new Tile(row + 1, j, tile1.val*2);
            tile1.newI++;
            tile1.merged = tile2.merged = true;
        }     
    }
}

function moveTilesRight() {
    for (let i = 0; i < ROWS; i++) {
        for(let j = COLS-2; j >= 0; j--) {
            if (grid[i][j])
                moveTileRight(i, j);
        }
    }
}

function moveTilesLeft() {
    for (let i = 0; i < ROWS; i++) {
        for (let j = 1; j < ROWS; j++) {
            if (grid[i][j])
                moveTileLeft(i, j);
        }
    }
}

function moveTilesUp() {
    for (let i = 1; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            if(grid[i][j])
                moveTileUp(i, j);
        }
    }
}

function moveTilesDown() {
    for (let i = ROWS - 2; i >= 0; i--) {
        for (let j = 0; j < COLS; j++) {
            if (grid[i][j])
                moveTileDown(i, j);
        }
    }
}

function isMoveRightAvailable() {
    for (let i = 0; i < ROWS; i++){
        for (let j = 0; j < COLS - 1; j++) {
            let tile1 = grid[i][j];
            let tile2 = grid[i][j+1];
            if (tile1.val == tile2.val || (tile1 && !tile2))
                return true;
        }
    }
    return false;
}

function isMoveLeftAvailable() {
    for (let i = 0; i < ROWS; i++){
        for (let j = COLS-1; j > 0; j--) {
            let tile1 = grid[i][j];
            let tile2 = grid[i][j-1];
            if (tile1.val == tile2.val || (tile1 && !tile2))
                return true;
        }
    }
    return false;
}

function isMoveUpAvailable() {
    for (let i = ROWS-1; i > 0; i--){
        for (let j = 0; j < COLS; j++) {
            let tile1 = grid[i][j];
            let tile2 = grid[i-1][j];
            if (tile1.val == tile2.val || (tile1 && !tile2))
                return true;
        }
    }
    return false;
}

function isMoveDownAvailable() {
    for (let i = 0; i < ROWS-1; i++) {
        for (let j = 0; j < COLS; j++) {
            let tile1 = grid[i][j];
            let tile2 = grid[i+1][j];
            if (tile1.val == tile2.val || (tile1 && !tile2))
                return true;
        }
    }
    return false;
}