import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { config } from './config';
import { ApiError, InternalError, NotFoundError } from './core/ApiError';
import Logger from './core/Logger';
import routes from './routes';

// Create Express app
const app: Application = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CORS configuration
app.use(cors({
  origin: config.cors.origin,
  credentials: true
}));

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  Logger.info(`${req.method} ${req.path} - IP: ${req.ip}`);
  next();
});

// API routes
app.use('/api/v1', routes);

// Catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(`Route ${req.originalUrl} not found`));
});

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
    if (err.type === 'INTERNAL') {
      Logger.error(
        `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
      );
    }
  } else {
    Logger.error(
      `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
    Logger.error(err);
    
    if (config.nodeEnv === 'development') {
      return res.status(500).json({
        statusCode: '10003',
        message: err.message,
        stack: err.stack
      });
    }
    
    ApiError.handle(new InternalError(), res);
  }
});

export default app;
