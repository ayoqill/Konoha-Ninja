// GAME

let playerScore = 0;
let computerScore = 0;
let roundWinner = '';

// Character List
const characters = {
    "rocklee": [],
    "HayateSensei": [],
    "tsunade": ["boruto", "madara", "pain"],
    "naruto": ["boruto", "pain"], 
    "itachi": ["boruto", "pain", "madara"],
    "boruto": ["rocklee", "HayateSensei"],
    "madara": ["rocklee", "HayateSensei", "naruto"],
    "pain": ["rocklee", "HayateSensei"],
    "shizune": ["rocklee", "HayateSensei", "naruto", "tsunade"],
};

// Character Image
const characterImage = {
    "rocklee": "resources/rocklee.jpeg",
    "HayateSensei": "resources/hatakesensei.jpeg",
    "tsunade": "resources/tsunade.jpeg",
    "naruto": "resources/naruto.jpeg",
    "itachi": "resources/itachi.jpeg",
    "boruto": "resources/boruto.jpg",
    "madara": "resources/madara.jpg",
    "pain": "resources/pain.jpeg",
    "shizune": "resources/shizune.jpeg",
};

const backgroundMusic = document.getElementById('backgroundMusic');
const startMusic = document.getElementById('startMusic');
const introScreen = document.getElementById('intro');
const startContainer = document.getElementById('startcontainer');
const main = document.getElementById('main');
const header = document.querySelector('.header');
const footer = document.getElementById('footer');
const startButton = document.getElementById('startbutton');

// Function to start the background music
function playBackgroundMusic() {
    if (backgroundMusic) {
        backgroundMusic.play();
    }
}

// Function to start the start page music
function playStartPageMusic() {
    if (startMusic) {
        console.log('Trying to play start page music');
        startMusic.play().catch(error => {
            console.error('Error playing start page music:', error);
        });
    } else {
        console.error('Start music element not found');
    }
}

// Function to switch to game music
function switchToGameMusic() {
    if (startMusic) {
        startMusic.pause();
        startMusic.currentTime = 0; // Reset start music to the beginning
    }
    playBackgroundMusic(); // Start game music
}

// Function to hide the intro screen and show the start container
function startGame() {
    introScreen.style.display = 'none';
    startContainer.classList.remove('hidden');
    playStartPageMusic(); // Start the start page music
}

// Function to start the game and switch to game music
function startGameFromStartContainer() {
    startContainer.classList.add('hidden');
    main.classList.remove('hidden');
    header.classList.remove('hidden');
    footer.classList.remove('hidden');
    switchToGameMusic(); // Switch to the game music when starting
}

// Start the intro screen
introScreen.addEventListener('click', startGame);

// Typewriter effect variables
let i = 0;
const txt = `In a time long forgotten, the peace of the Hidden Village is shattered by the ominous rumble of an impending war. Shadows creep across the land, and whispers of a formidable enemy reach the ears of the Village's bravest. The once tranquil nights are now filled with the distant cries of battle, and the skies darken with foreboding clouds.

As the Village's protector, you are tasked with a monumental duty to choose your shinobi wisely. Each warrior, with their unique powers and abilities, stands ready to defend the village from the encroaching darkness. Will you enlist the might of the legendary heroes or the swift blades of the skilled ninjas?

The fate of the Hidden Village rests in your hands. Forge your path, summon your courage, and prepare for an epic clash. The battle to protect your home begins now. The great war awaits.`;
const speed = 36; // Adjust this speed for faster or slower typing

function typeWriter() {
    if (i < txt.length) {
        document.getElementById("description").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    } else {
        // Typewriter effect completed, show the button
        startButton.classList.add('show');
    }
}

// Start the typewriter effect once the start page is visible
function initializeStartPage() {
    playStartPageMusic(); // Start the start page music
    typeWriter(); // Start the typewriter effect
}

// Hide the start container and show the game
startButton.addEventListener('click', startGameFromStartContainer);

// Initially hide the main game and footer, show only the start page
header.classList.add('hidden');
main.classList.add('hidden');
footer.classList.add('hidden');

// Game Logic
function playRound(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        console.log(`It's a draw between ${userChoice} and ${computerChoice}!`);
        roundWinner = 'draw';
    } else if (characters[userChoice].includes(computerChoice)) {
        console.log(`${userChoice} wins against ${computerChoice}`);
        playerScore++;
        roundWinner = 'player';
    } else if (characters[computerChoice].includes(userChoice)) {
        console.log(`${computerChoice} wins against ${userChoice}`);
        computerScore++;
        roundWinner = 'computer';
    }
}

function isGameOver() {
    return playerScore === 5 || computerScore === 5;
}

// UI Elements
const PlayerScore = document.getElementById('PlayerScore');
const ComputerScore = document.getElementById('ComputerScore');
const endgameModal = document.getElementById('endgameModal');
const endgameMessage = document.getElementById('endgameMessage');
const overlay = document.getElementById('overlay');
const restartBtn = document.getElementById('restartBtn');

// User Click
document.getElementById('rocklee').addEventListener('click', () => handleClick('rocklee'));
document.getElementById('HayateSensei').addEventListener('click', () => handleClick('HayateSensei'));
document.getElementById('tsunade').addEventListener('click', () => handleClick('tsunade'));
document.getElementById('naruto').addEventListener('click', () => handleClick('naruto'));
document.getElementById('itachi').addEventListener('click', () => handleClick('itachi'));

restartBtn.addEventListener('click', restartGame);
overlay.addEventListener('click', closeEndgameModal);

function handleClick(userChoice) {
    if (isGameOver()) {
        openEndgameModal();
        return;
    }

    const computerChoice = getRandomChoice();
    playRound(userChoice, computerChoice);
    updateChoices(userChoice, computerChoice);
    updateScore();

    if (isGameOver()) {
        setFinalMessage();
        openEndgameModal();
    }
}

function getRandomChoice() {
    const computerCharacters = ["boruto", "madara", "pain", "shizune"];
    return computerCharacters[Math.floor(Math.random() * computerCharacters.length)];
}

function updateChoices(userChoice, computerChoice) {
    // Update the images displayed for GoodShinobi and EvilShinobi
    const goodShinobiDiv = document.getElementById('playerSign');
    const evilShinobiDiv = document.getElementById('computerSign');

    goodShinobiDiv.innerHTML = `<img src="${characterImage[userChoice]}" alt="${userChoice}" class="shinobi-image" />`;
    evilShinobiDiv.innerHTML = `<img src="${characterImage[computerChoice]}" alt="${computerChoice}" class="shinobi-image" />`;
}

function updateScore() {
    PlayerScore.innerText = `Player: ${playerScore}`;
    ComputerScore.innerText = `Computer: ${computerScore}`;
}

function setFinalMessage() {
    if (roundWinner === 'player') {
        endgameMessage.innerText = "Congrats, You won the game!";
    } else {
        endgameMessage.innerText = "Aww, The computer has won the game!";
    }
}

function openEndgameModal() {
    endgameModal.classList.add('active');
    overlay.classList.add('active');
}

function closeEndgameModal() {
    endgameModal.classList.remove('active');
    overlay.classList.remove('active');
}

function restartGame() {
    playerScore = 0;
    computerScore = 0;
    roundWinner = '';
    updateScore();
    resetChoices();
    closeEndgameModal();
    // Optionally reset background music if needed
    // backgroundMusic.pause();
    // backgroundMusic.currentTime = 0;
}

function resetChoices() {
    // Reset to the initial ❔ signs and reset scores
    document.getElementById('playerSign').innerHTML = '❔';
    document.getElementById('computerSign').innerHTML = '❔';
    PlayerScore.innerText = 'Player: 0';
    ComputerScore.innerText = 'Computer: 0';
}

// Initialize the start page
window.onload = initializeStartPage;

