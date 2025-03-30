"use client";
import { AuthLevel, withAuth } from "@/components/auth/route-guard";
import BingoBoardComponent from "@/components/bingo/BingoBoardComponent";
import { useParams } from "next/navigation";
import LayoutWrapper from "@/components/layout/Layout";

const GamePage = () => {
  const params = useParams();
  const boardId = params.boardId as string;

  return (
    <>
      {boardId && (
        <LayoutWrapper>
          <BingoBoardComponent boardId={boardId} />
        </LayoutWrapper>
      )}
    </>
  );
};

export default withAuth(GamePage, AuthLevel.AUTHENTICATED);
