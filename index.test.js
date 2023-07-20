const [GameBoard, PlayerFactory, TicTacToeGameController, TicTacToeConsoleController] = require("./index")

test("GameBoard#getBoard should return an empty board at beginning", () => {
    let board = GameBoard()

    exp = [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "]
    ]

    expect(board.getBoard()).toEqual(exp)
})

test("GameBoard#markBoard should mark a cell of board with given symbol", () => {
    let board = GameBoard()

    board.markBoard("X", 0, 0)

    exp = [
        ["X", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "]
    ]

    expect(board.getBoard()).toEqual(exp)
})

test("GameBoard#isFull should return false at the beginning of the game", () => {
    let board = GameBoard()

    expect(board.isFull()).toEqual(false)
})

test("GameBoard#isFull should return true if every cell is fill with symbol", () => {
    let board = GameBoard()

    expect(board.isFull()).toEqual(false)

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            board.markBoard("X", i, j)
        }
    }

    expect(board.isFull()).toEqual(true)
})

test("GameBoard#hasWinningPattern should return true if row fill with same symbol", () => {
    let board = GameBoard()

    for (let i = 0; i < 3; i++) board.markBoard("X", 0, i)

    expect(board.hasWinningPattern("X", "O")).toEqual(true)
})

test("GameBoard#hasWinningPattern should return true if col fill with same symbol", () => {
    let board = GameBoard()

    for (let i = 0; i < 3; i++) board.markBoard("X", i, 0)

    expect(board.hasWinningPattern("X", "O")).toEqual(true)
})

test("GameBoard#hasWinningPattern should return true if diagonal fill with same symbol", () => {
    let board = GameBoard()

    for (let i = 0; i < 3; i++) board.markBoard("X", i, i)

    expect(board.hasWinningPattern("X", "O")).toEqual(true)
})

test("PlayerFactory should return an object with name and symbol", () => {
    let playerOne = PlayerFactory("player one", "X")
    let playerTwo = PlayerFactory("player two", "O")

    expect(playerOne.name).toBe("player one")
    expect(playerOne.symbol).toBe("X")
    expect(playerTwo.name).toBe("player two")
    expect(playerTwo.symbol).toBe("O")
})

test("TicTacToeGameController could switch between active player after a round", () => {
    let playerOne = PlayerFactory("player one", "X")
    let playerTwo = PlayerFactory("player two", "O")
    let controller = TicTacToeGameController(playerOne, playerTwo)

    expect(controller.getActivePlayer()).toBe(playerOne)

    controller.playRound(0, 0)

    expect(controller.getActivePlayer()).toBe(playerTwo)
})

test("TicTacToeConsoleController could identify if input is valid", () => {
    let controller = TicTacToeConsoleController()

    expect(controller.isValidInput(0, 0)).toEqual(true)
    expect(controller.isValidInput(-10, -10)).toEqual(false)
})
