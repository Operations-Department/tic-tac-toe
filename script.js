const gameBox = document.getElementById('game-box');
const restart = document.getElementById('restart-button');

//stores the game grid items
const gameBoard = {
    grid: [
        '', '', '',
        '', '', '',
        '', '', '',
    ]
};

//displays the grid to the dom
const gameController = {
    displayGrid: function() {
        return gameBoard.grid.forEach((cellContent, index) => {
            const cell = document.createElement('button');
            cell.textContent = cellContent;

            gameBox.appendChild(cell);
            cell.classList.add('game-square');
            cell.classList.add(`cell-${index}`);
            cell.setAttribute('data-index', `${index}`);
        });
    }
};

//puts x/o mark into cell/array;
const mark = (function() {
    gameBox.addEventListener('click', function(event) {
        if (event.target.textContent !== '') return;
        let index = event.target.getAttribute('data-index');
        event.target.textContent = 'X';
        gameBoard.grid[index] = 'X';  
        console.log(gameBoard.grid);
    });
})();

//setup game/grid on screen load
const setupGame = (function() {
    document.addEventListener('DOMContentLoaded', () => {
        gameController.displayGrid();
    });
})();

//factory to create players
const createPlayer = (function(name, symbol, order) {
    return {
        name,
        symbol,
        order,
        getInfo() {
            return `${this.name} has the symbol '${this.symbol}' and is ${this.order} in play order.`;
        }
    };
})();

const player1 = createPlayer('Player1', 'X', 'first');
const player2 = createPlayer('Player2', 'O', 'second');