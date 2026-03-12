import { Router } from "express";
import { UsersController } from "../controllers/usersController";
import examsRouter from "./examsRouter";

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.post("/register", usersController.register.bind(usersController));
usersRouter.get("/login", usersController.login.bind(usersController));
usersRouter.post("/refresh", usersController.refresh.bind(usersController));


export default usersRouter;