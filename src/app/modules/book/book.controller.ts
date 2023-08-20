import { Request, Response } from "express";
import * as bookService from "./book.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import {
  Pagination,
  Filter,
} from "../../../interfaces/databaseQuery.interface";
import pick from "../../../shared/pick";
import { paginationField } from "../../constant/pagination";
import { IBook } from "./book.interface";
import { bookFilterableField } from "./book.constant";
import { JwtPayload } from "jsonwebtoken";

export const createBook = catchAsync(async (req: Request, res: Response) => {
  const result: IBook | null = await bookService.createBookService(req.body);

  sendResponse<IBook>(res, {
    statusCode: 201,
    success: true,
    message: "Successfully added book",
    data: result,
  });
});

export const getBook = catchAsync(async (req: Request, res: Response) => {
  const filterData: Filter = pick(req.query, bookFilterableField);
  const paginationOptions: Pagination = pick(req.query, paginationField);

  const result = await bookService.getBookService(
    filterData,
    paginationOptions,
  );

  sendResponse<IBook[]>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved books information",
    meta: result.meta,
    data: result.data,
  });
});

export const getBookById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await bookService.getBookByIdService(id);
  sendResponse<IBook>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved book information",
    data: result,
  });
});

export const updateBookById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { email } = req.user as JwtPayload;
    const result = await bookService.updateBookByIdService(id, req.body, email);
    sendResponse<IBook>(res, {
      statusCode: 200,
      success: true,
      message: "Successfully updated book information",
      data: result,
    });
  },
);

export const addBookReviewById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { comment } = req.body;
    const result = await bookService.addBookReviewByIdService(id, comment);
    sendResponse<string>(res, {
      statusCode: 200,
      success: true,
      message: "Successfully add book review information",
      data: result,
    });
  },
);

export const getBookReviewById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await bookService.getBookReviewByIdService(id);
    sendResponse<string[]>(res, {
      statusCode: 200,
      success: true,
      message: "Successfully get book review information",
      data: result,
    });
  },
);

export const deleteBookById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { email } = req.user as JwtPayload;
    const result = await bookService.deleteBookByIdService(id, email);
    sendResponse<IBook>(res, {
      statusCode: 200,
      success: true,
      message: "Successfully deleted book",
      data: result,
    });
  },
);
