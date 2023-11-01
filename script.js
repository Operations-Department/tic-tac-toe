const domVariables = {

    gameBox: document.getElementById('game-box'),
    restart: document.getElementById('restart-button'),
    cell: document.querySelectorAll('.game-square'),
    playerTurn: true,       //variable to toggle between players

};

//stores the game grid items
const gameBoard = {

    grid: [
        '', '', '',
        '', '', '',
        '', '', '',
    ],

};

//sets up and displays the grid to the dom
const gameController = {

    //displays empty grid on page load
    displayGrid: (function() {
        return gameBoard.grid.forEach((cellContent, index) => {
            const cell = document.createElement('button');
            cell.textContent = cellContent;

            domVariables.gameBox.appendChild(cell);
            cell.classList.add('game-square');
            cell.classList.add(`cell-${index}`);
            cell.setAttribute('data-index', `${index}`); //to connect with array index

            domVariables.cell = document.querySelectorAll('.game-square'); //ensures variables are assigned correctly and prevents error
        });
    })(),

    //updates the display to reflect gameBoard grid array
    updateDisplay: function() {
        for (let i = 0; i < gameBoard.grid.length; i++) {
            domVariables.cell[i].textContent = gameBoard.grid[i];
        }
        console.log(gameBoard.grid);
        return;
    },

    //send player marker to array, calls updateDisplay to show in grid
    playRound: function(event) {
        if (event.target.textContent !== '') return; // prevents from clicking the same square more than once

        let index = event.target.getAttribute('data-index');

        // gameBoard.grid[index] = 'X';
        gameBoard.grid[index] = 'O';

        gameController.updateDisplay();
    },

    //empties array and calls updateDisplay to reflect empty array
    restartGame: function() {
        gameBoard.grid = ['', '', '', '', '', '', '', '', ''];
        gameController.updateDisplay();
    },

};

domVariables.gameBox.addEventListener('click', gameController.playRound);
domVariables.restart.addEventListener('click', gameController.restartGame);

//factory to create players
const createPlayer = function (symbol) {

    const player = {
        symbol: symbol,
        makeMark() {
            return this.symbol;
        }
    };

    return player;

};

const playerX = createPlayer('X');
const playerO = createPlayer('O');