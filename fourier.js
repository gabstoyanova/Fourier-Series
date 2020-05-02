let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

const P = 2 * Math.PI;
const AMPLITUDE = 90;
let time = 0;
let x;
let y;
let waveValues = [];
let trajectoryValues = [];
let valuePointer = 0;

function fourier(n) {
    let phase = n * time * P;
    let radius = 4 / (n * Math.PI) * AMPLITUDE;

    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, P);

    ctx.moveTo(x, y);
    x += radius * Math.cos(phase);
    y -= radius * Math.sin(phase);
    ctx.lineTo(x, y);

    ctx.stroke();
}

function drawTrajectory() {
    ctx.strokeStyle = "#f75"

    if (trajectoryValues.length == 0) {
        return;
    }
    // draw each
    for (let i = 0; i < trajectoryValues.length; i++) {
        ctx.beginPath();
        ctx.moveTo(trajectoryValues[i].x1, trajectoryValues[i].y1);
        ctx.lineTo(trajectoryValues[i].x2, trajectoryValues[i].y2);
        ctx.stroke();
    }
}

function translateLine() {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(500, y);
    ctx.strokeStyle = "#f75";
    ctx.stroke();
}

function drawWave() {
    ctx.beginPath();
    let x = 500;

    waveValues[valuePointer] = y;
    valuePointer++;
    ctx.strokeStyle = "white";

    ctx.moveTo(x + 4, y + 0.5);
    for (var i = 1; i < 450; ++i) {
        ctx.lineTo(x + i, waveValues[(valuePointer - i)]);
    }
    ctx.stroke();
}

function setOutputValue() {
    var output = document.getElementById('slider').value;
    document.getElementById('output').innerHTML = parseInt(output) + 1;
}

function animate() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    ctx.lineWidth = 2;

    x = 250;
    y = 250;
    let epicycles = document.getElementById("slider").value;
    setOutputValue()
    for (let n = 0; n <= parseInt(epicycles); n++) {
        fourier(2 * n + 1);
    }

    //endpoint
    ctx.strokeStyle = '#f75';
    ctx.strokeRect(x, y, 3, 3);

    //trajectory
    trajectoryValues.push( {x1: x, y1: y, x2: x-1, y2: y-1} );
    drawTrajectory();

    translateLine();
    drawWave();
    time += 0.01
    window.requestAnimationFrame(animate);
}
animate();