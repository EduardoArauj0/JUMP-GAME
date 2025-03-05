const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreDisplay = document.getElementById('score');
const resetButton = document.getElementById('resetButton');

let score = 0;
let gameOver = false;
let gameLoop;

const jump = () => {
    if (!gameOver) {
        mario.classList.add('jump');
        setTimeout(() => {
            mario.classList.remove('jump');
        }, 500);
    }
}

const updateScore = () => {
    if (!gameOver) {
        score++;
        scoreDisplay.textContent = score;
    }
}

const startGameLoop = () => {
    gameLoop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;

            mario.src = './images/game-over.png';
            mario.style.width = '75px';
            mario.style.marginLeft = '50px';

            gameOver = true;
            resetButton.style.display = 'block';
            clearInterval(gameLoop);
        }
    }, 10);
}

const resetGame = () => {
    score = 0;
    scoreDisplay.textContent = score;
    gameOver = false;
    resetButton.style.display = 'none';

    pipe.style.animation = 'pipe-animation 1.5s infinite linear';
    pipe.style.left = '';

    mario.src = './images/mario.gif';
    mario.style.width = '150px';
    mario.style.marginLeft = '0px';
    mario.style.bottom = '0px';
    
    mario.style.animation = '';

    startGameLoop();
}

document.addEventListener('keydown', jump);
resetButton.addEventListener('click', resetGame);

startGameLoop();
setInterval(updateScore, 1000);
