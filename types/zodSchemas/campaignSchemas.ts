import * as z from "zod";

export const createCampaignSchema = z.object({
  id: z.number(),
  name: z
    .string({ required_error: "Name is required" })
    .min(1, { message: "Don't forget to give a name!" }),
});
