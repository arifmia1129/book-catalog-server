import ApiError from "../../../errors/ApiError";
import { IUser, LoginCredential, LoginResponse } from "./user.interface";
import User from "./user.model";
import httpStatus from "../../../shared/httpStatus";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import * as jwtHelper from "../../../helpers/jwtHelper";

export const createUserService = async (user: IUser): Promise<IUser | null> => {
  const res = await User.create(user);

  if (!res) {
    throw new ApiError("Failed to create user", httpStatus.BAD_REQUEST);
  }
  return res;
};

export const loginUserService = async (
  payload: LoginCredential,
): Promise<LoginResponse> => {
  const { email, password } = payload;

  const user = new User();

  const isUserExist = await user.isUserExist(email);

  if (!isUserExist) {
    throw new ApiError("User not found", httpStatus.NOT_FOUND);
  }

  if (!isUserExist?.password) {
    throw new ApiError("Invalid user information.", httpStatus.BAD_REQUEST);
  }

  const isPasswordMatched = await user.isPasswordMatched(
    password,
    isUserExist.password,
  );

  if (!isPasswordMatched) {
    throw new ApiError("Invalid ID or Password", httpStatus.FORBIDDEN);
  }

  const { email: userEmail } = isUserExist;

  const accessToken = jwtHelper.createToken(
    { email: userEmail },
    config.jwt.secret as Secret,
    config.jwt.secret_expires_in as string,
  );

  const refreshToken = jwtHelper.createToken(
    { email: userEmail },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_secret_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const userProfileService = async (email: string): Promise<IUser> => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError("User doesn't exist", httpStatus.NOT_FOUND);
  }

  return user;
};
