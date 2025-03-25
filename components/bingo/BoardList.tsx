import { BingoBoard } from "@/constants/types";
import React from "react";
import { motion } from "framer-motion";
import { Grid3X3, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { BiSolidTrash } from "react-icons/bi";

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
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-heading">My Bingo Boards</h1>
        <Button variant="outline" onClick={() => setShowCreateForm(true)}>
          <Plus className="mr-2 h-4 w-4" /> Create New Board
        </Button>
      </div>

      {boards.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <Grid3X3 className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              You don&apos;t have any bingo boards yet
            </p>
            <Button className="mt-4" onClick={() => setShowCreateForm(true)}>
              Create Your First Board
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {boards.map((board) => (
            <Card
              key={board.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedBoard(board.id)}
            >
              <CardHeader className="flex justify-between items-center">
                <CardTitle>{board.title}</CardTitle>
                <Button variant="ghost" onClick={() => deleteBoard(board.id)}>
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
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default BoardList;
