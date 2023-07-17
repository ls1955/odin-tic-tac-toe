const gameBoard = (function GameBoard() {
    let matrix = []

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            matrix[i] ||= []
            matrix[i][j] = " "
        }
    }
    return {matrix}
})()
