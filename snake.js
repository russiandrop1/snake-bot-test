const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const snake = [{ x: 150, y: 150 }];
const snakeSize = 10;
let dx = snakeSize;
let dy = 0;
let foodX;
let foodY;
let gameSpeed = 200;

document.addEventListener("keydown", changeDirection);
canvas.addEventListener("touchstart", handleTouchStart, false);
canvas.addEventListener("touchmove", handleTouchMove, false);

let xDown = null;
let yDown = null;

function handleTouchStart(evt) {
    const firstTouch = evt.touches[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    const xUp = evt.touches[0].clientX;
    const yUp = evt.touches[0].clientY;

    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0 && dx === 0) {
            dx = -snakeSize;
            dy = 0;
        } else if (xDiff < 0 && dx === 0) {
            dx = snakeSize;
            dy = 0;
        }
    } else {
        if (yDiff > 0 && dy === 0) {
            dx = 0;
            dy = -snakeSize;
        } else if (yDiff < 0 && dy === 0) {
            dx = 0;
            dy = snakeSize;
        }
    }

    xDown = null;
    yDown = null;
}

generateFood();

function gameLoop() {
    if (hasGameEnded()) return;

    setTimeout(() => {
        clearCanvas();
        drawFood();
        moveSnake();
        drawSnake();
        gameLoop();
    }, gameSpeed);
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
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y >= canvas.height;

    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
}

gameLoop();
