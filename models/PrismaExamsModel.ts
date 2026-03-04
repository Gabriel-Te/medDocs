import { Prisma, exams, exams_metrics } from "@prisma/client"
import { prisma } from "./infra/mysql.adapter"
import { IPrismaExamsModel } from "./interfaces/IPrismaExamsModel";

export class PrismaexamsModel implements IPrismaExamsModel {
    async create(quantity: number, metricId: number) {
        return await prisma.exams.create({
            data: {
                exams_metrics: {
                    create: {
                        metrics_id: metricId,
                        quantity: quantity,
                    }
                }
            }
        })
    }

    async findAll(): Promise<exams[] | null> {
        return await prisma.exams.findMany({
            include: {
                exams_metrics: {
                    select: {
                        metrics_id: true,
                        quantity: true
                    }
                }
            }
        });

    }

    async findById(id: number): Promise<any | null> { //mudar depois para melhor tipagem
        return await prisma.exams.findUnique({
            where: { id: id },
            select: {
                date: true,
                exams_metrics: {
                    where: { exams_id: id },
                    select: {
                        metrics_id: true,
                        quantity: true
                    }
                }
            }
        })
    }

    async addMetric(id: number, metricId: number, quantity: number): Promise<exams_metrics | null> { //mudar depois para melhor tipagem
        return await prisma.exams_metrics.create({
            data:  {
                exams_id: id,
                metrics_id: metricId,
                quantity: quantity
            }
        })
    }

    async remove(id: number): Promise<exams> {
        return await prisma.exams.delete({
            where: { id: id }
        })
    }

    async edit(id: number, data: Prisma.examsCreateInput): Promise<exams> {
        return await prisma.exams.update({
            where: { id: id },
            data: {
                date: data.date,
            }
        })
    }
}