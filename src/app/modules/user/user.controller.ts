import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import * as userService from "./user.service";
import sendResponse from "../../../shared/sendResponse";
import { IUser, LoginResponse } from "./user.interface";
import config from "../../../config";
import httpStatus from "../../../shared/httpStatus";

export const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createUserService(req.body);

  sendResponse<IUser>(res, {
    statusCode: 201,
    success: true,
    message: "Successfully created student",
    data: result,
  });
});

export const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.loginUserService(req.body);

  const { refreshToken, ...other } = result;

  // set refresh token to cookie
  const cookieOption = {
    secret: config.env === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOption);

  sendResponse<LoginResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Log in process done successfully",
    data: other,
  });
});
