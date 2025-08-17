# TypeScript Node.js Authentication API

A production-ready authentication API built with TypeScript, Express.js, MongoDB, and JWT tokens.

## 🚀 Features

- **User Registration & Login** - Secure signup and signin functionality
- **JWT Authentication** - Access and refresh token system
- **Password Hashing** - Bcrypt for secure password storage
- **Input Validation** - Joi schema validation
- **Error Handling** - Centralized error management
- **TypeScript** - Full type safety
- **MongoDB** - Document database with Mongoose ODM
- **Clean Architecture** - Repository pattern and separation of concerns
- **Logging** - Winston logger for debugging and monitoring

## 📁 Project Structure

```
src/
├── core/                   # Core utilities
│   ├── ApiError.ts        # Error handling classes
│   ├── ApiResponse.ts     # Response formatting
│   ├── JWT.ts             # JWT token management
│   └── Logger.ts          # Winston logger setup
├── database/              # Database layer
│   ├── models/            # Mongoose models
│   │   └── User.ts        # User model with bcrypt
│   ├── repository/        # Data access layer
│   │   └── UserRepository.ts
│   └── index.ts           # Database connection
├── helpers/               # Utility functions
│   ├── asyncHandler.ts    # Async wrapper
│   └── validator.ts       # Joi validation helpers
├── middleware/            # Express middleware
│   └── auth.ts            # JWT authentication
├── routes/                # API routes
│   ├── auth/              # Authentication routes
│   │   ├── index.ts       # Signup/Login endpoints
│   │   └── schema.ts      # Validation schemas
│   ├── user/              # User profile routes
│   │   └── index.ts       # Profile endpoints
│   └── index.ts           # Route aggregation
├── app.ts                 # Express app setup
├── config.ts              # Environment configuration
└── server.ts              # Server entry point
```

## 🛠️ Installation & Setup

1. **Clone and Install**

   ```bash
   cd login_typescript_node
   npm install
   ```

2. **Environment Setup**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start MongoDB**

   ```bash
   # Using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest

   # Or use local MongoDB installation
   mongod
   ```

4. **Run the Application**

   ```bash
   # Development mode
   npm run dev

   # Production build
   npm run build
   npm start
   ```

## 📡 API Endpoints

### Authentication

#### 1. User Signup

- **POST** `/api/v1/auth/signup`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": "10001",
    "message": "User created successfully",
    "data": {
      "user": {
        "id": "userId",
        "name": "John Doe",
        "email": "john@example.com",
        "createdAt": "2025-08-17T..."
      },
      "tokens": {
        "accessToken": "jwt_token...",
        "refreshToken": "refresh_token..."
      }
    }
  }
  ```

#### 2. User Login

- **POST** `/api/v1/auth/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:** Same as signup

### User Profile (Protected Routes)

#### 3. Get Profile

- **GET** `/api/v1/user/profile`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "statusCode": "10000",
    "message": "Profile retrieved successfully",
    "data": {
      "user": {
        "id": "userId",
        "name": "John Doe",
        "email": "john@example.com",
        "isActive": true,
        "createdAt": "2025-08-17T...",
        "updatedAt": "2025-08-17T..."
      }
    }
  }
  ```

#### 4. Update Profile

- **PUT** `/api/v1/user/profile`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "name": "Updated Name"
  }
  ```

### Health Check

- **GET** `/api/v1/health`
- **Response:**
  ```json
  {
    "status": "OK",
    "message": "Server is running",
    "timestamp": "2025-08-17T..."
  }
  ```

## 🔐 Security Features

- **Password Hashing** - Bcrypt with salt rounds
- **JWT Tokens** - Secure authentication
- **Input Validation** - Joi schema validation
- **Error Sanitization** - No sensitive data in error responses
- **CORS Protection** - Configurable origins
- **Request Logging** - All requests logged

## 🧪 Testing the API

### Using cURL

1. **Signup:**

   ```bash
   curl -X POST http://localhost:3000/api/v1/auth/signup \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test User",
       "email": "test@example.com",
       "password": "password123"
     }'
   ```

2. **Login:**

   ```bash
   curl -X POST http://localhost:3000/api/v1/auth/login \
     -H "Content-Type: application/json" \
     -d '{
       "email": "test@example.com",
       "password": "password123"
     }'
   ```

3. **Get Profile:**
   ```bash
   curl -X GET http://localhost:3000/api/v1/user/profile \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
   ```

## 🔧 Configuration

Edit `.env` file:

```env
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=27017
DB_NAME=auth_db
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d
CORS_ORIGIN=*
LOG_LEVEL=debug
```

## 📝 Scripts

```bash
npm run dev          # Development with auto-reload
npm run build        # Build TypeScript to JavaScript
npm start            # Start production server
npm run watch        # Watch mode for development
npm run clean        # Remove build directory
```

## 🏗️ Architecture Highlights

- **Repository Pattern** - Database operations abstracted
- **Error Handling** - Centralized error management
- **Validation** - Input validation with Joi
- **Middleware** - Authentication and request processing
- **Type Safety** - Full TypeScript implementation
- **Logging** - Structured logging with Winston
- **Environment Config** - Centralized configuration

This project demonstrates professional-grade Node.js API development with TypeScript! 🎉
