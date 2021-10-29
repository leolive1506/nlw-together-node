import "reflect-metadata"
import express from 'express'
import { router } from "./routes"

import "./database"

const app = express()

// habilitar trabalhar com json
app.use(express.json())

app.use(router)

app.listen(4000, () => console.log("server is running on PORT 4000"))