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

    function isFull() {
        return getBoard().every(row => row.every(cell => cell != " "))
    }

    function hasWinningPattern(symbolOne, symbolTwo) {
        return hasHorizontalWinningPattern(symbolOne, symbolTwo) ||
                hasVerticalWinningPattern(symbolOne, symbolTwo) ||
                hasDiagonalWinningPattern(symbolOne, symbolTwo) ||
                false
    }

    function hasHorizontalWinningPattern(symbolOne, symbolTwo) {
        for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
            const row = board[rowIndex]

            if (row.every(cell => cell === symbolOne) ||
                row.every(cell => cell === symbolTwo)) {
                    return true
                }
        }
        return false
    }

    function hasVerticalWinningPattern(symbolOne, symbolTwo) {
        const columns = [[], [], []]

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                columns[j].push(board[i][j])
            }
        }

        for (let i = 0; i < columns.length; i++) {
            if (columns[i].every(cell => cell === symbolOne) ||
                columns[i].every(cell => cell === symbolTwo)) {
                    return true
            }
        }
        return false
    }

    function hasDiagonalWinningPattern(symbolOne, symbolTwo) {
        const diagonals = [[], []]

        for (let i = 0; i < 3; i++) {
            diagonals[0].push(board[i][i])
            diagonals[1].push(board[i][2 - i])
        }

        for (let i = 0; i < diagonals.length; i++) {
            if (diagonals[i].every(cell => cell === symbolOne) ||
                diagonals[i].every(cell => cell === symbolTwo)) {
                    return true
            }
        }
        return false
    }

    return {
        getBoard,
        markBoard,
        isFull,
        hasWinningPattern
    }
}

function PlayerFactory(name, symbol) {
    return {
        name,
        symbol
    }
}

// The game controller that is use to play a round.
// Has some status to notify that the game has a winner,
// or it is a tie
function TicTacToeGameController(playerOne, playerTwo) {
    const players = [playerOne, playerTwo]
    const board = GameBoard()
    let activePlayer = players[0]
    let winner = null
    let isTie = false

    function playRound(row_index, col_index) {
        console.log(`It is ${activePlayer.name}'s turn.`)

        board.markBoard(activePlayer.symbol, row_index, col_index)

        if (board.hasWinningPattern(players[0].symbol, players[1].symbol)) {
            winner = activePlayer
            return
        }

        if (board.isFull()) {
            isTie = true
            return
        }

        switchActivePlayer()
    }

    function getActivePlayer() {
        return activePlayer
    }

    function switchActivePlayer() {
        activePlayer = activePlayer === players[0] ? players[1] : players[0] 
    }

    return {
        winner,
        isTie,
        getActivePlayer,
        playRound,
        getBoard: board.getBoard
    }
}

module.exports = [
    GameBoard, PlayerFactory,
    TicTacToeGameController
]
