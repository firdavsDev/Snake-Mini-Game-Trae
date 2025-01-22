const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

// Game settings
const gridSize = 20;
const tileCount = canvas.width / gridSize;
let score = 0;

// Snake initial state
let snake = [
    { x: 10, y: 10 }
];
let dx = 0;
let dy = 0;

// Food position
let foodX = Math.floor(Math.random() * tileCount);
let foodY = Math.floor(Math.random() * tileCount);

// Game loop
function gameLoop() {
    updateSnake();
    if (checkGameOver()) {
        alert('Game Over! Score: ' + score);
        resetGame();
        return;
    }
    checkFoodCollision();
    clearCanvas();
    drawFood();
    drawSnake();
    setTimeout(gameLoop, 100);
}

// Update snake position
function updateSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    if (!checkFoodCollision()) {
        snake.pop();
    }
}

// Check for collisions
function checkGameOver() {
    const head = snake[0];

    // Wall collision
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        return true;
    }

    // Self collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

// Check if snake ate food
function checkFoodCollision() {
    const head = snake[0];
    if (head.x === foodX && head.y === foodY) {
        score += 10;
        scoreElement.textContent = score;
        foodX = Math.floor(Math.random() * tileCount);
        foodY = Math.floor(Math.random() * tileCount);
        return true;
    }
    return false;
}

// Drawing functions
function clearCanvas() {
    ctx.fillStyle = '#2c3e50';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = '#2ecc71';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
    });
}

function drawFood() {
    ctx.fillStyle = '#e74c3c';
    ctx.fillRect(foodX * gridSize, foodY * gridSize, gridSize - 2, gridSize - 2);
}

// Reset game
function resetGame() {
    snake = [{ x: 10, y: 10 }];
    dx = 0;
    dy = 0;
    score = 0;
    scoreElement.textContent = score;
    foodX = Math.floor(Math.random() * tileCount);
    foodY = Math.floor(Math.random() * tileCount);
    gameLoop();
}

// Keyboard controls
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (dy === 0) { dx = 0; dy = -1; }
            break;
        case 'ArrowDown':
            if (dy === 0) { dx = 0; dy = 1; }
            break;
        case 'ArrowLeft':
            if (dx === 0) { dx = -1; dy = 0; }
            break;
        case 'ArrowRight':
            if (dx === 0) { dx = 1; dy = 0; }
            break;
    }
});

// Start the game
gameLoop();