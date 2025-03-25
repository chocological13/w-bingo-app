"use client";
import React, { useEffect, useState } from "react";
import CreateBoardForm from "@/components/bingo/CreateBoardForm";
import { Timestamp } from "@firebase/firestore";
import BingoBoardComponent from "@/components/bingo/BingoBoardComponent";
import { useBingoBoard } from "@/hooks/useBingoBoard";
import LoaderSpinner from "@/components/LoaderSpinner";
import BoardList from "@/components/bingo/BoardList";
import { BingoBoard } from "@/constants/types";

const Bingo = () => {
  const { boards, createNewBoard, deleteBoard, toggleItem, loading } =
    useBingoBoard();
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
      <BoardList
        boards={boards}
        setSelectedBoard={setSelectedBoardId}
        setShowCreateForm={setShowCreateForm}
        deleteBoard={deleteBoard}
      />
      {selectedBoard && (
        <BingoBoardComponent
          board={selectedBoard}
          toggleItemAction={toggleItem}
        />
      )}
      <CreateBoardForm onSubmit={handleCreateBoard} />
    </div>
  );
};

export default Bingo;
