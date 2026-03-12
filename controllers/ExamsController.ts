import { PrismaExamsModel } from '../models/PrismaExamsModel.ts'
import { Request, Response } from 'express';
import { IPrismaExamsModel } from "../models/interfaces/IPrismaExamsModel.ts"

export class ExamsController {

    public prismaExamsModel: IPrismaExamsModel = new (PrismaExamsModel);

    async handle(req: Request, res: Response) {
        try {
            const quantity: number = Number(req.body.quantity);
            const metricId: number = Number(req.body.metricId);
            const Exams = await this.prismaExamsModel.create(quantity, metricId);
            return res.status(201).json({
                message: "Sucesso ao criar o exame",
                Exams
            })
        } catch (error: any) {
            return res.status(500).json({
                message: "Erro ao criar o exame",
                exc: error.message
            })
        }
    } //certo

    async getAll(req: Request, res: Response) {
        try {
            const Exams = await this.prismaExamsModel.findAll();

            if (!Exams || Exams.length === 0) {
                return res.status(404).json({
                    message: "Nenhum exame encontrado"
                })
            }

            return res.status(200).json({
                message: "Sucesso ao encontrar os exames",
                Exams
            })
        } catch (error: any) {
            return res.status(500).json({
                message: "Erro ao encontrar os exames",
                exc: error.message
            })
        }
    }//certo

    async getById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const metric = await this.prismaExamsModel.findById(id);

            if (!metric) {
                return res.status(404).json({
                    message: "Exame não encontrado"
                })
            }
            return res.status(200).json({
                message: "Sucesso ao encontrar o exame",
                metric
            })
        } catch (error: any) {
            return res.status(500).json({
                message: "Erro ao encontrar o exame",
                exc: error.message
            })
        }
    }//certo

    async remove(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const deletedMetric = await this.prismaExamsModel.remove(id);
            return res.status(200).json({
                message: "Sucesso ao deletar o exame",
                deletedMetric
            })
        } catch (error: any) {
            return res.status(500).json({
                message: "Erro ao deletar o exame",
                exc: error.message
            })
        }
    }//certo

    async addMetric(req: Request, res: Response) {
        try {
            const { id, metricId, quantity } = req.body;

            const Exams = await this.prismaExamsModel.addMetric(Number(id), Number(metricId), Number(quantity));
            return res.status(201).json({
                message: "Sucesso ao criar a nova métrica do exame",
                Exams
            })
        } catch (error: any) {
            return res.status(500).json({
                message: "Erro ao criar a nova métrica do exame",
                exc: error.message
            })
        }
    } //certo

    async getWithFilter(req: Request, res: Response) {
        try {

            const { initialDate, finalDate, metricsName } = req.body

            const Exams = await this.prismaExamsModel.findByFilter(
                initialDate,
                finalDate,
                metricsName? metricsName.replace(/\s/g, '').split(",") : []
            );

            if (!Exams || Exams.length === 0) {
                return res.status(404).json({
                    message: "Nenhumo exame encontrada"
                })
            }

            return res.status(200).json({
                message: "Sucesso ao encontrar os exames",
                Exams
            })
        } catch (error: any) {
            return res.status(500).json({
                message: "Erro ao encontrar os exames",
                exc: error.message
            })
        }
    }//certo



    async edit(req: Request, res: Response) {
        try {

            const id = Number(req.params.id);
            const ExamsForm = req.body;
            console.log(ExamsForm)
            const EditedMetric = await this.prismaExamsModel.edit(id, ExamsForm);
            return res.status(201).json({
                message: "Sucesso ao editar o exame",
                EditedMetric
            })
        } catch (error: any) {
            return res.status(500).json({
                message: "Erro ao criar o exame",
                exc: error.message
            })
        }
    }
}  