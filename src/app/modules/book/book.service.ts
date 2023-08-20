import { SortOrder } from "mongoose";
import ApiError from "../../../errors/ApiError";
import { paginationHelper } from "../../../helpers/paginationHelper";
import {
  Filter,
  Pagination,
  ResponseWithPagination,
} from "../../../interfaces/databaseQuery.interface";
import httpStatus from "../../../shared/httpStatus";
import { IBook } from "./book.interface";
import Book from "./book.model";
import { bookSearchableField } from "./book.constant";

export const createBookService = async (book: IBook): Promise<IBook | null> => {
  const res = await Book.create(book);

  if (!res) {
    throw new ApiError("Failed to add book", httpStatus.BAD_REQUEST);
  }

  return res;
};

export const getBookService = async (
  filters: Filter,
  paginationOptions: Pagination,
): Promise<ResponseWithPagination<IBook[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: bookSearchableField.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereConditions = andCondition.length ? { $and: andCondition } : {};

  const res = await Book.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Book.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: res,
  };
};

export const getBookByIdService = async (id: string): Promise<IBook | null> => {
  const res = await Book.findById(id);
  return res;
};

export const updateBookByIdService = async (
  id: string,
  payload: Partial<IBook>,
  userEmail: string,
): Promise<IBook | null> => {
  const isBookExist = await Book.findById(id);

  if (!isBookExist) {
    throw new ApiError("Book doesn't exist", httpStatus.NOT_FOUND);
  }

  if (isBookExist.user !== userEmail) {
    throw new ApiError(
      "Only can update book info that you added",
      httpStatus.FORBIDDEN,
    );
  }

  const res = await Book.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return res;
};

export const deleteBookByIdService = async (
  id: string,
  userEmail: string,
): Promise<IBook | null> => {
  const isBookExist = await Book.findById(id);

  if (!isBookExist) {
    throw new ApiError("Book doesn't exist", httpStatus.NOT_FOUND);
  }

  if (isBookExist.user !== userEmail) {
    throw new ApiError(
      "Only can delete book info that you added",
      httpStatus.FORBIDDEN,
    );
  }

  const res = await Book.findByIdAndDelete(id);
  return res;
};
