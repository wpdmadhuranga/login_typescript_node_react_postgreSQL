#!/bin/bash

echo "🚀 Setting up TypeScript Node.js Authentication API..."

# Copy environment file
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created .env file from template"
else
    echo "ℹ️  .env file already exists"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create logs directory
mkdir -p logs

echo "
🎉 Setup complete!

Next steps:
1. Edit .env file with your configuration
2. Start MongoDB: docker run -d -p 27017:27017 --name mongodb mongo:latest
3. Run the app: npm run dev

API will be available at: http://localhost:3000

Test endpoints:
- Health: GET http://localhost:3000/api/v1/health
- Signup: POST http://localhost:3000/api/v1/auth/signup
- Login: POST http://localhost:3000/api/v1/auth/login
- Profile: GET http://localhost:3000/api/v1/user/profile (requires auth)

Happy coding! 🚀
"
