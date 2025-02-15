enum CellState {
  Empty,
  Red,
  Yellow,
}

type Board = CellState[][];

interface GameState {
  board: Board;
  currentTurn: CellState.Red | CellState.Yellow;
  gameOver: boolean;
  winner: CellState | null;
}

let gameState: GameState = {
  board: Array.from({ length: 6 }, () => Array(7).fill(CellState.Empty)),
  currentTurn: CellState.Red,
  gameOver: false,
  winner: null,
};

// Function to check if a move is valid
const isValidMove = (column: number): boolean => {
  return gameState.board[0][column] === CellState.Empty;
};

// Function to apply a move
const applyMove = (column: number): { success: boolean; error?: string } => {
  if (gameState.gameOver) return { success: false, error: "Game is over" };
  if (!isValidMove(column)) return { success: false, error: "Invalid move" };

  for (let row = 5; row >= 0; row--) {
    if (gameState.board[row][column] === CellState.Empty) {
      gameState.board[row][column] = gameState.currentTurn;
      if (checkWin(row, column, gameState.currentTurn)) {
        gameState.gameOver = true;
        gameState.winner = gameState.currentTurn;
      }
      gameState.currentTurn =
        gameState.currentTurn === CellState.Red
          ? CellState.Yellow
          : CellState.Red;
      return { success: true };
    }
  }
  return { success: false, error: "Column full" };
};

// Function to check win conditions
const checkWin = (row: number, col: number, player: CellState): boolean => {
  const directions = [
    { r: 0, c: 1 }, // Horizontal
    { r: 1, c: 0 }, // Vertical
    { r: 1, c: 1 }, // Diagonal right-down
    { r: 1, c: -1 }, // Diagonal left-down
  ];

  for (const { r, c } of directions) {
    let count = 1;

    for (let i = 1; i < 4; i++) {
      const newRow = row + i * r;
      const newCol = col + i * c;
      if (newRow < 0 || newRow >= 6 || newCol < 0 || newCol >= 7) break;
      if (gameState.board[newRow][newCol] !== player) break;
      count++;
    }

    for (let i = 1; i < 4; i++) {
      const newRow = row - i * r;
      const newCol = col - i * c;
      if (newRow < 0 || newRow >= 6 || newCol < 0 || newCol >= 7) break;
      if (gameState.board[newRow][newCol] !== player) break;
      count++;
    }

    if (count >= 4) return true;
  }

  return false;
};

// Function to reset the game
const resetGame = () => {
  gameState = {
    board: Array.from({ length: 6 }, () => Array(7).fill(CellState.Empty)),
    currentTurn: CellState.Red,
    gameOver: false,
    winner: null,
  };
};

export { gameState, applyMove, resetGame };