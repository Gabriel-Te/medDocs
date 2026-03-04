import { Prisma,metrics } from "@prisma/client"
import {prisma} from "./infra/mysql.adapter"
import { IPrismaMetricsModel } from "./interfaces/IPrismaMetricsModel"

export class PrismaMetricsModel implements IPrismaMetricsModel{
    async create(data: Prisma.metricsCreateInput) {
        return await prisma.metrics.create({
            data : {
                name: data.name,
                unit: data.unit
            }
        })
    }

    async findAll(): Promise<metrics[] | null> {
        return await prisma.metrics.findMany();
    }

    async findById(id: number): Promise<metrics | null> {
        return await prisma.metrics.findUnique({
            where: {id : id}
        })
    }

    async remove(id: number): Promise<metrics> {
        return await prisma.metrics.delete({
            where: {id : id}
        })
    }

    async edit(id: number, data: Prisma.metricsCreateInput): Promise<metrics> {
        return await prisma.metrics.update({
            where: {id: id},
            data : {
                name: data.name,
                unit: data.unit
            }
        })
    }
}