import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import emailRoutes from './routes/index';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/v1',emailRoutes);

// Health check route
app.get('/public/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'Email service is online' });
});

// 404 handler for unknown routes
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' });
});

export default app;