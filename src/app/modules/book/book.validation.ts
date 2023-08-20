import { z } from "zod";

export const addBookZodValidation = z.object({
  body: z.object({
    user: z.string({
      required_error: "Provided a user email",
    }),
    title: z.string({
      required_error: "The book title must be provide",
    }),
    author: z.string({
      required_error: "Author name of book is required",
    }),
    genre: z.string({
      required_error: "Genre is required",
    }),
    publicDate: z.string({
      required_error: "Public date is required",
    }),
    imageUrl: z.string().optional(),
  }),
});
export const updateBookZodValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    genre: z.string().optional(),
    publicDate: z.string().optional(),
    imageUrl: z.string().optional(),
  }),
});
