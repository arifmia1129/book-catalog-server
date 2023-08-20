import { Router } from "express";
import * as userController from "./user.controller";
import * as userValidation from "./user.validation";
import requestValidator from "../../middleware/requestValidator";
import auth from "../../middleware/auth";

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

userRouter.get("/profile", auth(), userController.userProfile);

export default userRouter;
