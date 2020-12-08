/*
 * Below code can be executed directly on the p5.js editor:
 * https://editor.p5js.org/
 */

const W = 350;
const H = 350;

const palette = ["#2ecc71", "#e67e22", "#8e44ad", "#16a085", "#f39c12"];
const gap_circles = 10;
let noiseMax = 0.1;
let phase = 0;



setup = function() {
    myCanvas = createCanvas(W, H);

};

draw = function() {


    noiseSeed(99)
    background(255);
    translate(W / 2, H / 2);
    strokeWeight(3);
    noFill();
    randomSeed(42);
    for (i = 0; i < palette.length; i++) {
        stroke(palette[i]);
        beginShape();
        for (a = 0; a < TWO_PI; a += 0.1) {
            xoff = map(cos(a + phase), -1, 1, 0, noiseMax);
            yoff = map(sin(a + phase), -1, 1, 0, noiseMax);
            let r = map(noise(xoff, yoff), 0, 1, W / 4 + (i * gap_circles), W / 2 + (i * gap_circles));
            let x = r * cos(a);
            let y = r * sin(a);
            vertex(x, y);
            phase += 0.1;
        }
        endShape(CLOSE);
    }

    // set up text
    textFont("Source Serif Pro");
    textStyle(BOLD);
    translate(-W / 2, -H / 2);
    stroke("#34495e");
    strokeWeight(4);
    fill("#ecf0f1");
    textAlign(CENTER, CENTER);
    textSize(50);
    text('logo.', W / 2, H / 2);

};
