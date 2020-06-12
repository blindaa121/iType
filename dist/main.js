window.addEventListener('load', init);

const wordInput = document.getElementById('word-input');
const currentWord = document.getElementById('current-word');
const scoreDisplay = document.getElementById('score');
const highscoreDisplay = document.getElementById('high-score');
const timeDisplay = document.getElementById('time');
const message = document.getElementById('message');


let currentLevel = 5;
let time = currentLevel;
let score = 0;
let highScore = 0;
let isPlaying;

fetch('https://random-word-api.herokuapp.com/word?number=100')
.then(response => response.json())
.then(data => data.forEach(word => currentWord.innerHTML = word))

// Initialize Game
function init() {
    timeDisplay.innerHTML = time;

    words = fetch('https://random-word-api.herokuapp.com/word?number=100')
    .then(response => response.json())
    .then(data => words = data) 

    showWord(words);
    wordInput.addEventListener('input', startMatch);
    setInterval(gameOver, 50);
}

function changeLevel(level) {
    currentLevel = level;
    timeDisplay.innerHTML = currentLevel;
}
// Game sounds 

function playBtnSound() {
    var click = new Audio();
    click.src = "sounds/buttonpress.mp3";
    click.play();
};


function playLevelUp() {
    var levelUp = new Audio();
    levelUp.src = "sounds/levelup.mp3"
    levelUp.play();
};


function playgameOver() {
    var gameOverSound = new Audio();
    gameOverSound.src = "sounds/lose.mp3"
    gameOverSound.play();
};

function playTick() {
    var keystroke = new Audio("sounds/keystroke1.mp3");
    keystroke.play();
};

wordInput.addEventListener("keydown", playTick);

function startMatch() {
    if (matchWords()) {
        isPlaying = true;
        time = currentLevel + 1;
        changeWord(words);
        wordInput.value = '';
        score++;
    }
    score === -1 ? scoreDisplay.innerHTML = 0 : scoreDisplay.innerHTML = score;
    if (score > highScore) highScore = score;
    highscoreDisplay.innerHTML = highScore;
}


timer = function () {
    setInterval(countdown, 1000)
}

function matchWords() {
    if (wordInput.value.toLowerCase() === currentWord.innerHTML) {
        clearInterval(timer);
        timer = setInterval(countdown, 1000);
        playLevelUp();
        message.innerHTML = '';
        return true;
    } else {
        return false;
    }
}

function fadeOut() {
    currentWord.style.opacity = 0;
    currentWord.style.color = "#48BF84"
}

function fadeIn() {
    currentWord.style.opacity = 1;
    currentWord.style.color = "black"
}

function changeWord(words) {
    fadeOut();
    setTimeout(fadeIn, 500);
    setTimeout(showWord(words), 500);
}

// Pick & show random word
function showWord(words) {
    const randIndex = Math.floor(Math.random() * words.length);
    currentWord.innerHTML = words[randIndex];
}

// Countdown timer
function countdown() {
    (time > 0) ? time-- : isPlaying = false;
    timeDisplay.innerHTML = time;
}

// Check game status
function gameOver() {
    if (time === 0) {
        score = -1;
        message.innerHTML = 'Game Over! Type the word above to play again!'
    } else {
        wordInput.setAttribute('placeholder', 'Begin typing!');
    }
}

var bgmusic = new Audio();
bgmusic.src = "sounds/bgmusic.mp3"

function playMusic() {
    bgmusic.play();
    bgmusic.loop = true;
}

function pauseMusic() {
    bgmusic.pause();
}