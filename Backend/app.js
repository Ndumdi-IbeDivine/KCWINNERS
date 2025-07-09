import express from 'express';
import cookieParser from 'cookie-parser';

import { PORT } from './config/env.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleWare from './middlewares/error.middleware.js';

import authRouter from './routes/auth.route.js'
import userRouter from './routes/user.route.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('Welcome to KCWINNERS CONTRIBUTION API')
})

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);

app.use(errorMiddleWare)

app.listen(PORT, async () => {
    await connectToDatabase()
    console.log(`KCWINNERS CONTRIBUTION API listening on http://localhost:${PORT}`);
});