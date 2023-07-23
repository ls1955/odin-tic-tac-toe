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
    let isTieFlag = false

    function playRound(row_index, col_index) {
        board.markBoard(activePlayer.symbol, row_index, col_index)

        if (board.hasWinningPattern(players[0].symbol, players[1].symbol)) {
            winner = activePlayer
            return
        }

        if (board.isFull()) {
            isTieFlag = true
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

    function getWinner() {
        return winner
    }

    function isTie() {
        return isTieFlag
    }

    return {
        getWinner,
        isTie,
        getActivePlayer,
        playRound,
        getBoard: board.getBoard
    }
}

// The controller that handle the game inside the terminal
function TicTacToeConsoleController() {
    // Hardcode players info for now...
    let playerOne = PlayerFactory("player one", "X")
    let playerTwo = PlayerFactory("player two", "O")
    let game = TicTacToeGameController(playerOne, playerTwo)
    let rowInput = -1
    let columnInput = -1

    function play() {
        while (true) {
            console.log(`It is ${game.getActivePlayer().name}'s turn.`);
            console.log(game.getBoard())

            while (true) {
                rowInput = Number(window.prompt("Please select a row."))
                columnInput = Number(window.prompt("Please select a column."))

                if (isValidInput(rowInput, columnInput)) break

                window.alert("The input is invalid. It might be out of bound or is already taken. Please ensure the input is between 0 and 2.")
            }

            game.playRound(rowInput, columnInput)

            if (game.getWinner() !== null) {
                window.alert(`The winner is ${game.getActivePlayer().name}.`)
                break
            }

            if (game.isTie()) {
                window.alert("Looks like it is a tie.")
                break
            }
        }
    }

    function isValidInput(i, j) {
        if (![i, j].every(index => 0 <= index && index <= 2)) return false

        return game.getBoard()[i][j] === " "
    }

    return {
        play,
        isValidInput
    }
}

function TicTacToeWebPageController () {
    let playerOne = PlayerFactory(prompt("Please enter player one name.", "player one"), "X")
    let playerTwo = PlayerFactory(prompt("Please enter player two name.", "player two"), "O")
    let game = TicTacToeGameController(playerOne, playerTwo)
    const buttons = document.querySelectorAll("button")
    const banner = document.querySelector("#banner")

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            let rowIndex = Math.floor(button.dataset.index / 3)
            let colIndex = button.dataset.index % 3

            button.textContent = game.getActivePlayer().symbol
            game.playRound(rowIndex, colIndex)

            banner.textContent = `It is ${game.getActivePlayer().name}'s turn.`
            button.disabled = true

            if (game.getWinner()) {
                banner.textContent = `The winner is ${game.getWinner().name}`
                disableAllButton()
            } else if (game.isTie()) {
                banner.textContent = `Looks like there is no winner`
                disableAllButton()
            }
        })
    })

    function disableAllButton() {
        buttons.forEach(button => button.disabled = true)
    }
}

let webPageGameController = TicTacToeWebPageController()

// Uncomment below exports if test
// module.exports = [
//     GameBoard, PlayerFactory,
//     TicTacToeGameController, TicTacToeConsoleController
// ]
