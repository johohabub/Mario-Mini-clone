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
() {
  document.getElementById('startScreen').style.display = 'none';
  canvas.style.display = 'block';
  gameStarted = true;
  requestAnimationFrame(gameLoop);
}

let player = {
  x: 50,
  y: 300,
  width: 40,
  height: 40,
  vy: 0,
  jumpPower: -10,
  gravity: 0.5,
  isJumping: false
};

const platforms = [
  { x: 0, y: 350, width: 2000, height: 50 },
  { x: 300, y: 300, width: 100, height: 10 },
  { x: 500, y: 250, width: 100, height: 10 }
];

const enemies = [
  { x: 600, y: 320, width: 30, height: 30 },
  { x: 900, y: 220, width: 30, height: 30 }
];

let cameraOffsetX = 0;

function drawRect(obj, color) {
  ctx.fillStyle = color;
  ctx.fillRect(obj.x - cameraOffsetX, obj.y, obj.width, obj.height);
}

function gameLoop() {
  if (!gameStarted) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Bewegung
  player.vy += player.gravity;
  player.y += player.vy;

  // Plattform-Kollision
  player.isJumping = true;
  for (let plat of platforms) {
    if (player.x + player.width > plat.x && player.x < plat.x + plat.width &&
        player.y + player.height > plat.y && player.y + player.height < plat.y + plat.height + 10 &&
        player.vy >= 0) {
      player.y = plat.y - player.height;
      player.vy = 0;
      player.isJumping = false;
    }
  }

  // Automatisches Laufen
  player.x += 2;
  cameraOffsetX = player.x - 100;

  // Zeichnen
  drawRect(player, '#00aa00');
  platforms.forEach(p => drawRect(p, '#654321'));
  enemies.forEach(e => drawRect(e, '#9900cc'));

  requestAnimationFrame(gameLoop);
}

canvas.addEventListener('click', () => {
  if (!player.isJumping) {
    player.vy = player.jumpPower;
    player.isJumping = true;
  }
});
