import express from 'express'


const app = express();
const PORT = 3000;


app.get("/", (req, res) => {
    res.send("estou no medDocs")
})

app.listen(PORT, () => console.log("Servidor Rodando na porta " + PORT))