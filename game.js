const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let x = 50;
let y = 300;
let vy = 0;
let gravity = 0.5;
let jumpPower = -10;
let isJumping = false;

function drawCharacter() {
  ctx.fillStyle = 'green';
  ctx.fillRect(x, y, 30, 30);
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  vy += gravity;
  y += vy;

  if (y > 300) {
    y = 300;
    vy = 0;
    isJumping = false;
  }

  x += 2;

  drawCharacter();
  requestAnimationFrame(update);
}

canvas.addEventListener('click', () => {
  if (!isJumping) {
    vy = jumpPower;
    isJumping = true;
  }
});

update();
