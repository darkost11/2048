let t0 = performance.now();
let dt;

function calcDt(){
    const t1 = performance.now();
    dt = (t1 - t0) / 1000;
    t0 = t1;
    return dt;
}

function clearCanvas() {
    ctx.clearRect(0, 0, width, height);
}

function syncSize() {
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width;
    canvas.height = rect.height;

    tileSize = canvas.width / 600 * 120;
    tileGap = canvas.width / 500 * 20;
    calcTileCoords();
    resizeTiles();
    calcFontSize();
}

window.addEventListener('load', syncSize);
window.addEventListener('resize', syncSize);