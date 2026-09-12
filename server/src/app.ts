import express from 'express';
import cors from 'cors';
import fetchRoutes from './routes/index.js';
import { errorMiddleware } from './middlewares/error.middleware.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(express.json());

app.use('/api', fetchRoutes);
app.use(errorMiddleware);

export default app;