import express from 'express'
import examsRouter from './routes/examsRouter.js';
import metricsRouter from './routes/metricsRouter.js';

const app = express();
app.use(express.json());
const PORT = 3000;

app.use("/exams", examsRouter)
app.use("/metrics", metricsRouter)



app.listen(PORT, () => console.log("Servidor Rodando na porta " + PORT))