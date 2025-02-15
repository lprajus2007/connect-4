# Connect4

Connect4 is a classic two-player connection game in which the players first choose a color and then take turns dropping colored discs from the top into a seven-column, six-row vertically suspended grid. The pieces fall straight down, occupying the next available space within the column. The objective of the game is to be the first to form a horizontal, vertical, or diagonal line of four of one's own discs.

## Features

- Interactive and user-friendly interface
- Game detects wins and draws
- Game state managed serverside to preserve state between refreshes
- Built with React, ExpressJS, Typescript, and Vite

## Installation

To get started with the project, clone the repository and install the dependencies:

```bash
git clone https://github.com/lprajus2007/connect-4.git
cd connect-4
npm install
```

## Usage

To start the development server, run:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000` to see the application in action.

## Extension and Next Steps

- **Remote gameplay:** Add ability to play remotely by adding a _Websocket server_ that allows real-time state updates across browser windows
- **Testing:** Add _unit and integration tests_ to API endpoints to ensure robustness and avoid introducing bugs as the codebase gets updated
- **Authentication:** Add _authentication_ so users can login and view/continue previous games and history
- **Saved sessions:** Add a _Redis cache_ on the backend instead of saving game state in-memory to preserve state across server restarts
- **Game history:**  Add a _database_ to save each player's moves which is helpful to review game history and also, to gather data useful for training an AI opponent

### Opponent

- A basic deterministic opponent can be built with the following pseudocode:
  1. Check if there is a win in 1 step
  2. Check and block if the opponent has a win in 1 step
  3. Pick a valid random move otherwise

- Build a neural network using the saved game history of human-human games _(board state -> best move)_ and simulated game data generated using a deterministic algorithm such as minimax algorithm. Apply supervised learning techniques to classify good moves.

- More sophisticated AI models can be built using reinforcement learning where the AI model plays with itself using a reward function or even better, use a deep reinforcement learning framework such as [MuZero](https://deepmind.google/discover/blog/muzero-mastering-go-chess-shogi-and-atari-without-rules/)

