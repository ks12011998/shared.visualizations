/*
 * Below code can be executed directly on the p5.js editor:
 * https://editor.p5js.org/
 */

// canvas size 
var W = 1500;
var H = 2000;

// defining a palette
palette = ["#333301","#FFFF52","#FFFF05","#CCCC04","#E0E048"]

function setup() {
  createCanvas(W, H);
  background('#fff');
  noLoop();
}

function draw() {

  for (i = 0; i < 800; i++) {

    for (j = 0; j < 72; j++) {

    var x = int(random(200, W-230));
    var y = int(random(220+(j*20), 170+(j*20)+150));
    var w = int(random(5, 40));
    var h = int(random(5, 40));

    fill(palette[int(random(5))])
    rect(x, y, w, h);

    }
  }
}
