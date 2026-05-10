import {z} from "zod";

export const createGigSchema = z.object({
  title: z.string().min(2),
  description: z.string(),
  price: z.coerce.number(),
  skillsRequired: z.array(z.string()),
  deadline: z.date().optional()
});