import express from 'express';
import cors from 'cors';
import { registerRoutes } from './config/routes';
import { errorHandler } from './middleware/error.middleware';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('API running');
});

app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    message: 'API running',
  });
});

registerRoutes(app);

// Global error handler (must be after routes)
app.use(errorHandler);

export default app;