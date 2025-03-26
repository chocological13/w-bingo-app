import { BingoBoard } from "@/constants/types";
import React from "react";
import { motion } from "framer-motion";
import { Grid3X3, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { BiSolidTrash } from "react-icons/bi";
import { FcCheckmark } from "react-icons/fc";

interface BoardListProps {
  boards: BingoBoard[];
  setShowCreateForm: (show: boolean) => void;
  setSelectedBoard: (boardId: string) => void;
  deleteBoard: (boardId: string) => void;
}

const BoardList: React.FC<BoardListProps> = ({
  boards,
  setSelectedBoard,
  setShowCreateForm,
  deleteBoard,
}) => {
  const handleBoardSelect = (boardId: string, event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    const isDeleteButton = target.closest('button[aria-label="delete-board"]');

    if (!isDeleteButton) {
      setSelectedBoard(boardId);
    }
  };

  const handleDeleteBoard = (boardId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    deleteBoard(boardId);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-heading">My Bingo Boards</h1>
        <Button variant="outline" onClick={() => setShowCreateForm(true)}>
          <Plus className="mr-2 h-4 w-4" /> Create New Board
        </Button>
      </div>

      {boards.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <Grid3X3 className="h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground">
              You don&apos;t have any bingo boards yet
            </p>
            <Button className="mt-4" onClick={() => setShowCreateForm(true)}>
              Create Your First Board
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {boards.map((board, i) => (
            <motion.div
              key={i}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={(e) => handleBoardSelect(board.id, e)}
              >
                <CardHeader className="flex justify-between items-center">
                  <CardTitle className="flex flex-row gap-1 items-center">
                    {board.title}
                    {board.wonAt && (
                      <span className="ml-1 flex flex-row gap-1 text-green-500 border-green-100 border-1 text-xs rounded-full px-1">
                        <p>bingo</p>
                        <FcCheckmark />
                      </span>
                    )}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    onClick={(e) => handleDeleteBoard(board.id, e)}
                  >
                    <BiSolidTrash className="text-red-600" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between">
                    <span>
                      Size: {board.size}x{board.size}
                    </span>
                    <span>
                      {board.items.filter((item) => item.marked).length} /{" "}
                      {board.items.length} marked
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default BoardList;
