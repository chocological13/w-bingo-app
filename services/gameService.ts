import { BingoBoard } from "@/constants/types";
import { bingoService } from "@/services/bingoService";

export const gameService = {
  checkBingoWin: (board: BingoBoard): boolean => {
    const items = board.items;
    const winningPatterns = generateWinningPattern();

    const markedIndices = items
      .map((item, index) => (item.marked ? index : -1))
      .filter((index) => index !== -1);

    // check winning pattern
    return winningPatterns.some((pattern) =>
      pattern.every((index) => markedIndices.includes(index))
    );
  },

  getBoardCompletionPercentage: (board: BingoBoard): number => {
    const markedItems = board.items.filter((item) => item.marked).length;
    const totalItems = board.items.length;
    return Math.round((markedItems / totalItems) * 100);
  },

  generateUniqueGameCode: (): string => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  },
};

// size here is the size of the board (5x5)
const generateWinningPattern = (size: number = 5): number[][] => {
  const patterns: number[][] = [];

  // Rows
  for (let i = 0; i < size; i++) {
    patterns.push(Array.from({ length: size }, (_, j) => i * size + j));
  }

  // Column
  for (let i = 0; i < size; i++) {
    patterns.push(Array.from({ length: size }, (_, j) => j * size + i));
  }

  // Diagonals
  patterns.push(Array.from({ length: size }, (_, i) => i * size + i));
  patterns.push(
    Array.from({ length: size }, (_, i) => i * size + (size - 1 - i))
  );

  return patterns;
};
