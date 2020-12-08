// Directly inspired from a p5.js example
// https://p5js.org/examples/math-noise1d.html

const W = 350;
const H = 350;
const r = 100;
let xoff = 0;
let xinc = 0.01;
let nb_circles = 100;

function setup() {
    createCanvas(W, H);
    //noLoop();
}

function draw() {
    fill(0, 10);
    rect(0, 0, W, H);

    randomSeed(4);
    noStroke();


    translate(W / 2, H / 2);

    for (i = 0; i < nb_circles; i++) {

        let t = random(2 * PI);

        fill(random(255));

        let x = r * cos(t + noise(xoff));
        let y = r * sin(t + noise(xoff));
        ellipse(x, y, 10, 10);
    }
    xoff += xinc;

    translate(-W / 2, -H / 2);
    stroke(255);
    strokeWeight(3);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(50);
    textFont("Source Serif Pro");
    textStyle(BOLD);
    text('logo.', W / 2, H / 2);

}
