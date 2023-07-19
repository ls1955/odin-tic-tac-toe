const [GameBoard, PlayerFactory] = require("./index")

test("GameBoard#getBoard should return an empty board at beginning", () => {
    let gameBoard = GameBoard()

    exp = [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "]
    ]

    expect(gameBoard.getBoard()).toEqual(exp)
})

test("GameBoard#markBoard should mark a cell of board with given symbol", () => {
    let gameBoard = GameBoard()

    gameBoard.markBoard("X", 0, 0)

    exp = [
        ["X", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "]
    ]

    expect(gameBoard.getBoard()).toEqual(exp)
})

test("PlayerFactory should return an object with name and symbol", () => {
    let playerOne = PlayerFactory("player one", "X")
    let playerTwo = PlayerFactory("player two", "O")

    expect(playerOne.name).toBe("player one")
    expect(playerOne.symbol).toBe("X")
    expect(playerTwo.name).toBe("player two")
    expect(playerTwo.symbol).toBe("O")
})