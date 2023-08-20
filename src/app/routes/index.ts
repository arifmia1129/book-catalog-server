import { Router } from "express";
import userRouter from "../modules/user/user.router";
import bookRouter from "../modules/book/book.route";

const router = Router();

const moduleRoutes = [
  { path: "/user", route: userRouter },
  { path: "/book", route: bookRouter },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
