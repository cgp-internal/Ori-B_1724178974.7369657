const gameLogic = (() => {
  let canvas, ctx, ball, paddle1, paddle2, ballSpeedX, ballSpeedY, scoring;
  let paddle1Up, paddle1Down, paddle2Up, paddle2Down;
  let gameRunning, gameOver, gameStarted;

  function initGame() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    canvas.width = 1000;
    canvas.height = 500;
    ball = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: 10,
      speed: 5,
    };
    paddle1 = {
      x: 10,
      y: canvas.height / 2,
      height: 100,
      width: 10,
    };
    paddle2 = {
      x: canvas.width - 20,
      y: canvas.height / 2,
      height: 100,
      width: 10,
    };
    ballSpeedX = ball.speed;
    ballSpeedY = ball.speed;
    scoring = {
      player1: 0,
      player2: 0,
    };
    gameOver = false;
    gameStarted = false;
  }

  function setupEventHandlers() {
    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('keyup', handleKeyRelease);
  }

  function handleKeyPress(event) {
    switch (event.key) {
      case 'w':
        paddle1Up = true;
        break;
      case 's':
        paddle1Down = true;
        break;
      case 'ArrowUp':
        paddle2Up = true;
        break;
      case 'ArrowDown':
        paddle2Down = true;
        break;
    }
  }

  function handleKeyRelease(event) {
    switch (event.key) {
      case 'w':
        paddle1Up = false;
        break;
      case 's':
        paddle1Down = false;
        break;
      case 'ArrowUp':
        paddle2Up = false;
        break;
      case 'ArrowDown':
        paddle2Down = false;
        break;
    }
  }

  function gameLoop() {
    gameRunning = true;
    while (gameRunning) {
      updateGame();
      renderGame();
      if (gameOver) {
        break;
      }
    }
  }

  function updateGame() {
    movePaddles();
    moveBall();
    checkCollisions();
    updateScoring();
  }

  function movePaddles() {
    if (paddle1Up) {
      paddle1.y -= 5;
    }
    if (paddle1Down) {
      paddle1.y += 5;
    }
    if (paddle2Up) {
      paddle2.y -= 5;
    }
    if (paddle2Down) {
      paddle2.y += 5;
    }
  }

  function moveBall() {
    ball.x += ballSpeedX;
    ball.y += ballSpeedY;
    if (ball.x > canvas.width || ball.x < 0) {
      ballSpeedX = -ballSpeedX;
    }
    if (ball.y > canvas.height || ball.y < 0) {
      ballSpeedY = -ballSpeedY;
    }
  }

  function checkCollisions() {
    if (checkPaddleCollision(paddle1)) {
      ballSpeedX = -ballSpeedX;
    }
    if (checkPaddleCollision(paddle2)) {
      ballSpeedX = -ballSpeedX;
    }
    if (ball.x < 0) {
      scoring.player2++;
      resetGame();
    }
    if (ball.x > canvas.width) {
      scoring.player1++;
      resetGame();
    }
  }

  function checkPaddleCollision(paddle) {
    if (ball.x <= paddle.x + paddle.width && ball.x + ball.radius > paddle.x && ball.y > paddle.y && ball.y < paddle.y + paddle.height) {
      return true;
    }
    return false;
  }

  function updateScoring() {
    ctx.font = '24px Arial';
    ctx.fillStyle = 'white';
    ctx.clearRect(0, 0, canvas.width, 50);
    ctx.fillText(`Player 1: ${scoring.player1}`, 10, 30);
    ctx.fillText(`Player 2: ${scoring.player2}`, canvas.width - 150, 30);
  }

  function renderGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddles();
    drawBall();
    updateScoring();
  }

  function drawPaddles() {
    ctx.fillStyle = 'white';
    ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
  }

  function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
  }

  function resetGame() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ballSpeedX = ball.speed;
    ballSpeedY = ball.speed;
    gameOver = true;
    gameStarted = false;
  }

  return {
    gameLogic: () => {
      initGame();
      setupEventHandlers();
      gameLoop();
    },
  };
})();

export { gameLogic };