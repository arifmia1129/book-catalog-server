/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import * as userService from "./user.service";
import sendResponse from "../../../shared/sendResponse";
import { IUser, LoginResponse } from "./user.interface";
import config from "../../../config";
import httpStatus from "../../../shared/httpStatus";
import { Document } from "mongoose";
import { JwtPayload } from "jsonwebtoken";

export const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = (await userService.createUserService(req.body)) as IUser;

  if (result instanceof Document) {
    const { password, ...userWithoutPassword } = result.toObject();

    sendResponse<Omit<IUser, "password">>(res, {
      statusCode: 201,
      success: true,
      message: "Successfully created user",
      data: userWithoutPassword,
    });
  }
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

export const userProfile = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.user as JwtPayload;
  const result = await userService.userProfileService(email);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully retrieved user profile data",
    data: result,
  });
});
