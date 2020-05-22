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

// var keystroke = new Audio();
// keystroke.src = "sounds/tick.mp3"

wordInput.addEventListener("keydown", () => {
    var keystroke = new Audio("sounds/keystroke1.mp3");
    keystroke.play();
    return false;
});

// fetch words from API
// let words = [];
// let words = [];

fetch('https://random-word-api.herokuapp.com/word?number=100')
.then(response => response.json())
.then(data => data.forEach(word => currentWord.innerHTML = word))

// Initialize Game
function init() {
    seconds.innerHTML = currentLevel;
    words = fetch('https://random-word-api.herokuapp.com/word?number=100')
    .then(response => response.json())
    .then(data => words = data) 
    showWord(words);
    wordInput.addEventListener('input', startMatch);
    setInterval(countdown, 1000);
    setInterval(gameOver, 50);
}

function changeLevel(level) {
    currentLevel = level;
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

// Start match
function startMatch() {
    if (matchWords()) {
        isPlaying = true;
        time = currentLevel + 1;
        changeWord(words);
        wordInput.value = '';
        score++;
    }
    seconds.innerHTML = currentLevel;
    score === -1 ? scoreDisplay.innerHTML = 0 : scoreDisplay.innerHTML = score;
}

// Match currentWord to wordInput
function matchWords() {
    if (wordInput.value.toLowerCase() === currentWord.innerHTML) {
        playLevelUp();
        return true;
    } else {
        message.innerHTML = '';
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

function showDialog () {
    document.getElementById("myDialog").showModal();
}

var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

function displayModal() {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Check game status
function gameOver() {
    if (!isPlaying && time === 0) score = -1;
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