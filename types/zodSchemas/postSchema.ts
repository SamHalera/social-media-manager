import { z } from "zod";

export const postSchema = z.object({
  id: z.number(),
  name: z.string().min(1, { message: "Name for your post is required" }),
  caption: z.string().min(1, { message: "Caption for your post is required" }),
  // publicationDate: z.date().nullable(),
  imagesComment: z.string(),
  hashtag: z
    .string()
    .min(1, { message: "Hashtags for your post are required" }),
});
