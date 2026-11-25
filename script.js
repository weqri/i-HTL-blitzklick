
const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function drawEllipse(ctx, x, y, radiusX, radiusY) {
    ctx.beginPath();
    ctx.ellipse(x, y, radiusX, radiusY, 0, 0, 2 * Math.PI);
    ctx.fill();
}
let elipse_r_x = (canvas.width) / 14; // radiusX von elipse
let elipse_r_y = ((canvas.width) / 14) / 2; //radiusY von elipse
let elipse_locations = [ // list von elipsen
    { x: canvas.width * 0.2, y: canvas.height * 0.2, radiusX: elipse_r_x, radiusY: elipse_r_y },
    { x: canvas.width * 0.2, y: canvas.height * 0.5, radiusX: elipse_r_x, radiusY: elipse_r_y },
    { x: canvas.width * 0.2, y: canvas.height * 0.8, radiusX: elipse_r_x, radiusY: elipse_r_y },
    { x: canvas.width * 0.5, y: canvas.height * 0.2, radiusX: elipse_r_x, radiusY: elipse_r_y },
    { x: canvas.width * 0.5, y: canvas.height * 0.5, radiusX: elipse_r_x, radiusY: elipse_r_y },
    { x: canvas.width * 0.5, y: canvas.height * 0.8, radiusX: elipse_r_x, radiusY: elipse_r_y },
    { x: canvas.width * 0.8, y: canvas.height * 0.2, radiusX: elipse_r_x, radiusY: elipse_r_y },
    { x: canvas.width * 0.8, y: canvas.height * 0.5, radiusX: elipse_r_x, radiusY: elipse_r_y },
    { x: canvas.width * 0.8, y: canvas.height * 0.8, radiusX: elipse_r_x, radiusY: elipse_r_y },
];


const ctx = canvas.getContext('2d');
for (let i = 0; i < elipse_locations.length; i++) {
    drawEllipse(ctx, elipse_locations[i].x, elipse_locations[i].y, elipse_locations[i].radiusX, elipse_locations[i].radiusY);
}

// Mole img

let img_mole = ["img/mole1.png", "img/mole2.png", "img/mole3.png", "img/mole4.png", "img/mole5.png", "img/mole6.png", "img/mole7.png", "img/mole8.png", "img/mole9.png", "img/mole10.png", "img/mole11.png", "img/mole12.png"];


let random_index = Math.floor(Math.random() * elipse_locations.length);
let random_mole = img_mole[Math.floor(Math.random() * 11)];
let mole_img = new Image();
mole_img.src = img_mole[random_mole];

drawMole(mole_img, elipse_locations[random_index].x, elipse_locations[random_index].y, elipse_locations[random_index].radiusX, elipse_locations[random_index].radiusY);

function drawMole(img, x, y, radiusX, radiusY) {
    img.onload = function () {
        ctx.drawImage(img, x - radiusX, y - radiusY, radiusX * 2, radiusY * 2);
    };
}