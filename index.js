function GameBoard() {
    let board = []
    let rowLength = 3
    let colLength = 3

    for (let i = 0; i < rowLength; i++) {
        board[i] = []
        for (let j = 0; j < colLength; j++) {
            board[i][j] = " "
        }
    }

    function getBoard() {
        return board
    }

    function markBoard(symbol, i, j) {
        board[i][j] = symbol
    }

    return {
        getBoard,
        markBoard
    }
}

function PlayerFactory(name, symbol) {
    return {
        name,
        symbol
    }
}

module.exports = [GameBoard, PlayerFactory]
