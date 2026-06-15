import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application } from 'express';
import appRouter from './routes';
import { notFound } from './middlewares/notFound';
import { errorHandler } from './middlewares/errorHandler';
import { loggerMiddleware, errorLogger } from '../middleware/loggerMiddleware';

dotenv.config();

const app: Application = express();

app.use(express.json());

app.use(cors());

app.use(loggerMiddleware);

app.use(appRouter);

app.use(notFound);
app.use(errorLogger); // Add error logger before the general error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
