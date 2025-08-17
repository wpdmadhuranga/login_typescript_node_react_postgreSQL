# 🚀 Quick Start Guide

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Docker)
- npm or yarn

## 1. Setup Environment

```bash
# Navigate to project directory
cd login_typescript_node

# Copy environment configuration
cp .env.example .env

# Install dependencies
npm install
```

## 2. Configure Environment

Edit `.env` file:

```env
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=27017
DB_NAME=auth_db
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
CORS_ORIGIN=*
```

## 3. Start MongoDB

### Option A: Using Docker (Recommended)

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### Option B: Local MongoDB

```bash
mongod
```

## 4. Run the Application

### Development Mode (with auto-reload)

```bash
npm run dev
```

### Production Mode

```bash
npm run build
npm start
```

## 5. Test the API

### Using the provided test script:

```bash
chmod +x test-api.sh
./test-api.sh
```

### Manual testing with curl:

**Signup:**

```bash
curl -X POST http://localhost:3000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Login:**

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Get Profile (replace YOUR_TOKEN):**

```bash
curl -X GET http://localhost:3000/api/v1/user/profile \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 6. Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm test             # Run tests
npm run watch        # Watch mode for development
```

## 🎯 What You've Built

✅ **Secure Authentication System**

- User registration and login
- Password hashing with bcrypt
- JWT token-based authentication

✅ **Professional Architecture**

- TypeScript for type safety
- Repository pattern for data access
- Centralized error handling
- Input validation with Joi

✅ **Production Ready Features**

- Environment configuration
- Logging with Winston
- CORS protection
- Request validation

✅ **API Endpoints**

- `POST /api/v1/auth/signup` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/user/profile` - Get user profile (protected)
- `PUT /api/v1/user/profile` - Update user profile (protected)
- `GET /api/v1/health` - Health check

## 🔧 Troubleshooting

**MongoDB Connection Issues:**

- Ensure MongoDB is running
- Check connection string in `.env`
- Verify port 27017 is available

**Port Already in Use:**

- Change PORT in `.env` file
- Kill process using the port: `lsof -ti:3000 | xargs kill -9`

**Module Not Found Errors:**

- Run `npm install` again
- Delete `node_modules` and `package-lock.json`, then `npm install`

Ready to build more features! 🎉
