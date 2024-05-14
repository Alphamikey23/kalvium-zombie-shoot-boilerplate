// Iteration 1: Declare variables required for this game

var zombiePics = [
    'zombie-1.png',
    'zombie-2.png',
    'zombie-3.png',
    'zombie-4.png',
    'zombie-5.png',
    'zombie-6.png',
];

const gameBodyEl = document.getElementById("game-body");
const livesEl = document.getElementById("lives");
let timerEl = document.getElementById("timer");
let remainingSeconds = parseInt(timerEl.textContent); // Parse to integer
let currentZombieId = 0;

// Iteration 1.2: Add shotgun sound
const shotgunSound = new Audio("./assets/shotgun.wav");
gameBodyEl.onclick = () => {
    shotgunSound.pause();
    shotgunSound.currentTime = 0;
    shotgunSound.play();
}

// Iteration 1.3: Add background sound
const backgroundAudio = new Audio("./assets/bgm.mp3");
backgroundAudio.play();
backgroundAudio.loop = true;

// Iteration 1.4: Add lives
const maxLives = 4;
let remainingLives = 4;

// Iteration 2: Write a function to make a zombie
function createZombie() {
    const newZombie = document.createElement('img');
    const randomPic = Math.floor(Math.random() * zombiePics.length);
    newZombie.src = `./assets/${zombiePics[randomPic]}`;
    newZombie.classList.add("zombie-image");
    newZombie.setAttribute("id", `zombie-${currentZombieId}`);
    newZombie.style.transform = `translateX(${getRandomNumber(10, 90)}vw)`;
    newZombie.style.animationDuration = `${getRandomNumber(2, 10)}s`;
    newZombie.onclick = () => {
        killZombie(newZombie);
    };
    gameBodyEl.appendChild(newZombie);
    currentZombieId++;
}

// Iteration 3: Write a function to check if the player missed a zombie
function checkMissed(zombie) {
    if (zombie.getBoundingClientRect().top <= 0) {
        remainingLives--;
        return true;
    } else {
        return false;
    }
}

// Iteration 4: Write a function to destroy a zombie when it is shot or missed
function destroyZombie(zombie) {
    zombie.style.display = "none";
    createZombie(); // Regenerate a zombie
}

// Iteration 5: Creating timer
let missCount = 0;
let gameTimer = setInterval(function () {
    remainingSeconds--;
    if (remainingSeconds <= 0) {
        clearInterval(gameTimer);
        if (remainingLives == 0) {
            location.href = "./game-over.html";
        } else {
            location.href = "./win.html";
        }
        return;
    }
    timerEl.textContent = remainingSeconds; // Update timer display
    let zombie = document.getElementById("zombie-" + currentZombieId);
    if (checkMissed(zombie)) {
        destroyZombie(zombie);
        missCount++;
        if (missCount >= 4) {
            clearInterval(gameTimer);
            location.href = "./game-over.html";
        }
    }
}, 1000);

// Iteration 6: Write a code to start the game by calling the first zombie 
createZombie();

// Iteration 7: Write the helper function to get random integer
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
