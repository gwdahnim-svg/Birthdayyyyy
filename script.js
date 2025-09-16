const canvas = document.getElementById("hearts");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Heart {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 100;
    this.size = Math.random() * 10 + 10;
    this.growth = 0.05 + Math.random() * 0.05;
    this.speed = 0.5 + Math.random() * 1;
    this.opacity = Math.random() * 0.5 + 0.5;
    this.color = `rgba(255, 0, 100, ${this.opacity})`;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.scale(this.size / 20, this.size / 20);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-10, -10, -25, 10, 0, 25);
    ctx.bezierCurveTo(25, 10, 10, -10, 0, 0);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }

  update() {
    this.y -= this.speed;
    this.size += this.growth;
    if (this.y < -50) {
      this.y = canvas.height + 50;
      this.x = Math.random() * canvas.width;
      this.size = Math.random() * 10 + 10;
    }
    this.draw();
  }
}

const hearts = [];
for (let i = 0; i < 30; i++) {
  hearts.push(new Heart());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach((h) => h.update());
  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
