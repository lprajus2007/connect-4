import express, { Router } from "express";

import { applyMove, gameState, resetGame } from "./utils";

class App {
  public router: Router = express.Router();

  constructor() {
    // Get the game state
    this.router.get("/state", (req, res) => {
      res.json(gameState);
    });

    // Make a move
    this.router.post("/move", (req, res) => {
      const { column } = req.body;
      if (column === undefined || column < 0 || column > 6) {
        return res.status(400).json({ message: "Invalid column" });
      }

      const result = applyMove(column);

      if (!result.success) {
        return res.status(400).json({ message: result.error });
      }

      res.json(gameState);
    });

    // Reset the game
    this.router.post("/reset", (req, res) => {
      resetGame();
      res.json({ message: "Game reset successfully", gameState });
    });
  }
}

const api = new App();

export default api;
