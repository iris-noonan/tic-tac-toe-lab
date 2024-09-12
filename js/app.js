/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winner;
let tie;
/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll(".sqr");
const messageEl = document.querySelector("#message");
const resetBtnEl = document.querySelector("#reset");
/*-------------------------------- Functions --------------------------------*/
function init() {
    console.log("Init");
    board = ['', '', '', '', '', '', '', '', ''];
    turn = "X";
    winner = false;
    tie = false;
    render();
}

function updateBoard() {
    board.forEach((element, index) => {
        if (board[index] === "X") {
            squareEls[index].innerHTML = "X";
        } else if (board[index] === "0") {
            squareEls[index].innerHTML = "0";
        } else {
            squareEls[index].innerHTML = "";
        }
    })
};

function updateMessage() {
    if(!winner && !tie) {
        messageEl.innerHTML = "Game is on";
    }else if (!winner && tie) {
        messageEl.innerHTML = "Tied game";
    } else {
        messageEl.innerHTML = `Winner, winner! Player ${turn} wins!`;
    }
}

function render() {
    updateBoard();
    updateMessage();
}

function handleClick (event) {
    placePiece(event.target.id);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
}

function placePiece(index) {
    board[index] = turn;
}

function checkForWinner() {
    winningCombos.forEach((combo) => {
        const first = board[combo[0]];
        const second = board[combo[1]];
        const third = board[combo[2]];
        if (first === "") {
            return;
        } else if (first === second && first === third) {
            winner = true;
        }
    })
}

function checkForTie() {
    if (winner) {
        return;
    }
    const freeSquare = board.some((square) => {
        return square === "";
    });
    tie = freeSquare ? false : true;
}

function switchPlayerTurn() {
    if (winner) {
        return;
    } else {
        turn === "X" ? turn = "0" : turn = "X";
    }
}

/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach(square => {
    square.addEventListener('click', (event) => {
        const squareIndex = event.target.id;
        if (board[squareIndex] === "X" || board[squareIndex] === "0") {
            return;
        }
        if (winner) {
            return;
        }
        handleClick(event);
    })
})

resetBtnEl.addEventListener('click', () => {
    init();
})

init();