let t0 = performance.now();
let dt;

function calcDt(){
    const t1 = performance.now();
    dt = (t1 - t0) / 1000;
    t0 = t1;
    return dt;
}

function clearCanvas() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
}
