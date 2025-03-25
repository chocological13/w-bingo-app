import { useEffect, useState } from "react";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { gameService } from "@/services/gameService";
import { bingoService } from "@/services/bingoService";
import { BingoBoard } from "@/constants/types";
import { useConfetti } from "@/hooks/useConfetti";

export const useBingoGame = (board: BingoBoard | null) => {
  const [isWinner, setIsWinner] = useState(false);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const { playWinSound } = useSoundEffects();
  const { triggerConfettiRain } = useConfetti();

  useEffect(() => {
    // Check for win conditions and completion percentage

    if (!board) return;
    const checkGameStatus = async () => {
      const hasWon = gameService.checkBingoWin(board);
      const percentage = gameService.getBoardCompletionPercentage(board);

      setIsWinner(hasWon);
      setCompletionPercentage(percentage);

      // Play win sound, confetti, and change win status if won
      if (hasWon && !board.wonAt) {
        playWinSound();
        triggerConfettiRain();
        await bingoService.updateGameStatus(board.id);
      }
    };

    checkGameStatus();
  }, [board, playWinSound, triggerConfettiRain]);

  return {
    isWinner,
    completionPercentage,
  };
};
