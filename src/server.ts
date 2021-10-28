import express from 'express'

const app = express()

app.get("/test", (req, res) => {
    // req -> entrada, pedido
    // res -> saida, resposta
    // ideal usar o return
    return res.send("Mamárias")
})

app.post("/test-post", (req, res) => {
    return res.send("Mamárias post")
})

app.listen(4000, () => console.log("server is running on PORT 4000"))