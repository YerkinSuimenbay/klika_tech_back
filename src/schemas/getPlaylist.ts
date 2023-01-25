import { z } from "zod";

export const getPlaylistSchema = z.object({
  query: z.object({
    // limit: z.number({}),
    // offset: z.number({}),
  }),
});
