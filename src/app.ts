import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morganMiddleware from '@configs/morgan';
import { routerV1 } from '@routes';
import ErrorHandler from '@errors/Handler';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type']
    })
);
app.use(morganMiddleware);
app.use('/v1', routerV1);

app.use(ErrorHandler);

export default app;
