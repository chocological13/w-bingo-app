import { z } from "zod";

export const bingoFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(50, "Title must be less than 50 characters"),
  freeSpace: z.boolean().default(true),
  freeSpaceText: z
    .string()
    .max(10, "Free space text must be less than 10 characters")
    .optional(),
  bulkItems: z.string().optional(),
});

export type BingoFormSchemaType = z.infer<typeof bingoFormSchema>;
