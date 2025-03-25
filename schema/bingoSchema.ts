import { z } from "zod";

export const bingoFormSchema = z
  .object({
    title: z
      .string()
      .min(1, "Title is required")
      .max(50, "Title must be less than 50 characters"),
    freeSpace: z.boolean().default(true),
    freeSpaceText: z
      .string()
      .max(10, "Free space text must be less than 10 characters")
      .optional(),
    bulkItems: z.string(),
  })
  .superRefine((data, ctx) => {
    // If bulk items are provided, validate
    if (data.bulkItems) {
      const items = data.bulkItems
        .split("\n")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);

      // check minimum number of items
      const boardSize = 5; // for a 5x5 board
      const totalCells = Math.pow(boardSize, 2);
      const requiredItems = data.freeSpace ? totalCells - 1 : totalCells;

      if (items.length < requiredItems) {
        ctx.addIssue({
          code: "custom",
          message: `You need at least ${requiredItems} unique items for a ${boardSize}x${boardSize} board`,
          path: ["bulkItems"],
        });
      }

      // Check for unique items
      const uniqueItems = new Set(items);
      if (uniqueItems.size !== items.length) {
        ctx.addIssue({
          code: "custom",
          message: "Bingo items must be unique",
          path: ["bulkItems"],
        });
      }
    }
  });

export type BingoFormSchemaType = z.infer<typeof bingoFormSchema>;
