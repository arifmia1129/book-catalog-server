import { Router } from "express";
import * as bookValidation from "./book.validation";
import requestValidator from "../../middleware/requestValidator";
import * as bookController from "./book.controller";
import auth from "../../middleware/auth";

const bookRouter = Router();

bookRouter.post(
  "/create",
  requestValidator(bookValidation.addBookZodValidation),
  bookController.createBook,
);
bookRouter.get("/", bookController.getBook);
bookRouter
  .route("/:id/review")
  .post(bookController.addBookReviewById)
  .get(bookController.getBookReviewById);

bookRouter
  .route("/:id")
  .get(bookController.getBookById)
  .patch(
    requestValidator(bookValidation.updateBookZodValidation),
    auth(),
    bookController.updateBookById,
  )
  .delete(auth(), bookController.deleteBookById);

export default bookRouter;
