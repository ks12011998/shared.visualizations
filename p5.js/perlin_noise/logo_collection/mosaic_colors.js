/*
 * Below code can be executed directly on the p5.js editor:
 * https://editor.p5js.org/
 */

const W = 350;
const H = 350;
const size = 25;
let xoff1 = 40;
let xoff2 = 50;
let xoff3 = 60;
let yoff = 0;
let xinc1 = 0.000001;
let xinc2 = 0.000005;
let xinc3 = 0.000009;
let yinc = 0.0003;

function setup() {
    createCanvas(W, H);
    //noLoop();
}

function draw() {

    for (j = 0; j < H / size; j++) {
        for (i = 0; i < W / size; i++) {

            stroke(0);
            strokeWeight(1);
            fill(map(noise(xoff1, yoff), 0, 1, 0, 255), map(noise(xoff2, yoff), 0, 1, 0, 255), map(noise(xoff3, yoff), 0, 1, 0, 255))
            rect(i * size, j * size, size, size)

            xoff1 += xinc1;
            xoff2 += xinc2;
            xoff3 += xinc3;

        }
        yoff += yinc;
        xoff = 0;
    }

    noFill();
    stroke(255);
    strokeWeight(100);
    ellipse(W / 2, H / 2, W, H)
    stroke(255);
    strokeWeight(100);
    rect(0, 0, W, H)

    fill(255);
    noStroke();
    textFont("Source Serif Pro")
    textStyle(BOLD)
    textAlign(CENTER, CENTER);
    textSize(80);
    text('logo.', W / 2, H / 2);

}
