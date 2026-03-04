import { PrismaMetricsModel } from '../models/PrismaMetricsModel.ts'
import { Request, Response } from 'express';
import { IPrismaMetricsModel } from "../models/interfaces/IPrismaMetricsModel.ts"

export class MetricsController {

    public prismaMetricsModel : IPrismaMetricsModel = new(PrismaMetricsModel);

    async handle(req: Request, res: Response) {
        try {
            const metricsForm = req.body;
            console.log(metricsForm)
            const metrics = await this.prismaMetricsModel.create(metricsForm);
            return res.status(201).json({
                message: "Sucesso ao criar a métrica",
                metrics
            })
        } catch (error: any) {
            return res.status(500).json({
                message: "Erro ao criar a métrica",
                exc: error.message
            })
        }
    }
}