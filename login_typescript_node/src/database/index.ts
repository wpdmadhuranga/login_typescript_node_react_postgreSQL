import mongoose from 'mongoose';
import { config } from '../config';
import Logger from '../core/Logger';

// Database connection
const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(config.database.uri);
    Logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    Logger.error('Database connection failed:', error);
    process.exit(1);
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  Logger.warn('MongoDB disconnected');
});

mongoose.connection.on('error', (error) => {
  Logger.error('MongoDB connection error:', error);
});

export default connectDB;
