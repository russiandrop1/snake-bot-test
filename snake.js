const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const snake = [{ x: 200, y: 200 }];
const snakeSize = 10;
let dx = snakeSize;
let dy = 0;
let foodX;
let foodY;

document.addEventListener("keydown", changeDirection);
document.getElementById("left").addEventListener("click", () => changeDirection({ keyCode: 37 }));
document.getElementById("up").addEventListener("click", () => changeDirection({ keyCode: 38 }));
document.getElementById("down").addEventListener("click", () => changeDirection({ keyCode: 40 }));
document.getElementById("right").addEventListener("click", () => changeDirection({ keyCode: 39 }));

generateFood();

function gameLoop() {
    if (hasGameEnded()) return;

    setTimeout(() => {
        clearCanvas();
        drawFood();
        moveSnake();
        drawSnake();
        gameLoop();
    }, 100);
}

function clearCanvas() {
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = "#00FF00";
    snake.forEach(part => ctx.fillRect(part.x, part.y, snakeSize, snakeSize));
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === foodX && head.y === foodY) {
        generateFood();
    } else {
        snake.pop();
    }
}

function changeDirection(event) {
    const key = event.keyCode;
    const goingUp = dy === -snakeSize;
    const goingDown = dy === snakeSize;
    const goingRight = dx === snakeSize;
    const goingLeft = dx === -snakeSize;

    if (key === 37 && !goingRight) {
        dx = -snakeSize;
        dy = 0;
    }
    if (key === 38 && !goingDown) {
        dx = 0;
        dy = -snakeSize;
    }
    if (key === 39 && !goingLeft) {
        dx = snakeSize;
        dy = 0;
    }
    if (key === 40 && !goingUp) {
        dx = 0;
        dy = snakeSize;
    }
}

function generateFood() {
    foodX = Math.floor(Math.random() * canvas.width / snakeSize) * snakeSize;
    foodY = Math.floor(Math.random() * canvas.height / snakeSize) * snakeSize;
}

function drawFood() {
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(foodX, foodY, snakeSize, snakeSize);
}

function hasGameEnded() {
    for (let i = 4; i < snake.length; i++) {
        const hasCollided = snake[i].x === snake[0].x && snake[i].y === snake[0].y;
        if (hasCollided) return true;
    }

    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x >= canvas.width;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y >= canvas.height;

    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
}

gameLoop();
