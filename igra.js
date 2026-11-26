const canvas = document.getElementById('playScreen');
const ctx = canvas.getContext('2d');
let elipse_locations = []; // list von elipsen

function drawEllipse(ctx, x, y, radiusX, radiusY) {
    ctx.beginPath();
    ctx.ellipse(x, y, radiusX, radiusY, 0, 0, 2 * Math.PI);
    ctx.fill();
}

function resizeCanvas(){
    canvas.width = window.innerWidth;  // Set canvas width to window width
    canvas.height = window.innerHeight;  // Set canvas height to window height
    let elipse_r_x = (canvas.width) / 14; // radiusX von elipse
    let elipse_r_y = ((canvas.width) / 14) / 2; //radiusY von elipse
    elipse_locations = [
        { x: canvas.width * 0.2, y: canvas.height * 0.2, radiusX: elipse_r_x, radiusY: elipse_r_y , photo: null},
        { x: canvas.width * 0.2, y: canvas.height * 0.5, radiusX: elipse_r_x, radiusY: elipse_r_y , photo: null},
        { x: canvas.width * 0.2, y: canvas.height * 0.8, radiusX: elipse_r_x, radiusY: elipse_r_y , photo: null},
        { x: canvas.width * 0.5, y: canvas.height * 0.2, radiusX: elipse_r_x, radiusY: elipse_r_y , photo: null},
        { x: canvas.width * 0.5, y: canvas.height * 0.5, radiusX: elipse_r_x, radiusY: elipse_r_y , photo: null},
        { x: canvas.width * 0.5, y: canvas.height * 0.8, radiusX: elipse_r_x, radiusY: elipse_r_y , photo: null},
        { x: canvas.width * 0.8, y: canvas.height * 0.2, radiusX: elipse_r_x, radiusY: elipse_r_y , photo: null},
        { x: canvas.width * 0.8, y: canvas.height * 0.5, radiusX: elipse_r_x, radiusY: elipse_r_y , photo: null},
        { x: canvas.width * 0.8, y: canvas.height * 0.8, radiusX: elipse_r_x, radiusY: elipse_r_y , photo: null},
    ];
    drawGame();
}


function drawGame() {

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    for (let i = 0; i < elipse_locations.length; i++) {
        drawEllipse(ctx, elipse_locations[i].x, elipse_locations[i].y, elipse_locations[i].radiusX, elipse_locations[i].radiusY);
    }

}


function startGame() {
}
function stopGame() {
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);