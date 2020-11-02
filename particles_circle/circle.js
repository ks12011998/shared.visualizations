/*
 * Below code can be executed directly on the p5.js editor:
 * https://editor.p5js.org/
 */

W = 500
H = 500
P = W*4
V = 0.3

// coordinates of the middle of the circle
const h = W/2
const k = W/2
const r = W/4

setup = function() {
    createCanvas(W,H);
		system = new ParticleSystem(createVector(W/2, H/2));
  };

 draw = function() {
	background("#fff");
	system.addParticle();
  system.run();
	}

		// A simple Particle class
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
  // step being the number of particles
  let step = (2 * PI) / (P/5) ;

	// below is the parametric equation of the circle, to display randomly particles around the circle
  while (this.particles.length <(P/5)) {
      t = random(2 * PI);
      x = h + r * cos(t);
      y = k - r * sin(t);
     this.particles.push(new Particle(createVector(x,y)));
  }
};

ParticleSystem.prototype.run = function() {
  for (let i = this.particles.length-1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
  }
}
