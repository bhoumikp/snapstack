import express from 'express';
import cors from 'cors';
import fetchRoutes from './routes/fetch.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', fetchRoutes);

export default app;