#!/bin/bash

# API Testing Script for TypeScript Node.js Authentication API
# Make sure the server is running on http://localhost:3000

BASE_URL="http://localhost:3000/api/v1"

echo "🧪 Testing TypeScript Node.js Authentication API"
echo "=================================================="

# Test 1: Health Check
echo "1️⃣  Testing Health Check..."
curl -X GET "$BASE_URL/health" \
  -H "Content-Type: application/json" \
  -w "\nStatus: %{http_code}\n\n"

# Test 2: User Signup
echo "2️⃣  Testing User Signup..."
SIGNUP_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/signup" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123"
  }' \
  -w "\nStatus: %{http_code}")

echo "$SIGNUP_RESPONSE"
echo ""

# Extract token from signup response (basic parsing)
TOKEN=$(echo "$SIGNUP_RESPONSE" | grep -o '"accessToken":"[^"]*"' | cut -d'"' -f4)

# Test 3: User Login
echo "3️⃣  Testing User Login..."
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "password123"
  }' \
  -w "\nStatus: %{http_code}")

echo "$LOGIN_RESPONSE"
echo ""

# Extract token from login response if signup failed
if [ -z "$TOKEN" ]; then
  TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"accessToken":"[^"]*"' | cut -d'"' -f4)
fi

# Test 4: Get User Profile (Protected Route)
if [ ! -z "$TOKEN" ]; then
  echo "4️⃣  Testing Get User Profile (Protected)..."
  curl -X GET "$BASE_URL/user/profile" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -w "\nStatus: %{http_code}\n\n"
    
  # Test 5: Update User Profile
  echo "5️⃣  Testing Update User Profile..."
  curl -X PUT "$BASE_URL/user/profile" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d '{
      "name": "John Doe Updated"
    }' \
    -w "\nStatus: %{http_code}\n\n"
else
  echo "❌ No token available, skipping protected route tests"
fi

# Test 6: Error Cases
echo "6️⃣  Testing Error Cases..."

echo "Invalid signup (missing fields):"
curl -X POST "$BASE_URL/auth/signup" \
  -H "Content-Type: application/json" \
  -d '{}' \
  -w "\nStatus: %{http_code}\n\n"

echo "Invalid login:"
curl -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "wrong@example.com",
    "password": "wrongpassword"
  }' \
  -w "\nStatus: %{http_code}\n\n"

echo "Unauthorized access:"
curl -X GET "$BASE_URL/user/profile" \
  -H "Content-Type: application/json" \
  -w "\nStatus: %{http_code}\n\n"

echo "✅ API Testing Complete!"
echo ""
echo "Expected Results:"
echo "- Health check: 200 OK"
echo "- Signup: 201 Created (or 400 if user exists)"
echo "- Login: 200 OK"
echo "- Get Profile: 200 OK"
echo "- Update Profile: 200 OK"
echo "- Error cases: 400/401/404 as appropriate"
