import { Router } from "express";
import { ExamsController } from "../controllers/ExamsController";

const examsRouter = Router();

const examsController = new ExamsController();

examsRouter.post("/create", examsController.handle.bind(examsController));
examsRouter.get("/", examsController.getAll.bind(examsController));
examsRouter.get("/getByFilter", examsController.getWithFilter.bind(examsController));
examsRouter.get("/:id", examsController.getById.bind(examsController));
examsRouter.delete("/:id", examsController.remove.bind(examsController));
examsRouter.put("/:id", examsController.edit.bind(examsController));
examsRouter.post("/addMetric", examsController.addMetric.bind(examsController));

export default examsRouter;