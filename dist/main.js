window.addEventListener('load', init);

// Globals

// Available Levels
const levels = {
    easy: 5,
    medium: 3,
    hard: 1
};

// To change level


let currentLevel = levels.easy;
let time = currentLevel;
let score = 0;
let isPlaying;

// DOM Elements
const wordInput = document.getElementById('word-input');
const currentWord = document.getElementById('current-word');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const message = document.getElementById('message');
const seconds = document.getElementById('seconds');

// fetch words from API
// let words = [];
// let words = [];

fetch('https://random-word-api.herokuapp.com/word?number=100')
.then(response => response.json())
.then(data => data.forEach(word => currentWord.innerHTML = word))

// Initialize Game
function init() {
    // Show number of seconds in UI
    seconds.innerHTML = currentLevel;
    // Load word from array
    words = fetch('https://random-word-api.herokuapp.com/word?number=100')
    .then(response => response.json())
    .then(data => words = data)
    
    showWord(words);
    // Start matching on word input
    wordInput.addEventListener('input', startMatch);
    // Call countdown every second
    setInterval(countdown, 1000);
    // Check game status
    setInterval(gameOver, 50);
    // changeLevel();
}

function changeLevel(level) {
    // debugger
    currentLevel = level;
}
// Game sounds 
var click = new Audio();
click.src = "sounds/buttonpress.mp3";
function playBtnSound() {
    click.play();
};

var levelUp = new Audio();
levelUp.src = "sounds/levelup.mp3"

function playLevelUp() {
    levelUp.play();
};

var gameOverSound = new Audio();
gameOverSound.src = "sounds/lose.mp3"

function playgameOver() {
    gameOverSound.play();
};

// Start match
function startMatch() {
    if (matchWords()) {
        isPlaying = true;
        time = currentLevel + 1;
        showWord(words);
        wordInput.value = '';
        score++;
    }
    seconds.innerHTML = currentLevel;
    score === -1 ? scoreDisplay.innerHTML = 0 : scoreDisplay.innerHTML = score;
}

// Match currentWord to wordInput
function matchWords() {
    if (wordInput.value === currentWord.innerHTML) {
        // message.innerHTML = 'NOICE!';
        playLevelUp();
        return true;
    } else {
        message.innerHTML = '';
        return false;
    }
}

// Pick & show random word
function showWord(words) {
    // Generate random array index
    const randIndex = Math.floor(Math.random() * words.length);
    // Output random word
    currentWord.innerHTML = words[randIndex];
}

// Countdown timer
function countdown() {
    // Make sure time is not run out
    if (time > 0) {
        // Decrement
        time--;
    } else if (time === 0) {
        // Game is over
        isPlaying = false;
    }
    // Show time
    timeDisplay.innerHTML = time;
}

// Check game status
function gameOver() {
    if (!isPlaying && time === 0) {
        message.innerHTML = 'Gotta be quicker than that!';
        score = -1;
        // playgameOver();
        // continue;
    }
}
