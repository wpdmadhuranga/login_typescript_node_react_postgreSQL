// Environment Configuration
export const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Database
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 27017,
    name: process.env.DB_NAME || 'auth_db',
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    get uri() {
      if (this.user && this.password) {
        return `mongodb://${this.user}:${this.password}@${this.host}:${this.port}/${this.name}`;
      }
      return `mongodb://${this.host}:${this.port}/${this.name}`;
    }
  },
  
  // JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'fallback-secret-change-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d'
  },
  
  // CORS
  cors: {
    origin: process.env.CORS_ORIGIN || '*'
  },
  
  // Logging
  logLevel: process.env.LOG_LEVEL || 'info'
};
