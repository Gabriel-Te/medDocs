import { Router } from "express"

const examsRouter = Router();

examsRouter.get("/", (req, res) => {
    res.send("estou no medDocs");
})

export default examsRouter;