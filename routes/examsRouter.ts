import { Router } from "express";
import { examsController } from "../controllers/examsController";

const examsRouter = Router();

const examsController = new examsController();

examsRouter.post("/create", examsController.handle.bind(examsController));
examsRouter.get("/", examsController.getAll.bind(examsController));
examsRouter.get("/:id", examsController.getById.bind(examsController));
examsRouter.delete("/:id", examsController.remove.bind(examsController));
examsRouter.put("/:id", examsController.edit.bind(examsController));

export default examsRouter;