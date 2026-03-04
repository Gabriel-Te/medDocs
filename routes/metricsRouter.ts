import { Router } from "express";
import { MetricsController } from "../controllers/MetricsController";

const metricsRouter = Router();

const metricsController = new MetricsController();

metricsRouter.post("/create", metricsController.handle.bind(metricsController));
metricsRouter.get("/", metricsController.getAll.bind(metricsController));
metricsRouter.get("/:id", metricsController.getById.bind(metricsController));
metricsRouter.delete("/:id", metricsController.remove.bind(metricsController));
metricsRouter.put("/:id", metricsController.edit.bind(metricsController));

export default metricsRouter;