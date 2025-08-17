import { Sequelize } from 'sequelize-typescript';
import { config } from '../config';
import Logger from '../core/Logger';
import path from 'path';

// Initialize Sequelize with PostgreSQL
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: config.database.host,
  port: config.database.port,
  database: config.database.name,
  username: config.database.user,
  password: config.database.password,
  models: [path.join(__dirname, 'models')], // Path to models directory
  logging: (msg) => Logger.debug(msg), // Use our logger for SQL queries
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Database connection function
const connectDB = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    Logger.info(`PostgreSQL Connected: ${config.database.host}:${config.database.port}`);
    
    // Sync database (create tables if they don't exist)
    await sequelize.sync({ alter: true });
    Logger.info('Database synchronized');
  } catch (error) {
    Logger.error('Database connection failed:', error);
    process.exit(1);
  }
};

// Handle connection events
process.on('SIGINT', async () => {
  Logger.info('Closing database connection...');
  await sequelize.close();
  process.exit(0);
});

export { sequelize };
export default connectDB;
