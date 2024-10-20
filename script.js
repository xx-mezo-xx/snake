console.log("JavaScript is working!");

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const boxSize = 20;
let snake = [{ x: 200, y: 200 }];
let food = {
  x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
  y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize,
};
let direction = { x: 1, y: 0 };  // الثعبان هيبدأ يتحرك يمين تلقائيًا
let newDirection = { x: 1, y: 0 }; // نفس الشيء هنا
let score = 0;

document.addEventListener("keydown", changeDirection);

function gameLoop() {
  moveSnake();
  if (checkCollision()) {
    resetGame();
  } else {
    checkFood();
  }

  drawCanvas();
  setTimeout(gameLoop, 100); // اللعبة تتحدث كل 100 مللي ثانية
}

function drawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // رسم التعبان
  ctx.fillStyle = "#00FF00";
  snake.forEach((segment) => {
    ctx.fillRect(segment.x, segment.y, boxSize, boxSize);
  });

  // رسم الأكل
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(food.x, food.y, boxSize, boxSize);

  // رسم السكور
  ctx.fillStyle = "#FFF";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 20);
}

function moveSnake() {
  direction = newDirection; // التحديث الحالي للاتجاه

  let newHead = {
    x: snake[0].x + direction.x * boxSize,
    y: snake[0].y + direction.y * boxSize,
  };

  snake.unshift(newHead); // إضافة رأس جديدة
  snake.pop(); // إزالة آخر جزء من الجسم
}

function changeDirection(event) {
  const keyCode = event.keyCode;
  switch (keyCode) {
    case 37: // سهم لليسار
      if (direction.x === 0) newDirection = { x: -1, y: 0 };
      break;
    case 38: // سهم لأعلى
      if (direction.y === 0) newDirection = { x: 0, y: -1 };
      break;
    case 39: // سهم لليمين
      if (direction.x === 0) newDirection = { x: 1, y: 0 };
      break;
    case 40: // سهم لأسفل
      if (direction.y === 0) newDirection = { x: 0, y: 1 };
      break;
  }
}

function checkCollision() {
  const head = snake[0];
  return (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= canvas.width ||
    head.y >= canvas.height ||
    snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
  );
}

function checkFood() {
  const head = snake[0];
  if (head.x === food.x && head.y === food.y) {
    score++;
    snake.push({}); // إضافة جزء جديد للجسم
    food = {
      x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
      y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize,
    };
  }
}

function resetGame() {
  snake = [{ x: 200, y: 200 }];
  direction = { x: 1, y: 0 };  // ابدأ في التحرك يمين مرة أخرى
  newDirection = { x: 1, y: 0 };
  score = 0;
  food = {
    x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
    y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize,
  };
}

gameLoop(); // بدء اللعبة
