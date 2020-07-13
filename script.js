/* global createCanvas, background, width, height, random, circle, fill, text, textSize, createSlider, createCheckbox */

const colors = ["crimson", "red", "darkred", "coral", "gold", "darkorange", "yellow", "khaki", "lawngreen", "green", "darkgreen", "olive", "palegreen", "cyan", "teal", "lightblue", "skyblue", "blue", "royalblue", "violet", "magenta", "purple", "pink", "hotpink", "white", "seashell", "linen", "slategray", "gray", "black", "cornsilk", "tan", "brown"];
let balls = [];
let numBalls, gravitationalForce, gravityEnabled = false;

function setup(){
  createCanvas(window.innerWidth, window.innerHeight);
  
  // Create slider for number of balls
  numBalls = createSlider(0, 250, random(0, 250));
  numBalls.position(10, 15);
  
  // Create slider and checkbox for gravitational force
  gravitationalForce = createSlider(0, 0.75, random(0, 0.75), 0.01);
  gravitationalForce.position(10, 40)
  let enableGravity = createCheckbox("Gravity", false);
  enableGravity.position(10, 65);
  enableGravity.changed(() => {
    for (let ball of balls) ball.toggleGravity();
    gravityEnabled = !gravityEnabled;
  });
  
  // Create some number of balls
  for (let i = 0; i < numBalls.value(); i++) balls.push(
    new Ball(width/2, height/2, random(-5, 5), random(-5, 5)));
}

function draw(){
  background(220);
  
  // Change number of balls
  if (numBalls.value() > balls.length) {
    for (let i = 0; i < numBalls.value() - balls.length; i++) balls.push(
      new Ball(width/2, height/2, random(-5, 5), random(-5, 5)));
  } else if (numBalls.value() < balls.length) balls = balls.slice(0, numBalls.value());
  
  // Draw all the balls
  for (let ball of balls) ball.run();
  
  // Slider labels
  fill(0);
  textSize(14);
  text("Number of Balls", 150, 21.5);
  text("Gravitational Force", 150, 46.5)
}

class Ball {
  constructor(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.gravity = gravityEnabled;
    
    // Set the size
    this.size = random(5, 50);
    
    // Set the color
    this.color = colors[Math.floor(random(colors.length))];
  }
  
  run() {
    // Display the ball
    fill(this.color);
    circle(this.x, this.y, this.size);
    
    // Check boundaries
    if (this.x <= 0 + this.size/2 || this.x >= width - this.size/2) this.vx *= -1;
    if (this.y <= 0 + this.size/2 || (this.y >= height - this.size/2 && !this.gravity)) this.vy *= -1;
    
    // Enable gravity
    if (this.gravity) {
      this.vy += gravitationalForce.value();
      if (this.y > height - this.size/2) {
        this.vy /= 1.3;
        this.vy *= -1;
      }
    }
    
    // Modify position
    this.x += this.vx;
    this.y += this.vy;
  }
  
  toggleGravity() {
    this.gravity = !this.gravity
  }
}
