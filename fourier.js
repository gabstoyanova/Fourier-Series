let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

const P = 2 * Math.PI;
const SCALE = 60;
let time = 0;
let x;
let y;
let waveVals = [];

function fourier(n) {
    let phase = n * time * P;
    let radius = 4 / (n * Math.PI) * SCALE;
    ctx.lineWidth = 2;
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, P);
    ctx.stroke();

    ctx.moveTo(x, y);
    x += radius * Math.cos(phase);
    y -= radius * Math.sin(phase);

    ctx.lineTo(x, y);
    ctx.stroke();
}

function translateLine() {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(340, y);
    ctx.strokeStyle = "red";
    ctx.stroke();
}

function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    x = 200;
    y = 200;

    let terms = 3;

    for (let n = 0; n <= terms; n++) {
        fourier((2 * n) + 1);
    }

    // translateLine();
    time += 0.01

    window.requestAnimationFrame(frame);
}
frame();