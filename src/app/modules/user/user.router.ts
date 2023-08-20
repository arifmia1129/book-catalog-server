import { Router } from "express";
import * as userController from "./user.controller";
import * as userValidation from "./user.validation";
import requestValidator from "../../middleware/requestValidator";

const userRouter = Router();

userRouter.post(
  "/signup",
  requestValidator(userValidation.userRegisterValidation),
  userController.createUser,
);

userRouter.post(
  "/login",
  requestValidator(userValidation.userLoginValidation),
  userController.loginUser,
);

export default userRouter;
