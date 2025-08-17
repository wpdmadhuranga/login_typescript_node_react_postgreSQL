# PostgreSQL Migration Guide

This guide explains how the project was migrated from MongoDB to PostgreSQL and how to set it up.

## Overview of Changes

### 1. Dependencies
- **Removed**: `mongoose` (MongoDB ODM)
- **Added**: 
  - `pg` - PostgreSQL client
  - `@types/pg` - TypeScript types for pg
  - `sequelize` - SQL ORM
  - `sequelize-typescript` - TypeScript decorators for Sequelize
  - `reflect-metadata` - Required for decorators

### 2. Database Configuration (`src/config.ts`)
- Changed default port from `27017` (MongoDB) to `5432` (PostgreSQL)
- Updated connection URI format from MongoDB to PostgreSQL
- Changed default user from empty to `postgres`

### 3. Database Connection (`src/database/index.ts`)
- Replaced Mongoose connection with Sequelize
- Added connection pooling configuration
- Added automatic table synchronization
- Enhanced logging with custom logger integration

### 4. User Model (`src/database/models/User.ts`)
- Converted from Mongoose Schema to Sequelize Model with TypeScript decorators
- Changed primary key from `_id` (ObjectId) to `id` (auto-increment integer)
- Updated field types and validations for PostgreSQL
- Maintained password hashing and comparison functionality

### 5. User Repository (`src/database/repository/UserRepository.ts`)
- Updated all methods to use Sequelize syntax
- Changed ID parameter types from `string | ObjectId` to `number`
- Updated query methods to use `where` clauses instead of MongoDB query objects
- Changed `skip` parameter to `offset` for pagination

### 6. Authentication Routes (`src/routes/auth/index.ts`)
- Updated to use `user.id` instead of `user._id`
- Maintained all existing functionality

### 7. Authentication Middleware (`src/middleware/auth.ts`)
- Updated to parse user ID as integer for PostgreSQL
- Updated user property access from `_id` to `id`

### 8. User Routes (`src/routes/user/index.ts`)
- Updated profile routes to use integer IDs
- Fixed import statement for auth middleware

## PostgreSQL Setup Instructions

### Prerequisites
1. **Install PostgreSQL**
   - Ubuntu/Debian: `sudo apt update && sudo apt install postgresql postgresql-contrib`
   - macOS: `brew install postgresql`
   - Windows: Download from [PostgreSQL official website](https://www.postgresql.org/download/windows/)

2. **Start PostgreSQL Service**
   - Linux: `sudo systemctl start postgresql`
   - macOS: `brew services start postgresql`
   - Windows: Service should start automatically

### Automatic Setup (Recommended)
Run the provided setup script:
```bash
./setup-postgres.sh
```

This script will:
- Check if PostgreSQL is installed and running
- Create a database named `auth_db`
- Create a user named `auth_user` with a secure password
- Grant necessary permissions

### Manual Setup
If you prefer to set up manually:

1. **Connect to PostgreSQL as superuser:**
   ```bash
   sudo -u postgres psql
   ```

2. **Create database and user:**
   ```sql
   -- Create database
   CREATE DATABASE auth_db;
   
   -- Create user
   CREATE USER auth_user WITH ENCRYPTED PASSWORD 'your_secure_password';
   
   -- Grant privileges
   GRANT ALL PRIVILEGES ON DATABASE auth_db TO auth_user;
   
   -- Connect to the database
   \c auth_db
   
   -- Grant schema privileges
   GRANT ALL ON SCHEMA public TO auth_user;
   GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO auth_user;
   GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO auth_user;
   ```

### Environment Configuration
1. **Copy environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Update `.env` with your PostgreSQL credentials:**
   ```env
   # PostgreSQL Database Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=auth_db
   DB_USER=auth_user
   DB_PASSWORD=your_secure_password
   ```

## Running the Application

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the project:**
   ```bash
   npm run build
   ```

3. **Start the application:**
   ```bash
   npm start
   ```

   For development:
   ```bash
   npm run dev
   ```

## Database Schema

The application will automatically create the following table structure:

### Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Key Differences from MongoDB

| Aspect | MongoDB | PostgreSQL |
|--------|---------|------------|
| Primary Key | `_id` (ObjectId) | `id` (Auto-increment) |
| Schema | Flexible/Dynamic | Fixed/Structured |
| Queries | MongoDB Query Language | SQL |
| Relationships | Manual references | Foreign Keys |
| Transactions | Limited support | Full ACID support |
| Data Types | BSON types | SQL data types |

## Testing

Tests should work without modification as they test the API endpoints, not the database directly. However, make sure to:

1. Set up a test database
2. Configure test environment variables
3. Run migrations before tests

## Troubleshooting

### Common Issues

1. **Connection refused**
   - Ensure PostgreSQL is running
   - Check host and port in `.env`
   - Verify user permissions

2. **Authentication failed**
   - Check username and password in `.env`
   - Verify user exists in PostgreSQL

3. **Table doesn't exist**
   - Ensure Sequelize sync is enabled
   - Check user permissions on schema

4. **Migration from existing MongoDB data**
   - Export data from MongoDB using `mongoexport`
   - Transform data format (change `_id` to `id`)
   - Import data using SQL INSERT statements

### Useful Commands

```bash
# Connect to database
psql -h localhost -p 5432 -U auth_user -d auth_db

# List all tables
\dt

# Describe users table
\d users

# View all users
SELECT * FROM users;

# Check database size
SELECT pg_size_pretty(pg_database_size('auth_db'));
```

## Benefits of PostgreSQL Migration

1. **Data Integrity**: ACID compliance and strong consistency
2. **Performance**: Better performance for complex queries
3. **Standards**: SQL standard compliance
4. **Ecosystem**: Rich ecosystem of tools and extensions
5. **Scalability**: Better horizontal and vertical scaling options
6. **Analytics**: Superior analytical capabilities with SQL
