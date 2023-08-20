import { HydratedDocument, Model } from "mongoose";

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publicDate: string;
  reviews?: string[];
  imageUrl: string;
};

export type IBookMethods = {
  fullName(): string;
};

export type BookModel = {
  createWithFullName(): Promise<HydratedDocument<IBook, IBookMethods>>;
  // name: string,
} & Model<IBook, object, IBookMethods>;
