"use effect";
import React, { useState } from "react";
import { useBingoBoard } from "@/hooks/useBingoBoard";
import LoaderSpinner from "@/components/LoaderSpinner";
import CreateBoardForm from "@/components/bingo/CreateBoardForm";
import BoardList from "@/components/bingo/BoardList";
import { useRouter } from "next/navigation";

const Dashboard: React.FC = () => {
  const { boards, createNewBoard, deleteBoard, loading } = useBingoBoard();
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const router = useRouter();

  const handleSelectBoard = (boardId: string) => {
    // Force state update even if selecting the same board
    // To make sure we can select the same board after going back to the list
    setSelectedBoardId(null); // Reset first
    setTimeout(() => goToBoard(boardId), 0); // Set new board after a brief delay
  };

  const goToBoard = (boardId: string) => {
    setSelectedBoardId(boardId);
    if (selectedBoardId) {
      router.push(`game/${selectedBoardId}`);
    }
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
      handleSelectBoard(newBoardId);
      setShowCreateForm(false);
    }
  };

  if (loading || !boards) {
    return <LoaderSpinner />;
  }

  return (
    <div>
      {showCreateForm ? (
        <CreateBoardForm
          onSubmit={handleCreateBoard}
          loading={loading}
          setShowForm={setShowCreateForm}
          boardPresent={boards && boards.length > 0 ? true : false}
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

export default Dashboard;
