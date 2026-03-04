import { exams, exams_metrics, Prisma } from "@prisma/client";

export interface IPrismaExamsModel {
    create(quantity: number , metricId : number) : Promise<any>
    findAll() : Promise<exams[] | null>
    findById(id: number) : Promise<exams | null> 
    remove(id: number) : Promise<exams>
    edit(id: number, data: Prisma.examsCreateInput) : Promise<exams>
    addMetric(id: number, metricId: number, quantity: number): Promise<exams_metrics | null>
}