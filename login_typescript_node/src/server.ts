import 'dotenv/config';
import app from './app';
import { config } from './config';
import connectDB from './database';
import Logger from './core/Logger';

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  Logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  Logger.error(err.name, err.message);
  process.exit(1);
});

// Connect to database
connectDB();

// Start server
const server = app.listen(config.port, () => {
  Logger.info(`🚀 Server running on port ${config.port} in ${config.nodeEnv} mode`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  Logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
  Logger.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  Logger.info('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    Logger.info('💥 Process terminated!');
  });
});
