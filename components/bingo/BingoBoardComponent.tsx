"use client";
import React from "react";
import { BingoBoard } from "@/constants/types";
import { useBingoGame } from "@/hooks/useBingoGame";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface BingoBoardProps {
  board: BingoBoard;
  toggleItemAction: (boardId: string, itemId: string) => void;
}

export const BingoBoardComponent: React.FC<BingoBoardProps> = ({
  board,
  toggleItemAction,
}) => {
  const { isWinner, completionPercentage, resetBoard, randomizeBoard } =
    useBingoGame(board);

  const handleItemClick = (itemId: string) => {
    if (!isWinner) {
      toggleItemAction(board.id, itemId);
    }
  };

  return (
    <div className="relative">
      {isWinner && (
        <div className="absolute inset-0 z-10 top-1/2 md:top-50 left-1/2 -translate-x-1/2 text-center">
          <h3 className="md:text-[150px] text-[75px] font-heading text-primary animate-bounce drop-shadow-[0_0_20px_#64748b]">
            BINGO! 🎉
          </h3>
        </div>
      )}

      <div className="mb-4 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-heading">{board.title}</h2>
          <p className="text-sm text-muted-foreground">
            Completion: {completionPercentage}%
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => randomizeBoard()}
            disabled={isWinner}
          >
            Randomize
          </Button>
          <Button
            variant="destructive"
            onClick={() => resetBoard()}
            disabled={isWinner}
          >
            Reset
          </Button>
        </div>
      </div>

      <div className="flex justify-center items-center overflow-auto">
        <div
          className="grid gap-2 bg-secondary/10 p-2 rounded-lg"
          style={{
            gridTemplateColumns: `repeat(${board.size}, minmax(0, 1fr))`,
          }}
        >
          {board.items.map((item) => (
            <motion.div
              key={item.id}
              className={`
          relative flex items-center justify-center 
          text-center p-2 rounded-md cursor-pointer 
          transition-all duration-300
          w-full h-full md:w-32 md:h-32
          overflow-x-auto
          text-xs md:text-md
          ${item.marked ? "bg-primary/50 text-primary-foreground" : "bg-secondary/20 hover:bg-secondary/40"}
          ${item.text === board.freeSpaceText ? "bg-primary/30 font-bold cursor-none" : ""}
        `}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleItemClick(item.id)}
            >
              <span className="block text-center break-words px-1 overflow-x-auto">
                {item.text}
              </span>
              {item.marked && (
                <div className="absolute inset-0 bg-primary/30 rounded-md animate-pulse border-2 border-primary/50" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BingoBoardComponent;
