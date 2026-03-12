import express from 'express'
import examsRouter from './routes/examsRouter.js';
import metricsRouter from './routes/metricsRouter.js';
import usersRouter from './routes/usersRouter.js';

const app = express();
app.use(express.json());
const PORT = 3000;

app.use("/exams", examsRouter)
app.use("/metrics", metricsRouter)
app.use("/users", usersRouter)


app.listen(PORT, () => console.log("Servidor Rodando na porta " + PORT))