const ANIM_TIME = 0.1;
let timePassed = 0;
let tilesMoving = false;

const COLORS = {
    2: "#00ff91",
    4: "#2fff00",
    8: "#88ff43",
    16: "#c3ff00",
    32: "#f8fc0b",
    64: "#fdc200",
    128: "#ffa200",
    256: "#ff7b00",
    512: "#fd5724",
    1024: "#ff0000",
    2048: "#ff0088",
    5096: "#ff00cc",
}
class Tile {
    constructor(i, j, val) {

        this.val = val;
        this.i = i;
        this.j = j;

        this.calcCoords();

        this.newI = i;
        this.newJ = j;
        this.startX;
        this.startY;

        this.calcNewCoords();

        this.merged = false;
    }

    calcCoords() {
        this.x = TILE_SIZE * this.j + TILE_GAP * (this.j + 1);
        this.y = TILE_SIZE * this.i + TILE_GAP * (this.i + 1);
    }

    calcNewCoords() {
        this.newX = TILE_SIZE * this.newJ + TILE_GAP * (this.newJ + 1);
        this.newY = TILE_SIZE * this.newI + TILE_GAP * (this.newI + 1);
    }

    startAnim() {
        this.calcNewCoords();
        this.startX = this.x;
        this.startY = this.y;
        this.distanceX = this.newX - this.startX;
        this.distanceY = this.newY - this.startY;
    }

    animate(dt) {
        this.x = this.startX + this.distanceX * timePassed / ANIM_TIME;
        this.y = this.startY + this.distanceY * timePassed / ANIM_TIME;
    }

    endAnim() {
        this.i = this.newI;
        this.j = this.newJ;
        this.calcCoords();
    }

    draw() {
        let color = COLORS[this.val];
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, TILE_SIZE, TILE_SIZE);

        ctx.font = "60px arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(
            this.val.toString(),
            this.x + TILE_SIZE/2,
            this.y + TILE_SIZE/2, 1000
        );

        ctx.closePath();
    }
}

function startTilesAnim() {
    tilesMoving = true;
    timePassed = 0;
    tiles.forEach(tile => {
        tile.startAnim();
    })
}

function animTiles(dt) {
    tiles.forEach(tile => {
        tile.animate(dt);
    })
    timePassed += dt;
    if (timePassed >= ANIM_TIME) {
        endTilesAnim();
    }
}

function endTilesAnim() {
    tilesMoving = false;
    timePassed = 0;
    tiles.forEach(tile => {
        tile.endAnim();
    })
    cleanMerged();
}

function cleanMerged(){
    tiles = tiles.filter(tile => {
        return !tile.merged;
    })
}

