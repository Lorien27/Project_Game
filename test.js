//test.js
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const COLOR_PINK = '\x1b[38;2;228;131;178m';
const COLOR_PURPLE = '\x1b[38;2;170;102;204m';
const COLOR_RESET = '\x1b[0m';

function generateRandomCategory() {
    const categories = ['Famous People', 'Science Experiments', 'Space Exploration']; // Adjust as needed
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
        `${COLOR_PINK}Great job!${COLOR_RESET}`,
        `${COLOR_PINK}Well done!${COLOR_RESET}`,
        `${COLOR_PINK}Fantastic!${COLOR_RESET}`,
        `${COLOR_PINK}Excellent!${COLOR_RESET}`,
        `${COLOR_PINK}Awesome!${COLOR_RESET}`
    ];
    return affirmations[Math.floor(Math.random() * affirmations.length)];
}

function main() {
    let numPlayers = 0;
    const playerNames = [];
    let currentIndex = 0;
    const playerPoints = {};

    function getPlayerNames() {
        rl.question(`${COLOR_PINK}Enter the number of players:${COLOR_RESET} `, (num) => {
            numPlayers = parseInt(num);

            if (isNaN(numPlayers) || numPlayers <= 0) {
                console.log('Invalid input! Please enter a positive number.');
                rl.close();
                return;
            }

            getPlayerName();
        });
    }

    function getPlayerName() {
        if (currentIndex < numPlayers) {
            rl.question(`${COLOR_PURPLE}Enter the name of player ${currentIndex + 1}:${COLOR_RESET} `, (name) => {
                playerNames.push(name);
                currentIndex++;
                getPlayerName();
            });
        } else {
            startGame();
        }
    }

    function startGame() {
        const totalTurns = 10; // Adjust the total number of turns
        let currentTurn = 0;

        function playTurn() {
            currentTurn++;

            console.log(`\n${COLOR_PINK}Turn ${currentTurn}${COLOR_RESET}`);

            if (currentTurn > totalTurns) {
                finalizeGame();
                return;
            }

            const randomCategory = generateRandomCategory();
            const randomRule = generateRandomRule(randomCategory);

            console.log(`${COLOR_PINK}Category:${COLOR_RESET} ${randomCategory}`);
            console.log(`${COLOR_PINK}Rule:${COLOR_RESET} ${randomRule}`);

            rl.question('', (userInput) => {
                if (userInput.toLowerCase() === 'done') {
                    finalizeGame();
                    return;
                }

                const playerIndex = parseInt(userInput);

                if (isNaN(playerIndex) || playerIndex < 1 || playerIndex > numPlayers) {
                    console.log('Invalid input! Please enter a valid player number or type "done".');
                    playTurn();
                } else {
                    const playerName = playerNames[playerIndex - 1];
                    if (!playerPoints[playerName]) {
                        playerPoints[playerName] = 0;
                    }
                    playerPoints[playerName]++;
                    console.log(`Adding a point to ${randomCategory} category for player ${playerIndex}.\n`);
                    playTurn();
                }
            });
        }

        function finalizeGame() {
            console.log(`\nFinal Points:`);
            for (const [player, points] of Object.entries(playerPoints)) {
                console.log(`${player}: ${points} points`);
            }

            if (currentTurn <= totalTurns) {
                const highestScorers = getHighestScorers(playerPoints);
                console.log(`\n${getRandomAffirmation()} ${highestScorers.join(', ')} ${
                    highestScorers.length > 1 ? 'are winners' : 'is the winner'
                } with ${playerPoints[highestScorers[0]]} points!`);
            }

            rl.question(`\nDo you want to continue playing? (${COLOR_PINK}yes${COLOR_RESET}/${COLOR_PINK}no${COLOR_RESET}): `, (answer) => {
                if (answer.toLowerCase() === 'yes') {
                    currentTurn = 0;
                    playTurn();
                } else {
                    const highestScorers = getHighestScorers(playerPoints);
                    console.log(`\n${getRandomAffirmation()} ${highestScorers.join(', ')} ${
                        highestScorers.length > 1 ? 'are winners' : 'is the winner'
                    } with ${playerPoints[highestScorers[0]]} points!`);
                    rl.close();
                }
            });
        }

        playTurn();
    }

    getPlayerNames();
}

function getHighestScorers(playerPoints) {
    const maxPoints = Math.max(...Object.values(playerPoints));
    return Object.keys(playerPoints).filter(player => playerPoints[player] === maxPoints);
}

main();
