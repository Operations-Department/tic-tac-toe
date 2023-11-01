const domVariables = {

    gameBox: document.getElementById('game-box'),
    restart: document.getElementById('restart-button'),
    cell: document.querySelectorAll('.game-square'),
    instructions: document.getElementById('instructions'),
    player1Turn: true,       //variable to toggle between player's turn

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
            cell.setAttribute('data-index', `${index}`); //connect with array index

            domVariables.cell = document.querySelectorAll('.game-square'); //ensures variables are assigned correctly and prevents error
            
            domVariables.instructions.textContent = `X's turn`

        });

    })(),

    //updates the display to reflect gameBoard grid array
    updateDisplay: function() {

        for (let i = 0; i < gameBoard.grid.length; i++) {
            domVariables.cell[i].textContent = gameBoard.grid[i];
        }

        gameController.togglePlayerTurn();
        return;
    },

    //send player marker to array, calls updateDisplay to show in grid
    playRound: function(event) {

        if (event.target.textContent !== '') return; // prevents from clicking the same square more than once
        let index = event.target.getAttribute('data-index');

        if (domVariables.player1Turn) gameBoard.grid[index] = player1.makeMark();
        if (!domVariables.player1Turn) gameBoard.grid[index] = player2.makeMark();
        gameController.updateDisplay();

    },

    //empties array, sets X to start new game, updateDisplay called and relects empty array
    restartGame: function() {

        gameBoard.grid = ['', '', '', '', '', '', '', '', ''];  //reset grid
        gameController.updateDisplay();
        domVariables.player1Turn = true;   //reset - always 'X' starts

    },

    togglePlayerTurn: function() {

        if (domVariables.player1Turn) {
            domVariables.player1Turn = false;
            return domVariables.instructions.textContent = `O's turn`;
        }

        if (!domVariables.player1Turn) {
            domVariables.player1Turn = true;
            return domVariables.instructions.textContent = `X's turn`;
        }

    },

    checkForWinner: function() {
        //loop through grid
        //compare to find winning combination
        return;
    }

};

domVariables.gameBox.addEventListener('click', gameController.playRound);
domVariables.restart.addEventListener('click', gameController.restartGame);

//factory to create players
const createPlayer = function(mark) {

    const player = {
        mark: mark,
        makeMark() {
            return this.mark;
        }
    };

    return player;

};

const player1 = createPlayer('X');
const player2 = createPlayer('O');