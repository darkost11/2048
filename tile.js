const ANIM_TIME = 0.12;
let timePassed = 0;
let tilesMoving = false;
let fontSize = 60;

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
    2048: "#ff00e1",
    4096: "#b300ff",
    8192: "#6600ff"
}
class Tile {
    constructor(i, j, val) {

        this.val = val;
        this.i = i;
        this.j = j;

        grid[i][j] = this;
        tiles.push(this);

        this.calcCoords();

        this.newI = i;
        this.newJ = j;
        this.startX;
        this.startY;

        this.calcNewCoords();

        this.popUpTimePassed = 0;
        this.centerX = this.x + tileSize/2;
        this.centerY = this.y + tileSize/2;
        this.isPoppingUp = true;
        this.size = 0;

        this.merged = false;
    }

    calcCoords() {
        this.x = tileSize * this.j + tileGap * (this.j + 1);
        this.y = tileSize * this.i + tileGap * (this.i + 1);
    }

    calcNewCoords() {
        this.newX = tileSize * this.newJ + tileGap * (this.newJ + 1);
        this.newY = tileSize * this.newI + tileGap * (this.newI + 1);
    }

    startAnim() {
        this.calcNewCoords();
        this.startX = this.x;
        this.startY = this.y;
        this.distanceX = this.newX - this.startX;
        this.distanceY = this.newY - this.startY;
    }

    animate() {
        this.x = this.startX + this.distanceX * timePassed / ANIM_TIME;
        this.y = this.startY + this.distanceY * timePassed / ANIM_TIME;
    }

    endAnim() {
        this.i = this.newI;
        this.j = this.newJ;
        this.calcCoords();
    }

    animatePopUp(dt) {
       this.popUpTimePassed += dt;
       this.size = Math.min(tileSize * this.popUpTimePassed / ANIM_TIME, tileSize);
       this.x = this.centerX - this.size / 2;
       this.y = this.centerY - this.size / 2;
       if (this.popUpTimePassed >= ANIM_TIME) {
           this.endPopUpAnim();
       }
    }

    endPopUpAnim() {
        this.size = tileSize;
        this.popUpTimePassed = ANIM_TIME;
        this.isPoppingUp = false;
    }

    draw() {
        let color = COLORS[this.val];
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.size, this.size);

        ctx.font = `${fontSize * this.popUpTimePassed/ANIM_TIME}px arial`;
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        if (this.isPoppingUp) {
            ctx.fillText(
                this.val.toString(),
                this.centerX,
                this.centerY, 1000
            )
        } else {
            ctx.fillText(
                this.val.toString(),
                this.x + tileSize/2,
                this.y + tileSize/2, 1000
            );

        ctx.closePath();
        }
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
    timePassed += dt;
    tiles.forEach(tile => {
        tile.animate();
    })
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

function animTilesPopUp(dt) {
    tiles.forEach(tile => {
        if (tile.isPoppingUp) {
            tile.animatePopUp(dt);
        }
    })
}

function cleanMerged(){
    tiles = tiles.filter(tile => {
        return !tile.merged;
    })
}

function calcTileCoords() {
    tiles.forEach(tile => {
        tile.calcCoords();
        tile.calcNewCoords();
    })
}

function resizeTiles() {
    tiles.forEach(tile => {
        tile.size = tileSize;
    })
}

function calcFontSize() {
    rect = canvas.getBoundingClientRect();
    fontSize = Math.min(rect.width * 0.1, 60);
}

