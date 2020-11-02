/*
 * Below code can be executed directly on the p5.js editor:
 * https://editor.p5js.org/
 */

// r is the maximum size of the line
let r = 20;
// iter is the maximum number of iteration
let iter = 1000;

// canvas size
let W = 1000;
let H = 1000;

// defining a palette
let palette = ["#071E45", "#024400", "#450729", "#453003"]

// initiate the coordinates in the middle of the canvas
a = W / 2;
b = H / 2;
c = (W / 2) + 10;
d = (H / 2);

let i = 0;

function setup() {
  createCanvas(W, H);
  background("#fff");
}

function draw() {

  // first line
  a = c;
  b = d;
  c = a;
  d = d + random(r);
  stroke(palette[int(random(4))])
  line(a, b, c, d);

  // second line
  a = c;
  b = d;
  c = a - random(r);
  d = d;
  stroke(palette[int(random(4))])
  line(a, b, c, d);

  // third line
  a = c;
  b = d;
  c = c;
  d = d - random(r);
  stroke(palette[int(random(4))])
  line(a, b, c, d);

  // fourth line
  a = c;
  b = d;
  c = c + random(r);
  d = d;
  stroke(palette[int(random(4))])
  line(a, b, c, d);

  // iterator
  i++;

  // breaking the loop
  if (i == iter) {
    noLoop()
  }

}
