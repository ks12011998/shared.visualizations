/*
 * Below code can be executed directly on the p5.js editor:
 * https://editor.p5js.org/
 */



W = 500
H = 500
P = W*4
V = 0.3

setup = function() {
  createCanvas(W,H);
	system = new ParticleSystem(createVector(W/2, H/2)); 
  };

draw = function() {
  
  background("#fff");
  system.addParticle();
  system.run();

  fill("#fff0")
  stroke("#FFF")
  strokeWeight(200)
  circle(W/2,W/2,W*1.3);

  };

// Particle class from the p5.js example:
// https://p5js.org/examples/simulate-particle-system.html

let Particle = function(position) {
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(random(-V,V), random(-V,V));
  this.position = position.copy();
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
};

// Method to display
Particle.prototype.display = function() {
  stroke(200, this.lifespan);
  strokeWeight(0);
  fill(0);
  ellipse(this.position.x, this.position.y, 2, 2);
};

let ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  while (this.particles.length <P) {
     this.particles.push(new Particle(createVector(random(W),random(H))));
  }
};

ParticleSystem.prototype.run = function() {
  for (let i = this.particles.length-1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
  }
}
