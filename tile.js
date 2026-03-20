const ANIM_TIME = 0.1;
let timePassed = 0;
let tilesMoving = false;

class Tile {
    constructor(i, j, val) {
        this.val = val;
        this.i = i;
        this.j = j;
        this.calcCoords();
        this.newI = i;
        this.newJ = j;
        this.calcNewCoords();
        this.animTime = ANIM_TIME;
    }

    calcCoords() {
        this.x = TILE_SIZE * this.j + TILE_GAP * (this.j + 1);
        this.y = TILE_SIZE * this.i + TILE_GAP * (this.i + 1);
    }

    calcNewCoords() {
        this.newX = TILE_SIZE * this.newJ + TILE_GAP * (this.newJ + 1);
        this.newY = TILE_SIZE * this.newI + TILE_GAP * (this.newI + 1);
    }

    startAnimation() {
        tilesMoving = true;
        timePassed = false;
        this.distance = this.newX - this.x;
    }

    endAnimation() {
        this.i = this.newI;
        this.j = this.newJ;
        this.calcCoords();
        tilesMoving = false;
    }

    animate(dt) {
        timePassed += dt;
        this.x += Math.min(distance * timePassed / ANIM_TIME, distance);
        if (timePassed > ANIM_TIME) {
            this.endAnimation();
        }
    }

    draw() {
        this.calcCoords();
        ctx.beginPath();
        ctx.fillStyle = "red";
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

