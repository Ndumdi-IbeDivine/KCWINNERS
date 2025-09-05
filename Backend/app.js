import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'

import { PORT } from './config/env.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleWare from './middlewares/error.middleware.js';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';

import authRouter from './routes/auth.route.js'
import userRouter from './routes/user.route.js'
import walletRouter from './routes/wallet.route.js'
import contributionRouter from './routes/contribution.route.js'
import adminRouter from './routes/admin.route.js'

import './cron/weeklyEngine.js';
import './cron/clearanceEngine.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(arcjetMiddleware)
app.use(cors({
    origin: '*',
    methods: '*',
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.get('/', (req, res) => {
    res.send('Welcome to KCWINNERS CONTRIBUTION API')
})

app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/wallet', walletRouter);
app.use('/api/v1/contributions', contributionRouter)

app.use(errorMiddleWare)

app.listen(PORT, async () => {
    await connectToDatabase()
    console.log(`KCWINNERS CONTRIBUTION API listening on http://localhost:${PORT}`);
});

//cron starts after DB connects