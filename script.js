const gameBox = document.getElementById('game-box');

//stores the game grid items
const gameBoard = {
    grid: [
        'x', 'o', 'o',
        'o', 'x', 'x',
        'o', 'x', 'x',
    ]
};

//displays the grid items to the dom
const displayController = {
    displayGrid: function() {
        return gameBoard.grid.forEach((cellContent, index) => {
            const cell = document.createElement('div');
            cell.textContent = cellContent;

            gameBox.appendChild(cell);
            // cell.classList.add('game-square');
        });
    }
}

//puts game on screen when loaded
document.addEventListener('DOMContentLoaded', displayController.displayGrid());

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
});

const player1 = createPlayer('Player1', 'X', 'first');
const player2 = createPlayer('Player2', 'O', 'second');

