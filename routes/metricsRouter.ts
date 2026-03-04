import { Router } from "express";
import { MetricsController } from "../controllers/MetricsController";

const metricsRouter = Router();

const metricsController = new MetricsController();

metricsRouter.post("/create", metricsController.handle.bind(metricsController))

export default metricsRouter;