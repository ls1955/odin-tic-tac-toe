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

function TicTacToeGameController(playerOne, playerTwo) {
    const players = [playerOne, playerTwo]
    const board = GameBoard()
    let activePlayer = players[0]

    const playRound = (row_index, col_index) => {
        console.log(`It is ${activePlayer.name}'s turn.`)

        board.markBoard(activePlayer.symbol, row_index, col_index)

        // TODO: What if there is a winner, or there is a tie?

        switchActivePlayer()
    }

    const getActivePlayer = () => activePlayer

    const switchActivePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0] 
    }

    return {
        getActivePlayer,
        playRound,
        getBoard: board.getBoard
    }
}

module.exports = [GameBoard, PlayerFactory, TicTacToeGameController]
