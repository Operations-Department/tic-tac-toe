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
            cell.setAttribute('data-index', `${index}`); //connect with gameBoard.griday index

            domVariables.cell = document.querySelectorAll('.game-square'); //ensures variables are assigned correctly and prevent errors
            
            domVariables.instructions.textContent = `X's turn`

        });

    })(),

    //updates the display to reflect gameBoard grid gameBoard.griday
    updateDisplay: function() {

        for (let i = 0; i < gameBoard.grid.length; i++) {
            domVariables.cell[i].textContent = gameBoard.grid[i];
        }

        gameController.togglePlayerTurn();
        return;
    },

    //send player marker to gameBoard.grid, calls updateDisplay to show in grid
    playRound: function(event) {

        if (event.target.textContent !== '') return; // prevents from clicking the same square more than once
        let index = event.target.getAttribute('data-index');

        if (domVariables.player1Turn) gameBoard.grid[index] = player1.makeMark();
        if (!domVariables.player1Turn) gameBoard.grid[index] = player2.makeMark();
        gameController.updateDisplay();
        gameController.getWinner();

    },

    //empties gameBoard.grid, sets X to start new game, updateDisplay called and reflects empty gameBoard.griday
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

    getWinner: function() {
        for (let i = 0; i < gameBoard.grid.length; i += 3) {

            const row = gameBoard.grid.slice(i, i + 3).join('');

            if (row.match(/X{3}|O{3}/)) return domVariables.instructions.textContent = row[0] + ' wins';
        };
    
        for (let i = 0; i < 3; i++) {

            const column = [gameBoard.grid[i], gameBoard.grid[i+3], gameBoard.grid[i+6]].join('');

            if (column.match(/X{3}|O{3}/)) return domVariables.instructions.textContent = column[0] + ' wins';        
        };
    
        const diagonalLeft = [gameBoard.grid[0], gameBoard.grid[4], gameBoard.grid[8]].join('');
        const diagonalRight = [gameBoard.grid[2], gameBoard.grid[4], gameBoard.grid[6]].join('');

        if (diagonalLeft.match(/X{3}|O{3}/)) return domVariables.instructions.textContent = diagonalLeft[0] + ' wins';
        if (diagonalRight.match(/X{3}|O{3}/)) return domVariables.instructions.textContent = diagonalRight[0] + ' wins';

        const string = gameBoard.grid.join('');
        if (string.length === 9) domVariables.instructions.textContent = `It's a Draw`;

    },

};

domVariables.gameBox.addEventListener('click', gameController.playRound);
domVariables.restart.addEventListener('click', gameController.restartGame);

//factory function to create players
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