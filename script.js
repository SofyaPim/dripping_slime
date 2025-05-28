window.addEventListener("load", function () {
  /**
   * @type {HTMLCanvasElement}
   */
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
ctx.fillStyle = 'white';
  
  class Ball {
    constructor(effect) {
      this.effect = effect;
      this.radius = Math.random() * 50 + 20;
      this.x = this.radius * 2 + (Math.random() * (this.effect.width - this.radius * 4));
      this.y = -this.radius;
      this.speedX = Math.random() * 0.2 - 0.1;
      this.speedY = Math.random() * 1.5 + 0.5;
      this.angle = 0;
      this.va = Math.random() * 0.1 - 0.05;
      this.range = Math.random() * 20;
      this.gravity = Math.random() * 0.005;
      this.vy = 0;
      
    }
    update(){
      if(this.x < this.radius || this.x + this.radius > this.effect.width) this.speedX *= -1;
      if( this.y + this.radius > this.effect.height) {
        this.y = -this.radius;        
        this.vy = 0;
        this.speedY = Math.random() * 1.5 + 0.5;
      }
      if(this.y > this.radius * 2){
        this.vy += this.gravity;
        this.speedY += this.vy;
      }
      this.x += this.speedX;
      this.y += this.speedY;     

    }
    draw(context){
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      context.fill();
    }
    reset(){
      this.x = this.radius * 2 + (Math.random() * (this.effect.width - this.radius * 4));
      this.y = -this.radius;
    }
  }
  class MetaBallEffect {
    constructor(width, height) {
      this.width = width;
      this.height = height;
     this.metaBallArray = [];
    }
    init(numberOfBalls){
    for (let i = 0; i < numberOfBalls; i++) {
      this.metaBallArray.push(new Ball(this))
      
    }
    }
    update(){
     this.metaBallArray.forEach(ball => ball.update())
    }
    draw(context){
      this.metaBallArray.forEach(ball => ball.draw(context))
    }
    reset(newWidth, newHeight){
      this.width = newWidth;
      this.height = newHeight;
      this.metaBallArray.forEach(ball => ball.reset());
    }
  }
const effect = new MetaBallEffect(canvas.width, canvas.height);

effect.init(20);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
   effect.update();
   effect.draw(ctx);
    requestAnimationFrame(animate);
  }

  animate();
  window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    effect.reset(canvas.width, canvas.height);
    ctx.fillStyle = 'white';
  })
});
