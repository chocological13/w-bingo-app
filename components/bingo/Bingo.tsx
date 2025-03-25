"use client";
import React, { useEffect, useState } from "react";
import CreateBoardForm from "@/components/bingo/CreateBoardForm";
import BingoBoardComponent from "@/components/bingo/BingoBoardComponent";
import { useBingoBoard } from "@/hooks/useBingoBoard";
import LoaderSpinner from "@/components/LoaderSpinner";
import BoardList from "@/components/bingo/BoardList";
import { BingoBoard } from "@/constants/types";
import { useBingoGame } from "@/hooks/useBingoGame";

const Bingo = () => {
  const {
    boards,
    fetchBoards,
    createNewBoard,
    deleteBoard,
    toggleItem,
    randomizeBoard,
    resetBoard,
    loading,
  } = useBingoBoard();
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);
  const [selectedBoard, setSelectedBoard] = useState<BingoBoard | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    if (boards && boards.length > 0) {
      const board = boards.find((b) => b.id === selectedBoardId);
      if (board) {
        setSelectedBoard(board);
      }
    }
  }, [selectedBoardId, boards]);

  const handleSelectBoard = (boardId: string) => {
    // Force state update even if selecting the same board
    // To make sure we can select the same board after going back to the list
    setSelectedBoardId(null); // Reset first
    setTimeout(() => setSelectedBoardId(boardId), 0); // Set new board after a brief delay
  };

  const handleCreateBoard = async (
    title: string,
    freeSpace: boolean,
    freeSpaceText: string,
    bulkItems?: string
  ) => {
    // Convert bulk items to array if provided
    const itemsArray = bulkItems
      ? bulkItems.split("\n").filter((item) => item.trim() !== "")
      : undefined;

    const newBoardId = await createNewBoard(
      title,
      5, // default 5x5 board
      freeSpace,
      freeSpaceText,
      itemsArray || []
    );

    if (newBoardId) {
      setSelectedBoardId(newBoardId);
      setShowCreateForm(false);
    }
  };

  if (loading) {
    return <LoaderSpinner />;
  }

  return (
    <div>
      {showCreateForm ? (
        <CreateBoardForm
          onSubmit={handleCreateBoard}
          setShowForm={setShowCreateForm}
          boardPresent={boards && boards.length > 0 ? true : false}
        />
      ) : selectedBoard ? (
        <BingoBoardComponent
          board={selectedBoard}
          toggleItemAction={toggleItem}
          setSelectedBoardIdAction={setSelectedBoard}
          resetBoardAction={resetBoard}
          randomizedBoardAction={randomizeBoard}
        />
      ) : (
        <BoardList
          boards={boards}
          setSelectedBoard={handleSelectBoard}
          setShowCreateForm={setShowCreateForm}
          deleteBoard={deleteBoard}
        />
      )}
    </div>
  );
};

export default Bingo;
