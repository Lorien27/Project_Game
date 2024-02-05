const COLOR_PINK = 'color: #e483b2;';

function generateRandomCategory() {
    const categories = ['Famous Person', 'color', 'singer',' presidents', 'something you find on a desk', 'kitchen items', 'animal'];
    return categories[Math.floor(Math.random() * categories.length)];
}

function generateRandomRule(selectedCategory) {
    const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const syllableCount = Math.floor(Math.random() * 3) + 1;

    const ruleOptions = [
        `Name a ${selectedCategory.toLowerCase()} that contains the letter "${letter}".`,
        `Name a ${selectedCategory.toLowerCase()} that does not contain the letter "${letter}".`,
        `Name a ${selectedCategory.toLowerCase()} that has ${syllableCount} syllables.`
    ];

    return ruleOptions[Math.floor(Math.random() * ruleOptions.length)];
}

function getRandomAffirmation() {
    const affirmations = [
        `<p style="${COLOR_PINK}">Great job!</p>`,
        `<p style="${COLOR_PINK}">Well done!</p>`,
        `<p style="${COLOR_PINK}">Fantastic!</p>`,
        `<p style="${COLOR_PINK}">Excellent!</p>`,
        `<p style="${COLOR_PINK}">Awesome!</p>`
    ];
    return affirmations[Math.floor(Math.random() * affirmations.length)];
}

let numPlayers = 0;
const playerNames = [];
let currentIndex = 0;
const playerPoints = {};

const outputElement = document.getElementById('output');
const userInputElement = document.getElementById('user-input');

function playTurn() {
    const totalTurns = 10;
    const randomCategory = generateRandomCategory();
    const randomRule = generateRandomRule(randomCategory);

    outputElement.innerHTML += `<p style="${COLOR_PINK}">Turn ${currentIndex + 1}</p>`;
    outputElement.innerHTML += `<p style="${COLOR_PINK}">Category: ${randomCategory}</p>`;
    outputElement.innerHTML += `<p style="${COLOR_PINK}">Rule: ${randomRule}</p>`;
    outputElement.innerHTML += '<p style="color: #000;">Enter player number or type "done" to end the turn:</p>';
    userInputElement.value = '';

    function handleTurnInput() {
        const userInput = userInputElement.value.trim();

        if (userInput.toLowerCase() === 'done') {
            currentIndex++;
            if (currentIndex < totalTurns) {
                userInputElement.removeEventListener('change', handleTurnInput);
                userInputElement.removeEventListener('keydown', handleEnterKey);
                playTurn();
            } else {
                finalizeGame();
            }
        } else {
            const playerIndex = parseInt(userInput);
            if (!isNaN(playerIndex) && playerIndex >= 1 && playerIndex <= numPlayers) {
                const playerName = playerNames[playerIndex - 1];
                if (!playerPoints[playerName]) {
                    playerPoints[playerName] = 0;
                }
                playerPoints[playerName]++;
                outputElement.innerHTML += `<p style="${COLOR_PINK}">Adding a point to ${randomCategory} category for ${playerName}.</p>`;
                currentIndex++;
                if (currentIndex < totalTurns) {
                    userInputElement.removeEventListener('change', handleTurnInput);
                    userInputElement.removeEventListener('keydown', handleEnterKey);
                    playTurn();
                } else {
                    finalizeGame();
                }
            } else {
                outputElement.innerHTML += '<p style="color: red;">Invalid input! Please enter a valid player number or type "done".</p>';
            }
        }
    }

    function handleEnterKey(event) {
        if (event.key === 'Enter') {
            handleTurnInput();
        }
    }

    userInputElement.removeEventListener('change', handleTurnInput);
    userInputElement.removeEventListener('keydown', handleEnterKey);

    userInputElement.addEventListener('change', handleTurnInput);
    userInputElement.addEventListener('keydown', handleEnterKey);

    userInputElement.focus();
}

function finalizeGame() {
    outputElement.innerHTML += `<p style="${COLOR_PINK}">Game Over! Points after the last completed turn:</p>`;
    for (const [player, points] of Object.entries(playerPoints)) {
        outputElement.innerHTML += `<p>${player}: ${points} points</p>`;
    }

    const highestScorers = getHighestScorers(playerPoints);
    outputElement.innerHTML += `<p>${getRandomAffirmation()} ${highestScorers.join(', ')} ${
        highestScorers.length > 1 ? 'are winners' : 'is the winner'
    } with ${playerPoints[highestScorers[0]]} points!</p>`;
}

function getHighestScorers(playerPoints) {
    const maxPoints = Math.max(...Object.values(playerPoints));
    return Object.keys(playerPoints).filter(player => playerPoints[player] === maxPoints);
}

document.getElementById('start-game-button').addEventListener('click', function () {
    numPlayers = parseInt(prompt('Enter the number of players:'));

    if (isNaN(numPlayers) || numPlayers <= 0) {
        alert('Invalid input! Please enter a positive number.');
        return;
    }

    for (let i = 0; i < numPlayers; i++) {
        playerNames.push(prompt(`Enter the name of player ${i + 1}:`));
    }

    currentIndex = 0;
    playTurn();
});
