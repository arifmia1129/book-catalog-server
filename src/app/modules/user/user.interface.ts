/* eslint-disable no-unused-vars */
import { HydratedDocument, Model } from "mongoose";

export type IUser = {
  name: string;
  email: string;
  password: string;
};

export type LoginCredential = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type RefreshToken = {
  accessToken: string;
};

export type ChangePassword = {
  oldPassword: string;
  newPassword: string;
};

export type IUserMethods = {
  isUserExist(email: string): Promise<IUser | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
};

export type UserModel = {
  createWithFullName(): Promise<HydratedDocument<IUser, IUserMethods>>;
  // name: string,
} & Model<IUser, object, IUserMethods>;
