window.addEventListener('load', init);

const wordInput = document.getElementById('word-input');
const currentWord = document.getElementById('current-word');
const scoreDisplay = document.getElementById('score');
const highscoreDisplay = document.getElementById('high-score');
const timeDisplay = document.getElementById('time');
const message = document.getElementById('message');
const button1 = document.getElementById('btn1');
const button2 = document.getElementById('btn2');
const button3 = document.getElementById('btn3');
const modal = document.getElementById('modal')
const body = document.getElementsByTagName('body')[0];
const leftContainer = document.getElementsByClassName('left-container')[0];
const rightContainer = document.getElementsByClassName('score-container')[0];
const levelContainer = document.getElementsByClassName('difficulty-section')[0];

let currentLevel = 5;
let time = currentLevel;
let score = 0;
let highScore = 0;
let isPlaying;

function fetchWords() {
    words = fetch('https://random-word-api.herokuapp.com/word?number=100')
        .then(response => response.json())
        .then(data => words = data)
        .then(data => data.forEach(word => currentWord.innerHTML = word));
}


// Initialize Game
function init() {
    timeDisplay.innerHTML = time;
    fetchWords();
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

    if (score === -1) {
        scoreDisplay.innerHTML = 0;
    } else {
        scoreDisplay.innerHTML = score;
    }
    
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

function changeWord(words) {
    setTimeout(showWord(words), 500);
}

// Pick & show random word
function showWord(words) {
    const randIndex = Math.floor(Math.random() * words.length);
    currentWord.innerHTML = words[randIndex];
}

// Countdown timer
function countdown() {
    if (!isPlaying) {
        return;
    } else if (time > 0){
        time-- 
    } else {
        isPlaying = false;
    }
    timeDisplay.innerHTML = time;
}

// Check game status
function gameOver() {
    if (time === 0) {
        time = 5;
        score = -1;
        isPlaying = false;
        modal.style.display = 'inline-flex';
        leftContainer.style.opacity = '25%'
        rightContainer.style.opacity = '25%'
        levelContainer.style.opacity = '25%'
    } else {
        wordInput.setAttribute('placeholder', 'TYPE THE WORD ABOVE');
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

button1.addEventListener('click', function() {
    button1.style.color = '#91C4F2';
    button2.style.color = 'white';
    button3.style.color = 'white'
    timeDisplay.style.color = '#91C4F2';
    time = 5
});

button2.addEventListener('click', function() {
    button2.style.color = '#AABD8C';
    button1.style.color = 'white';
    button3.style.color = 'white';
    timeDisplay.style.color = '#AABD8C';
    time = 4
});

button3.addEventListener('click', function() {
    button3.style.color = '#ED474A';
    button1.style.color = 'white';
    button2.style.color = 'white';
    timeDisplay.style.color = '#ED474A';
    time = 2;
});

// Modal 

function closeModal() {
    modal.style.display = 'none';
    leftContainer.style.opacity = '100%'
    rightContainer.style.opacity = '100%'
    levelContainer.style.opacity = '100%'
}