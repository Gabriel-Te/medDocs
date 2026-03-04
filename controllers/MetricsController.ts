import { PrismaMetricsModel } from '../models/PrismaMetricsModel.ts'
import { Request, Response } from 'express';
import { IPrismaMetricsModel } from "../models/interfaces/IPrismaMetricsModel.ts"

export class MetricsController {

    public prismaMetricsModel: IPrismaMetricsModel = new (PrismaMetricsModel);

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

    async getAll(req: Request, res: Response) {
        try {
            const metrics = await this.prismaMetricsModel.findAll();

            if (!metrics || metrics.length === 0) {
                return res.status(404).json({
                    message: "Nenhuma métrica encontrada"
                })
            }

            return res.status(200).json({
                message: "Sucesso ao encontrar as métricas",
                metrics
            })
        } catch (error: any) {
            return res.status(500).json({
                message: "Erro ao encontrar as métricas",
                exc: error.message
            })
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const metric = await this.prismaMetricsModel.findById(id);

            if (!metric) {
                return res.status(404).json({
                    message: "Métrica não encontrada"
                })
            }
            return res.status(200).json({
                message: "Sucesso ao encontrar a métrica",
                metric
            })
        } catch (error: any) {
            return res.status(500).json({
                message: "Erro ao encontrar a métrica",
                exc: error.message
            })
        }
    }

    async remove(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const deletedMetric = await this.prismaMetricsModel.remove(id);
            return res.status(200).json({
                message: "Sucesso ao deletar a métrica",
                deletedMetric
            })
        } catch (error: any) {
            return res.status(500).json({
                message: "Erro ao deletar a métrica",
                exc: error.message
            })
        }
    }

    async edit(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const metricsForm = req.body;
            console.log(metricsForm)
            const EditedMetric = await this.prismaMetricsModel.edit(id, metricsForm);
            return res.status(201).json({
                message: "Sucesso ao editar a métrica",
                EditedMetric
            })
        } catch (error: any) {
            return res.status(500).json({
                message: "Erro ao criar a métrica",
                exc: error.message
            })
        }
    }
}