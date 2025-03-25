import { useEffect, useRef, useState } from "react";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { gameService } from "@/services/gameService";
import { bingoService } from "@/services/bingoService";
import { BingoBoard } from "@/constants/types";
import { useConfetti } from "@/hooks/useConfetti";

export const useBingoGame = (board: BingoBoard) => {
  const [isWinner, setIsWinner] = useState(false);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const hasPlayedWinSound = useRef(false);
  const { playWinSound } = useSoundEffects();
  const { triggerConfettiRain } = useConfetti();
  useEffect(() => {
    // Check for win conditions and completion percentage
    const checkGameStatus = () => {
      const hasWon = gameService.checkBingoWin(board);
      const percentage = gameService.getBoardCompletionPercentage(board);

      setIsWinner(hasWon);
      setCompletionPercentage(percentage);

      // Play win sound if won
      if (hasWon && !hasPlayedWinSound.current) {
        playWinSound();
        triggerConfettiRain();
        hasPlayedWinSound.current = true;
      }
    };

    checkGameStatus();
  }, [board, board.items, playWinSound]);

  const resetBoard = async () => {
    if (!board.id) return;
    await bingoService.resetBoard(board.id);
    setIsWinner(false);
    hasPlayedWinSound.current = false;
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
