// Constants
const CORRECT_USERNAME = "Cal";
const CORRECT_PASSWORD = "Evergarden";
const SECRET_NUMBER = 42;

// Audio handling
const backgroundAudio = document.getElementById('background-audio');

// Try to play audio when page loads
window.addEventListener('load', () => {
    if (backgroundAudio) {
        backgroundAudio.muted = false;
        backgroundAudio.play().catch(e => {
            console.log('Autoplay prevented, will play on user interaction');
        });
    }
});

// Play audio on first user interaction
document.addEventListener('click', () => {
    if (backgroundAudio && backgroundAudio.paused) {
        backgroundAudio.muted = false;
        backgroundAudio.play();
    }
}, { once: true });

// DOM Elements
const loginScreen = document.getElementById('login-screen');
const mainMenu = document.getElementById('main-menu');
const game1Screen = document.getElementById('game1-screen');
const game2Screen = document.getElementById('game2-screen');
const game3Screen = document.getElementById('game3-screen');
const welcomeMessage = document.getElementById('welcome-message');

// Login functionality
document.getElementById('login-btn').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginError = document.getElementById('login-error');

    if (username === CORRECT_USERNAME && password === CORRECT_PASSWORD) {
        loginScreen.classList.add('hidden');
        mainMenu.classList.remove('hidden');
        welcomeMessage.textContent = `Hello, ${username}!`;
        loginError.classList.add('hidden');
    } else {
        loginError.classList.remove('hidden');
        document.getElementById('password').value = '';
    }
});

// Logout functionality
document.getElementById('logout-btn').addEventListener('click', () => {
    mainMenu.classList.add('hidden');
    loginScreen.classList.remove('hidden');
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';

    // Hide all game screens if visible
    [game1Screen, game2Screen, game3Screen].forEach(screen => {
        if (!screen.classList.contains('hidden')) {
            resetGame(screen.id);
            screen.classList.add('hidden');
        }
    });
});

// Game selection
document.querySelectorAll('.game-option').forEach(option => {
    option.addEventListener('click', () => {
        mainMenu.classList.add('hidden');
        const gameNumber = option.getAttribute('data-game');

        switch(gameNumber) {
            case '1':
                game1Screen.classList.remove('hidden');
                break;
            case '2':
                game2Screen.classList.remove('hidden');
                break;
            case '3':
                game3Screen.classList.remove('hidden');
                break;
        }
    });
    });
});

// Back to menu buttons
document.getElementById('back-to-menu1').addEventListener('click', () => {
    resetGame('game1-screen');
    game1Screen.classList.add('hidden');
    mainMenu.classList.remove('hidden');
});

document.getElementById('back-to-menu2').addEventListener('click', () => {
    resetGame('game2-screen');
    game2Screen.classList.add('hidden');
    mainMenu.classList.remove('hidden');
});

document.getElementById('back-to-menu3').addEventListener('click', () => {
    resetGame('game3-screen');
    game3Screen.classList.add('hidden');
    mainMenu.classList.remove('hidden');
});

// Game 1: Guess the Number
document.getElementById('submit-guess').addEventListener('click', () => {
    const guessInput = document.getElementById('guess-input');
    const guess = parseInt(guessInput.value);

    if (isNaN(guess) || guess < 1 || guess > 100) {
        alert('Please enter a number between 1 and 100');
        return;
    }

    const resultContainer = document.getElementById('guess-result');
    resultContainer.classList.remove('hidden');

    if (guess === SECRET_NUMBER) {
        document.getElementById('correct-guess').classList.remove('hidden');
        document.getElementById('wrong-guess').classList.add('hidden');
    } else {
        document.getElementById('correct-guess').classList.add('hidden');
        document.getElementById('wrong-guess').classList.remove('hidden');

        document.getElementById('user-guess').textContent = guess;
        document.getElementById('correct-number').textContent = SECRET_NUMBER;

        const difference = Math.abs(guess - SECRET_NUMBER);
        document.getElementById('guess-difference').textContent = difference;

        const feedback = document.getElementById('guess-feedback');
        if (difference > 10) {
            feedback.textContent = "You're way off heheh";
        } else {
            feedback.textContent = "Close! Just a little more!";
        }
    }
});

// Game 2: Positive or Negative
document.getElementById('check-number').addEventListener('click', () => {
    const numberInput = document.getElementById('number-input');
    const number = parseInt(numberInput.value);

    if (isNaN(number)) {
        alert('Please enter a valid number');
        return;
    }

    const resultContainer = document.getElementById('number-result');
    resultContainer.classList.remove('hidden');

    const resultText = document.getElementById('result-text');
    if (number > 0) {
        resultText.textContent = "The number is positive.";
    } else if (number < 0) {
        resultText.textContent = "The number is negative.";
    } else {
        resultText.textContent = "The number is zero.";
    }

    document.getElementById('continue-prompt').classList.remove('hidden');
});

document.getElementById('continue-yes').addEventListener('click', () => {
    document.getElementById('number-input').value = '';
    document.getElementById('number-result').classList.add('hidden');
    document.getElementById('continue-prompt').classList.add('hidden');
});

document.getElementById('continue-no').addEventListener('click', () => {
    resetGame('game2-screen');
    game2Screen.classList.add('hidden');
    mainMenu.classList.remove('hidden');
});

// Game 3: Be My Girlfriend
document.getElementById('gf-yes1').addEventListener('click', () => {
    document.getElementById('girlfriend-step1').classList.add('hidden');
    document.getElementById('girlfriend-step2').classList.remove('hidden');
    document.getElementById('gf-response-affirmative').classList.remove('hidden');
    document.getElementById('gf-response-negative').classList.add('hidden');
});

document.getElementById('gf-no1').addEventListener('click', () => {
    document.getElementById('girlfriend-step1').classList.add('hidden');
    document.getElementById('girlfriend-step2').classList.remove('hidden');
    document.getElementById('gf-response-affirmative').classList.add('hidden');
    document.getElementById('gf-response-negative').classList.remove('hidden');
});

document.getElementById('gf-yes2').addEventListener('click', () => {
    document.getElementById('girlfriend-step2').classList.add('hidden');
    document.getElementById('girlfriend-step3').classList.remove('hidden');
    document.getElementById('gf-response-affirmative2').classList.remove('hidden');
    document.getElementById('gf-response-negative2').classList.add('hidden');
});

document.getElementById('gf-no2').addEventListener('click', () => {
    document.getElementById('girlfriend-step2').classList.add('hidden');
    document.getElementById('girlfriend-step3').classList.remove('hidden');
    document.getElementById('gf-response-affirmative2').classList.add('hidden');
    document.getElementById('gf-response-negative2').classList.remove('hidden');
});

document.getElementById('gf-yes3').addEventListener('click', () => {
    document.getElementById('gf-response-negative2').classList.add('hidden');
    document.getElementById('gf-response-affirmative2').classList.remove('hidden');
});

document.getElementById('gf-no3').addEventListener('click', () => {
    document.getElementById('girlfriend-final-letter').classList.remove('hidden');
});

document.getElementById('read-letter').addEventListener('click', () => {
    document.getElementById('letter-content').classList.remove('hidden');
    document.getElementById('dont-read').classList.add('hidden');
    document.getElementById('read-letter').textContent = "Beautiful ♥";
});

document.getElementById('dont-read').addEventListener('click', () => {
    document.getElementById('letter-content').classList.remove('hidden');
    document.getElementById('dont-read').classList.add('hidden');
    document.getElementById('read-letter').textContent = "Sneak Peek?";
});

// Helper function to reset game states
function resetGame(gameId) {
    switch(gameId) {
        case 'game1-screen':
            document.getElementById('guess-input').value = '';
            document.getElementById('guess-result').classList.add('hidden');
            document.getElementById('correct-guess').classList.add('hidden');
            document.getElementById('wrong-guess').classList.add('hidden');
            break;

        case 'game2-screen':
            document.getElementById('number-input').value = '';
            document.getElementById('number-result').classList.add('hidden');
            document.getElementById('continue-prompt').classList.add('hidden');
            break;

        case 'game3-screen':
            document.getElementById('girlfriend-step1').classList.remove('hidden');
            document.getElementById('girlfriend-step2').classList.add('hidden');
            document.getElementById('girlfriend-step3').classList.add('hidden');
            document.getElementById('gf-response-affirmative').classList.add('hidden');
            document.getElementById('gf-response-negative').classList.add('hidden');
            document.getElementById('gf-response-affirmative2').classList.add('hidden');
            document.getElementById('gf-response-negative2').classList.add('hidden');
            document.getElementById('girlfriend-final-letter').classList.add('hidden');
            document.getElementById('letter-content').classList.add('hidden');
            document.getElementById('dont-read').classList.remove('hidden');
            document.getElementById('read-letter').textContent = "Read Letter";
            break;
    }
}
