const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const cells = document.querySelectorAll('.cell');
const board = document.querySelector('.board');
const winningText = document.querySelector('.winningText');
const winningScreen = document.querySelector('.winning');
const restartBtn = document.querySelector('.restart');
let circleTurn

startGame()

restartBtn.addEventListener('click', startGame)

function startGame() {
    circleTurn = false;
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', click)
        cell.addEventListener('click', click, { once: true });
    })
    winningScreen.classList.remove('show');
    addHoverEffect()
}

function click(e) {
    const cell = e.target;
    let currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if(checkWin(currentClass)) {
        endGame(false)
    } else if(isDraw()) {
        endGame(true)
    } else {
        swapTurn();
        addHoverEffect()
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurn() {
    circleTurn = !circleTurn;
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        })
    })
}

function addHoverEffect() {
    board.classList.remove(CIRCLE_CLASS);
    board.classList.remove(X_CLASS);
    if(circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function endGame(draw) {
    if(draw) {
        winningText.innerText = 'Draw!'
    } else {
        winningText.innerText = `${circleTurn ? "O's " : "X's "} Wins!`;
    }
    winningScreen.classList.add('show');
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    })
}
