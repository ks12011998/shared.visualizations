/*
 * Below code can be executed directly on the p5.js editor:
 * https://editor.p5js.org/
 */

const W = 350;
const H = 350;

let nb_circles = 5;
let noiseMax = 10;
let zoff = 1;


setup = function() {
    myCanvas = createCanvas(W, H);

};

draw = function() {


    noiseSeed(99)
    background(0);
    translate(W / 2, H / 2)
    stroke(255);
    noFill();

    for (i = 0; i < nb_circles; i++) {
        beginShape();
        for (a = 0; a < TWO_PI; a += 0.01) {
            // noise should not be negative: we remapp it from 0 to noiseMax
            xoff = map(cos(a), -1, 1, 0, noiseMax);
            yoff = map(sin(a), -1, 1, 0, noiseMax);
            // calling a 2D Perlin Noise
            let r = map(noise(xoff, yoff, i + zoff), 0, 1, (W / 4 + i * 10), (W / 4 + 10 + i * 10));
            let x = r * cos(a);
            let y = r * sin(a);
            vertex(x, y);
        }
        endShape(CLOSE);
    }
    zoff += 0.03;

    // set up text
    textFont("Source Serif Pro");
    textStyle(BOLD);
    translate(-W / 2, -H / 2)
    noStroke();
    fill("#fff");
    textAlign(CENTER, CENTER);
    textSize(50);
    text('logo.', W / 2, H / 2);

};
