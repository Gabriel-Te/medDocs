import { metrics, Prisma } from "@prisma/client";

export interface IPrismaMetricsModel {
    create(data: Prisma.metricsCreateInput) : Promise<metrics | null>
    findAll() : Promise<metrics[] | null>
    findById(id: number) : Promise<metrics | null> 
    remove(id: number) : Promise<metrics>
    edit(id: number, data: Prisma.metricsCreateInput) : Promise<metrics>
}