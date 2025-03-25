import { Timestamp } from "@firebase/firestore";

export type BingoItem = {
  id: string;
  text: string;
  marked: boolean;
};

export type BingoBoard = {
  id: string;
  title: string;
  size: number;
  items: BingoItem[];
  freeSpace: boolean;
  freeSpaceText: string;
  createdAt: Timestamp;
  lastPlayed?: Timestamp;
  wonAt?: Timestamp;
  userId: string;
};

export type WinPattern = {
  name: string;
  cells: number[];
};

export type GameState = {
  currentBoardId: string | null;
  boards: BingoBoard[];
  activeGame: boolean;
  loading: boolean;
  error: string | null;
};
