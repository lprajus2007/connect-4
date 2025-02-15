import React, { useEffect, useState } from "react";
import axios from "axios";

import styles from "./Board.module.scss";

enum CellState {
  Empty,
  Red,
  Yellow,
}

const Board: React.FC = () => {
  const [board, setBoard] = useState<CellState[][]>([]);
  const [hoverColumn, setHoverColumn] = useState<number | null>(null);
  const [currentTurn, setCurrentTurn] = useState<CellState>(CellState.Red);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [gameStatus, setGameStatus] = useState<string>("");

  // Fetch the current game state on component mount
  useEffect(() => {
    axios
      .get("/api/state")
      .then((response) => {
        setBoard(response.data.board);
        setCurrentTurn(response.data.currentTurn);
      })
      .catch((err) => console.error("Error fetching game state", err));
  }, []);

  // Handle column button click
  const handleColumnClick = (colIndex: number) => {
    axios
      .post("/api/move", { column: colIndex, player: currentTurn })
      .then((response) => {
        setBoard(response.data.board);
        setCurrentTurn(response.data.currentTurn);
        setGameStatus(response.data.gameStatus);

        if (!!response.data.winner) {
          setErrorMsg(`${CellState[response.data.winner]} wins!`);
        } else {
          setErrorMsg("");
        }
      })
      .catch((error) => {
        setErrorMsg(error.response.data.message || "Invalid move");
      });
  };

  return (
    <div className={styles.container}>
      {!errorMsg && (
        <h3 className={styles.title}>Current Turn: {CellState[currentTurn]}</h3>
      )}
      {errorMsg && (
        <div className={styles.errorContainer}>
          <p style={{ color: "red" }}>{errorMsg}</p>
          <button
            onClick={() => {
              axios
                .post("/api/reset")
                .then((response) => {
                  setBoard(response.data.gameState.board);
                  setCurrentTurn(response.data.gameState.currentTurn);
                  setGameStatus("");
                  setErrorMsg("");
                })
                .catch((err) => console.error("Error resetting game", err));
            }}
          >
            Reset Game
          </button>
          <br />
          <button onClick={() => setErrorMsg("")}>Close</button>
        </div>
      )}
      {gameStatus && <p>{gameStatus}</p>}
      <div className={styles.board}>
        {board &&
          board.map((row, rowIndex) => (
            <div key={rowIndex} className={styles.row}>
              {row.map((cell, colIndex) => (
                <div
                  key={colIndex}
                  onClick={() => handleColumnClick(colIndex)}
                  onMouseEnter={() => setHoverColumn(colIndex)}
                  onMouseLeave={() => setHoverColumn(null)}
                  className={`${
                    colIndex === hoverColumn ? styles.hoverColumn : ""
                  } ${styles.cell}`}
                >
                  {cell === CellState.Red && (
                    <div className={`${styles.disc} ${styles.red_disc}`} />
                  )}
                  {cell === CellState.Yellow && (
                    <div className={`${styles.disc} ${styles.yellow_disc}`} />
                  )}
                  {cell === CellState.Empty && (
                    <div className={`${styles.disc} ${styles.empty_disc}`} />
                  )}
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Board;
