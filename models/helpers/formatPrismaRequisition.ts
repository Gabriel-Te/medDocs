export function formatPrismaRequisition(
    initialDate: Date,
    finalDate: Date,
    metricsName: string[]
) {
    const whereConditions: any = {};

    if (initialDate || finalDate) {
        whereConditions.date = {
            gte: initialDate ? new Date(`${initialDate}T00:00:00.000Z`) : undefined,
            lte: finalDate ? new Date(`${finalDate}T23:59:59.999Z`) : undefined
        };
    }

    // Filtro de Métricas (se o array não estiver vazio)
    if (metricsName && metricsName.length > 0) {
        whereConditions.exams_metrics = {
            some: {
                metrics: {
                    name: { in: metricsName }
                }
            }
        };
    }

    // 2. Montamos o objeto final garantindo a hierarquia correta
    const requisition = {
        where: whereConditions,
        include: {
            exams_metrics: {
                // Filtramos o include também para trazer apenas as métricas solicitadas
                where: metricsName.length > 0 ? {
                    metrics: {
                        name: { in: metricsName }
                    }
                } : {},
                select: {
                    metrics_id: true,
                    metrics: { 
                        select: { name: true } 
                    }
                }
            }
        }
    };

    return requisition;
}