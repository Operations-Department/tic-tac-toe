const domVariables = {
    gameBox: document.getElementById('game-box'),
    restart: document.getElementById('restart-button'),
};

//stores the game grid items
const gameBoard = {
    grid: [
        '', '', '',
        '', '', '',
        '', '', '',
    ]
};

//sets up and displays the grid to the dom
const gameController = {
    displayGrid: (function() {
        return gameBoard.grid.forEach((cellContent, index) => {
            const cell = document.createElement('button');
            cell.textContent = cellContent;

            domVariables.gameBox.appendChild(cell);
            cell.classList.add('game-square');
            cell.classList.add(`cell-${index}`);
            cell.setAttribute('data-index', `${index}`);
        });
    })(),
    markCell: (function() {
        domVariables.gameBox.addEventListener('click', function(event) {
            if (event.target.textContent !== '') return;
            let index = event.target.getAttribute('data-index');
            //give data-index to updateDisplay()
        });
    })(),
    updateDisplay: (function() {
        //update the display
    })(),
    restartGame: (function() {
        domVariables.restart.addEventListener('click', () => {
            gameBoard.grid = ['', '', '', '', '', '', '', '', ''];
            //gameController.updateDisplay();
        });
    })(),
};

// //puts x/o mark into cell & array;
// const markCell = (function() {
//     domVariables.gameBox.addEventListener('click', function(event) {
//         if (event.target.textContent !== '') return;
//         let index = event.target.getAttribute('data-index');
//         event.target.textContent = 'X';
//         gameBoard.grid[index] = 'X';  
//         console.log(gameBoard.grid);
//     });
// })();

//factory to create players
const createPlayer = function (name, symbol, order) {
    return {
        name,
        symbol,
        order,
        getInfo() {
            return `${this.name} has the symbol '${this.symbol}' and is ${this.order} in play order.`;
        }
    };
};

const player1 = createPlayer('Player1', 'X', 'first');
const player2 = createPlayer('Player2', 'O', 'second');