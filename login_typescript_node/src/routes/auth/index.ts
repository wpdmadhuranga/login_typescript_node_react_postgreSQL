import express from 'express';
import { SuccessResponse, CreatedResponse } from '../../core/ApiResponse';
import { BadRequestError, AuthFailureError } from '../../core/ApiError';
import asyncHandler from '../../helpers/asyncHandler';
import validator from '../../helpers/validator';
import schema from './schema';
import { UserRepository } from '../../database/repository/UserRepository';
import { JWT } from '../../core/JWT';

const router = express.Router();

// Signup endpoint
router.post(
  '/signup',
  validator(schema.signup),
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await UserRepository.existsByEmail(email);
    if (existingUser) {
      throw new BadRequestError('User already exists with this email');
    }

    // Create user
    const user = await UserRepository.create({ name, email, password });

    // Generate JWT token
    const token = JWT.sign({
      userId: user._id.toString(),
      email: user.email
    });

    // Generate refresh token
    const refreshToken = JWT.signRefresh({
      userId: user._id.toString(),
      email: user.email
    });

    return new CreatedResponse('User created successfully', {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      },
      tokens: {
        accessToken: token,
        refreshToken: refreshToken
      }
    }).send(res);
  })
);

// Login endpoint
router.post(
  '/login',
  validator(schema.login),
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Find user with password
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new AuthFailureError('Invalid email or password');
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new AuthFailureError('Invalid email or password');
    }

    // Generate JWT token
    const token = JWT.sign({
      userId: user._id.toString(),
      email: user.email
    });

    // Generate refresh token
    const refreshToken = JWT.signRefresh({
      userId: user._id.toString(),
      email: user.email
    });

    return new SuccessResponse('Login successful', {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      },
      tokens: {
        accessToken: token,
        refreshToken: refreshToken
      }
    }).send(res);
  })
);

export default router;
