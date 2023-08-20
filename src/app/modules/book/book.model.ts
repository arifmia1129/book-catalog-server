import { Schema, model } from "mongoose";
import { BookModel, IBook, IBookMethods } from "./book.interface";

const bookSchema = new Schema<IBook, BookModel, IBookMethods>(
  {
    user: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    publicDate: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    reviews: [
      {
        type: String,
      },
    ],
    imageUrl: {
      type: String,
      required: true,
      default:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1198&q=80",
    },
  },
  {
    timestamps: true,
  },
);

const Book = model<IBook, BookModel>("Book", bookSchema);

export default Book;
