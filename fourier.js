let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

const P = 2 * Math.PI;
const SCALE = 70;
let time = 0;
let x;
let y;
let waveValues = [];
let trajectoryValues = [];

function fourier(n) {
    let phase = n * time * P;
    let radius = 4 / (n * Math.PI) * SCALE;

    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, P);

    ctx.moveTo(x, y);
    x += radius * Math.cos(phase);
    y -= radius * Math.sin(phase);
    ctx.lineTo(x, y);

    ctx.stroke();
}

function drawTrajectory(){
    ctx.strokeStyle = "rgba(100,200,30,0.5)"

    if(trajectoryValues.length==0){ return; }
    // draw each
    for(let i=0; i<trajectoryValues.length; i++){
        ctx.beginPath();
        ctx.moveTo(trajectoryValues[i].x1,trajectoryValues[i].y1);
        ctx.lineTo(trajectoryValues[i].x2,trajectoryValues[i].y2);
        ctx.stroke();
    }
}

function translateLine() {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(450, y);
    ctx.strokeStyle = "red";
    ctx.stroke();
}

function animate() {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    x = 200;
    y = 200;
    let phasors = 2;
    for (let n = 0; n <= phasors; n++) {
        fourier(2 * n + 1);
    }

    //endpoint
    ctx.strokeStyle = 'red';
    ctx.strokeRect(x, y, 3, 3);

    //trajectory
    trajectoryValues.push( {x1: x, y1: y, x2: x-1, y2: y-1} );
    drawTrajectory();
    // translateLine();
    
    time += 0.01
    window.requestAnimationFrame(animate);
}
animate();