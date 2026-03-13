import { Router } from "express";
import { ExamsController } from "../controllers/ExamsController";
import { AuthMiddleware } from "../controllers/middlewares/authMiddleware";

const examsRouter = Router();

const examsController = new ExamsController();
const authMiddleware = new AuthMiddleware();

examsRouter.use(authMiddleware.execute.bind(authMiddleware));

examsRouter.get("/getByFilter", examsController.getWithFilter.bind(examsController));
examsRouter.post("/create", examsController.handle.bind(examsController));
examsRouter.get("/", examsController.getAll.bind(examsController));
examsRouter.get("/:id", examsController.getById.bind(examsController));
examsRouter.delete("/:id", examsController.remove.bind(examsController));
examsRouter.put("/:id", examsController.edit.bind(examsController));
examsRouter.post("/addMetric", examsController.addMetric.bind(examsController));

export default examsRouter;