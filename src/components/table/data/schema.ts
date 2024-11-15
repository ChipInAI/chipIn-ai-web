import { z } from 'zod';

export const homePageDataSchema = z.object({
  _id: z.string(),
  admin_id: z.string(),
  created_at: z.string(),
  participants: z.array(z.string()),
  receipt: z.array(z.array(z.string())),
  session_name: z.string(),
  session_positions: z.array(
    z.union([
      z.object({
        buyer: z.string(),
        item_name: z.string(),
        price: z.number(),
      }),
      z.undefined(),
    ]),
  ),
  status: z.string(),
  total: z.number(),
});

export type HomePageData = z.infer<typeof homePageDataSchema>;
