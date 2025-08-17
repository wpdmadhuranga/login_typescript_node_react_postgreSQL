import express from 'express';
import { SuccessResponse } from '../../core/ApiResponse';
import asyncHandler from '../../helpers/asyncHandler';
import authenticate from '../../middleware/auth';
import { UserRepository } from '../../database/repository/UserRepository';

const router = express.Router();

// Get current user profile (protected route)
router.get(
  '/profile',
  authenticate,
  asyncHandler(async (req, res) => {
    const user = await UserRepository.findById(req.userId!);
    
    return new SuccessResponse('Profile retrieved successfully', {
      user: {
        id: user?._id,
        name: user?.name,
        email: user?.email,
        isActive: user?.isActive,
        createdAt: user?.createdAt,
        updatedAt: user?.updatedAt
      }
    }).send(res);
  })
);

// Update user profile (protected route)
router.put(
  '/profile',
  authenticate,
  asyncHandler(async (req, res) => {
    const { name } = req.body;
    
    const updatedUser = await UserRepository.updateById(req.userId!, { name });
    
    return new SuccessResponse('Profile updated successfully', {
      user: {
        id: updatedUser?._id,
        name: updatedUser?.name,
        email: updatedUser?.email,
        updatedAt: updatedUser?.updatedAt
      }
    }).send(res);
  })
);

export default router;
