import { useEffect, useState } from "react";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { gameService } from "@/services/gameService";
import { bingoService } from "@/services/bingoService";
import { BingoBoard } from "@/constants/types";

export const useBingoGame = (board: BingoBoard) => {
  const [isWinner, setIsWinner] = useState(false);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const { playWinSound } = useSoundEffects();
  useEffect(() => {
    // Check for win conditions and completion percentage
    const checkGameStatus = () => {
      const hasWon = gameService.checkBingoWin(board);
      const percentage = gameService.getBoardCompletionPercentage(board);

      setIsWinner(hasWon);
      setCompletionPercentage(percentage);

      // Play win sound if won
      if (hasWon) {
        playWinSound();
      }
    };

    checkGameStatus();
  }, [board, board.items, playWinSound]);

  const resetBoard = async () => {
    if (!board.id) return;
    await bingoService.resetBoard(board.id);
    setIsWinner(false);
  };

  const randomizeBoard = async () => {
    if (!board.id) return;
    await bingoService.randomizeBoard(board.id);
  };

  return {
    isWinner,
    completionPercentage,
    resetBoard,
    randomizeBoard,
  };
};
