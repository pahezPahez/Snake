const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let snake;
let direction;
let food;

const boxSize = 25; 

function resetGame() {
    snake = [{ x: Math.floor(canvas.width / boxSize / 2), y: Math.floor(canvas.height / boxSize / 2) }];
    direction = { x: 1, y: 0 }; // Начальное направление вправо
    food = { x: Math.floor(Math.random() * (canvas.width / boxSize)), y: Math.floor(Math.random() * (canvas.height / boxSize)) };
}

resetGame();

document.addEventListener('keydown', event => {
    if (event.key === 'ArrowUp' && direction.y !== 1) direction = { x: 0, y: -1 };
    if (event.key === 'ArrowDown' && direction.y !== -1) direction = { x: 0, y: +1 };
    if (event.key === 'ArrowLeft' && direction.x !== +1) direction = { x:-1 ,y :  0};
   if (event.key === 'ArrowRight' && direction.x !== -1) direction = {x : +1 ,y :  0};
});

function update() {
   const head = { 
      x : snake[0].x + direction.x,
      y : snake[0].y + direction.y 
   };

   
   if (head.x < 0 || head.x >= canvas.width / boxSize || head.y < 0 || head.y >= canvas.height / boxSize) {
       alert("GG");
       resetGame(); 
       return;
   }

   
   for (let i = 1; i < snake.length; i++) {
       if (head.x === snake[i].x && head.y === snake[i].y) {
           alert("GG");
           resetGame();
           return;
       }
   }

   
   snake.unshift(head);

   
   if (head.x === food.x && head.y === food.y) {
       food.x = Math.floor(Math.random() * (canvas.width / boxSize));
       food.y = Math.floor(Math.random() * (canvas.height / boxSize));
   } else {
       snake.pop();
   }
}

function draw() {
   ctx.clearRect(0 ,   0 , canvas.width , canvas.height);

   
   ctx.fillStyle='green';
   for(let i=0; i<snake.length; i++){
     ctx.fillRect(snake[i].x*boxSize,snake[i].y*boxSize ,boxSize-1 ,boxSize-1); 
   }

   
   ctx.fillStyle='red';
   ctx.fillRect(food.x*boxSize ,food.y*boxSize ,boxSize-1 ,boxSize-1);
}

function gameLoop() {
   update();
   draw();
   setTimeout(gameLoop ,100); // Устанавливаем скорость игры
}

gameLoop()