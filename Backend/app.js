import express from "express";
import { PORT } from "./config/env.js";

const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to KCWINNERS CONTRIBUTION API')
})

app.listen(PORT, () => {
    console.log(`KCWINNERS CONTRIBUTION API listening on http://localhost:${PORT}`);
})