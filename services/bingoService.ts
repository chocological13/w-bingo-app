import { v4 as uuidv4 } from "uuid";
import {
  doc,
  collection,
  Timestamp,
  setDoc,
  getDocs,
  query,
  serverTimestamp,
  orderBy,
  getDoc,
  where,
  QueryDocumentSnapshot,
  DocumentData,
  updateDoc,
  deleteDoc,
} from "@firebase/firestore";
import { BingoBoard, BingoItem } from "@/constants/types";
import { auth, db } from "@/lib/firebase/config";

export const bingoService = {
  // Create new board
  createBoard: async (
    userId: string,
    size: number = 5,
    title: string = "New Bingo Board",
    freeSpace: boolean = true,
    freeSpaceText: string = "FREE",
    items?: string[]
  ): Promise<string> => {
    try {
      // Check if user is authenticated
      if (!auth.currentUser) {
        throw new Error("User must be authenticated to create a board!");
      }

      const newBoard = createEmptyBoard(
        userId,
        title,
        size,
        freeSpace,
        freeSpaceText
      );

      // If items were provided, assign them to the board
      if (items && items.length > 0) {
        const totalCells = size * size;
        const freeSpaceIndex =
          freeSpace && size % 2 === 1 ? Math.floor(totalCells / 2) : -1;

        // Add items to board
        let itemIndex = 0;
        for (let i = 0; i < totalCells; i++) {
          // skip the free space
          if (i === freeSpaceIndex) continue;

          // if we've run out of items, leave the rest empty
          if (itemIndex >= items.length) break;

          newBoard.items[i].text = items[itemIndex];
          itemIndex++;
        }
      }

      // Create a board reference to the new board document
      const boardRef = doc(collection(db, "boards"), newBoard.id);

      // Save the board data (without items)
      const boardData = {
        id: newBoard.id,
        title: newBoard.title,
        size: newBoard.size,
        freeSpace: newBoard.freeSpace,
        freeSpaceText: newBoard.freeSpaceText,
        createdAt: serverTimestamp(),
        userId: userId,
      };

      await setDoc(boardRef, boardData);

      // Save each board item as a separate document in a subcollection
      const itemsCollection = collection(db, "boards", newBoard.id, "items");

      // Create batch operation for better performance
      const promises = newBoard.items.map((item, index) => {
        const itemRef = doc(itemsCollection, item.id);
        return setDoc(itemRef, {
          ...item,
          position: index,
        });
      });

      await Promise.all(promises);

      return newBoard.id;
    } catch (error) {
      console.error("Error creating board: ", error);
      throw error;
    }
  },

  // Get all boards for a user
  getUserBoards: async (userId: string): Promise<BingoBoard[]> => {
    try {
      const boardsQuery = query(
        collection(db, "boards"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );

      const boardSnap = await getDocs(boardsQuery);

      const boardPromises = boardSnap.docs.map(async (boardDoc) => {
        return getBingoBoard(boardDoc);
      });

      return await Promise.all(boardPromises);
    } catch (error) {
      console.error("Error getting user boards: ", error);
      throw error;
    }
  },

  // Update board title
  updateBoardTitle: async (boardId: string, title: string) => {
    try {
      const boardRef = doc(db, "boards", boardId);
      await updateDoc(boardRef, { title });
    } catch (error) {
      console.error("Error updating board title: ", error);
      throw error;
    }
  },

  // Update board item text
  updateBoardItem: async (boardId: string, itemId: string, text: string) => {
    try {
      const itemRef = doc(db, "boards", boardId, "items", itemId);
      await updateDoc(itemRef, { text });
    } catch (error) {
      console.error("Error updating board item: ", error);
      throw error;
    }
  },

  // Toggle item state
  toggleItemMarked: async (
    boardId: string,
    itemId: string
  ): Promise<string> => {
    try {
      const itemRef = doc(db, "boards", boardId, "items", itemId);
      const itemSnap = await getDoc(itemRef);

      if (!itemSnap.exists()) {
        throw new Error("Item not found");
      }

      const boardData = await getBoardById(boardId);
      let size;
      let freeSpaceIndex;
      if (boardData) {
        size = boardData.size;
        freeSpaceIndex =
          boardData.freeSpace && size % 2 === 1
            ? Math.floor(Math.pow(size, 2) / 2)
            : -1;
      }

      if (itemSnap.data().position === freeSpaceIndex) {
        console.log("Free space cannot be toggled");
        return "free";
      }

      const currentMarked = itemSnap.data().marked;

      await updateDoc(itemRef, {
        marked: !currentMarked,
      });

      // Update last played
      const boardRef = doc(db, "boards", boardId);
      await updateDoc(boardRef, {
        lastPlayed: serverTimestamp(),
      });
      return currentMarked === false ? "true" : "false";
    } catch (error) {
      console.log("Error toggling item marked: ", error);
      throw error;
    }
  },

  // reset all marked items on a board (except free space)
  resetBoard: async (boardId: string) => {
    try {
      const board = await getBoardById(boardId);

      if (!board) {
        throw new Error("Board not found");
      }

      const freeSpaceIndex = board.freeSpace
        ? Math.floor(board.items.length / 2)
        : -1;

      // Update each item
      const itemsCollection = collection(db, "boards", boardId, "items");
      const itemsQuery = query(itemsCollection);
      const itemsSnap = await getDocs(itemsQuery);

      const updatePromises = itemsSnap.docs.map(async (itemDoc) => {
        const itemData = itemDoc.data();
        const position = itemData.position;

        const shouldBeMarked = position === freeSpaceIndex;

        if (itemData.marked !== shouldBeMarked) {
          await updateDoc(doc(itemsCollection, itemDoc.id), {
            marked: shouldBeMarked,
          });
        }
      });

      await Promise.all(updatePromises);
    } catch (error) {
      console.error("Error resetting board: ", error);
      throw error;
    }
  },

  // Delete a board
  deleteBoard: async (boardId: string) => {
    try {
      const itemsCollection = collection(db, "boards", boardId, "items");
      const itemsSnap = await getDocs(itemsCollection);

      const deleteItemPromises = itemsSnap.docs.map((itemDoc) =>
        deleteDoc(doc(itemsCollection, itemDoc.id))
      );

      await Promise.all(deleteItemPromises);

      // delete the board
      await deleteDoc(doc(db, "boards", boardId));
    } catch (error) {
      console.error("Error deleting board, ", error);
      throw error;
    }
  },

  // Randomize board items (for cases where user has a list of items but wants them in random positions)
  randomizeBoard: async (boardId: string): Promise<void> => {
    try {
      const board = await getBoardById(boardId);

      if (!board) {
        throw new Error("Board not found");
      }

      // Get all non-empty items
      let boardItems = [...board.items];

      // Preserve free space if it exists
      let freeSpaceItem = null;
      let freeSpaceIndex = -1;

      if (board.freeSpace) {
        freeSpaceIndex = Math.floor(boardItems.length / 2);
        freeSpaceItem = boardItems[freeSpaceIndex];
        boardItems = boardItems.filter((_, i) => i !== freeSpaceIndex);
      }

      // Shuffle the remaining items
      for (let i = boardItems.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [boardItems[i], boardItems[j]] = [boardItems[j], boardItems[i]];
      }

      // Reinsert the free space if needed
      if (freeSpaceIndex >= 0 && freeSpaceItem) {
        boardItems.splice(freeSpaceIndex, 0, freeSpaceItem);
      }

      // Update items in Firestore with new positions
      const itemsCollection = collection(db, "boards", boardId, "items");

      const updatePromises = boardItems.map((item, position) => {
        const itemRef = doc(itemsCollection, item.id);
        return updateDoc(itemRef, { position });
      });

      await Promise.all(updatePromises);
    } catch (error) {
      console.error("Error randomizing board:", error);
      throw error;
    }
  },
};

// helper to create new board
const createEmptyBoard = (
  userId: string,
  title: string = "New Bingo Card",
  size: number = 5,
  freeSpace: boolean = true,
  freeSpaceText: string = "FREE"
): BingoBoard => {
  const totalCells = size * size;
  const items: BingoItem[] = Array(totalCells)
    .fill(null)
    .map(() => ({
      id: uuidv4(),
      text: "",
      marked: false,
    }));

  // set center as free space for odd-sized boards
  if (freeSpace) {
    const centerIndex = Math.floor(totalCells / 2);
    items[centerIndex] = {
      id: uuidv4(),
      text: freeSpaceText,
      marked: true,
    };
  }

  return {
    id: uuidv4(),
    title,
    items,
    size,
    freeSpace,
    freeSpaceText,
    createdAt: Timestamp.now(),
    userId,
  };
};

// helper to get board by ID
// Get a board by ID with its items
export const getBoardById = async (
  boardId: string
): Promise<BingoBoard | null> => {
  try {
    // Get the board document
    const boardRef = doc(db, "boards", boardId);
    const boardSnap = await getDoc(boardRef);

    if (!boardSnap.exists()) {
      return null;
    }

    return getBingoBoard(boardSnap);
  } catch (error) {
    console.error("Error getting baord: ", error);
    throw error;
  }
};

// helper to get bingo board and items
const getBingoBoard = async (
  boardSnap: QueryDocumentSnapshot<DocumentData, DocumentData>
): Promise<BingoBoard> => {
  const boardData = boardSnap.data() as Omit<BingoBoard, "items">;

  // Get all items for this board
  const itemsQuery = query(
    collection(db, "boards", boardData.id, "items"),
    orderBy("position")
  );
  const itemsSnap = await getDocs(itemsQuery);

  const items: BingoItem[] = [];
  itemsSnap.forEach((doc) => {
    const itemData = doc.data() as BingoItem & { position: number };
    items[itemData.position] = {
      id: itemData.id,
      text: itemData.text,
      marked: itemData.marked,
    };
  });

  // Commbine board data with items
  return {
    ...boardData,
    items,
  } as BingoBoard;
};
