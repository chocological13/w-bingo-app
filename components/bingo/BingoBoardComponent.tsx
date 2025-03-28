"use client";
import React from "react";
import { BingoBoard } from "@/constants/types";
import { useBingoGame } from "@/hooks/useBingoGame";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MdArrowBackIos } from "react-icons/md";
import BingoWin from "./BingoWin";

interface BingoBoardProps {
  board: BingoBoard;
  toggleItemAction: (boardId: string, itemId: string) => void;
  setSelectedBoardIdAction: (board: BingoBoard | null) => void;
  resetBoardAction: (boardId: string) => void;
  randomizedBoardAction: (boardId: string) => void;
}

export const BingoBoardComponent: React.FC<BingoBoardProps> = ({
  board,
  toggleItemAction,
  setSelectedBoardIdAction,
  resetBoardAction,
  randomizedBoardAction,
}) => {
  const { isWinner, completionPercentage } = useBingoGame(board);

  const handleItemClick = (itemId: string) => {
    if (!isWinner) {
      toggleItemAction(board.id, itemId);
    }
  };

  return (
    <motion.div
      className="relative"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.05 }}
    >
      {isWinner && <BingoWin />}

      <div className="mb-4 flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <div>
            <h2 className="text-2xl font-heading mb-1">{board.title}</h2>
            <p className="text-sm text-muted-foreground">
              {isWinner
                ? "BINGO!! You've won!! 🎉"
                : `Completion: ${completionPercentage}%`}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => setSelectedBoardIdAction(null)}
          >
            <MdArrowBackIos /> Back To List
          </Button>
        </div>
        <div className="flex md:flex-row flex-col space-x-2 space-y-2">
          <Button
            variant="outline"
            onClick={() => randomizedBoardAction(board.id)}
            disabled={isWinner}
            className="w-full md:w-fit md:text-md text-xs"
            size="sm"
          >
            Randomize
          </Button>
          <Button
            variant="destructive"
            onClick={() => resetBoardAction(board.id)}
            className="w-full md:w-fit md:text-md text-xs"
            size="sm"
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
          ${item.marked ? "bg-primary/50 text-primary-foreground" : "bg-secondary/20"}
          ${!item.marked && !isWinner && "hover:bg-secondary/40"}
          ${item.text === board.freeSpaceText ? "bg-primary/30 font-bold cursor-none" : ""}
        `}
              whileTap={{ scale: isWinner ? 1 : 0.95 }}
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
    </motion.div>
  );
};

export default BingoBoardComponent;
