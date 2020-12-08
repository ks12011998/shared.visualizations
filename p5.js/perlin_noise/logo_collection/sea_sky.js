/*
 * Below code can be executed directly on the p5.js editor:
 * https://editor.p5js.org/
 */

// inspiration: Using Perlin Noise to generate a wave-like pattern. Original by Daniel Shiffman:
// https://p5js.org/examples/math-noise-wave.html

let yoff = 0.0;

const W = 350;
const H = 350;

function setup() {
    createCanvas(W, H);
}

function draw() {
    background("#ca1212");

    strokeWeight(1);
    stroke(0);
    fill(255);

    for (i = 0; i < 10; i++) {
        beginShape();

        let xoff = 0;

        for (let x = 0; x <= W; x += 4) {

            let y = map(noise(i + xoff, i + yoff), 0, 1, H / 3, H);

            vertex(x, y);
            xoff += 0.008;
        }
        yoff += 0.0005;
        vertex(width, height);
        vertex(0, height);
        endShape(CLOSE);
    }

    // set up a mask
    fill(255, 0);
    stroke(255);
    strokeWeight(100);
    ellipse(W / 2, H / 2, W, H)
    stroke(255);
    strokeWeight(100);
    rect(0, 0, W, H)

    // set up text

    // Note on font: this font can be loaded as a file with the loadFont() function in p5.js
    // OR you can embed the font in your HTML (choosen option) eg:
    // <link rel="preconnect" href="https://fonts.gstatic.com">
    // <link href="https://fonts.googleapis.com/css2?family=Source+Serif+Pro:wght@900&display=swap" rel="stylesheet">

    textFont("Source Serif Pro");
    textStyle(BOLD);
    noStroke();
    fill("#4A1D1D");
    textAlign(CENTER, CENTER);
    textSize(50);
    text('logo.', W / 2, H / 2);
}
