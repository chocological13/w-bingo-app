import { useAuth } from "@/context/auth-provider";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BingoBoard } from "@/constants/types";
import { bingoService } from "@/services/bingoService";
import { useSoundEffects } from "@/hooks/useSoundEffects";

export const useBingoBoard = () => {
  const { user } = useAuth();
  const [boards, setBoards] = useState<BingoBoard[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { playClickSound, playPopSound, playErrorSound, playGameStartSound } =
    useSoundEffects();

  useEffect(() => {
    if (user) {
      setLoading(true);
      try {
        fetchBoards();
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  }, [user]);

  const fetchBoards = async () => {
    if (!user) return;
    try {
      const userBoards = await bingoService.getUserBoards(user.uid);
      setBoards([...userBoards]);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("Error fetching boards: " + err.message);
      }
      toast.error(error);
    }
  };

  const createNewBoard = async (
    title: string,
    size: number = 5,
    freeSpace: boolean,
    freeSpaceText: string = "Free",
    items: string[]
  ) => {
    if (!user) return;
    setLoading(true);
    try {
      const boardId = await bingoService.createBoard(
        user.uid,
        size,
        title,
        freeSpace,
        freeSpaceText,
        items
      );
      await fetchBoards();
      toast.success("Board created successfully!");
      playGameStartSound();
      return boardId;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("Error creating board: " + err.message);
      }
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleItem = async (boardId: string, itemId: string) => {
    try {
      const result = await bingoService.toggleItemMarked(boardId, itemId);
      await fetchBoards();
      switch (result) {
        case "true":
          toast.success("Item marked!! 🎉");
          playClickSound();
          break;
        case "false":
          toast.info("Item unmarked 🥷🏻");
          playPopSound();
          break;
        case "free":
          toast.warning("Free space cannot be toggled!");
          playErrorSound();
          break;
        default:
          break;
      }
    } catch (err) {
      setError("Failed to update item");
      toast.error(error);
    }
  };

  const randomizeBoard = async (boardId: string) => {
    try {
      await bingoService.randomizeBoard(boardId);
      await fetchBoards();
      toast.success("Board randomized!");
    } catch (err) {
      setError("Failed to randomize board");
      toast.error(error);
    }
  };

  const resetBoard = async (boardId: string) => {
    try {
      await bingoService.resetBoard(boardId);
      await fetchBoards();
      toast.success("Board reset!");
    } catch (err) {
      setError("Failed to reset board");
      toast.error(error);
    }
  };

  const deleteBoard = async (boardId: string) => {
    setLoading(true);
    try {
      await bingoService.deleteBoard(boardId);

      // Remove board from state first to update UI instantly
      setBoards((prevBoards) =>
        prevBoards.filter((board) => board.id !== boardId)
      );

      await fetchBoards();

      toast.success("Board deleted successfully!!");
      playPopSound();
    } catch (err) {
      setError("Failed to delete board");
      toast.error(error);
    }
    setLoading(false);
  };

  return {
    boards,
    loading,
    error,
    createNewBoard,
    toggleItem,
    fetchBoards,
    randomizeBoard,
    resetBoard,
    deleteBoard,
  };
};
