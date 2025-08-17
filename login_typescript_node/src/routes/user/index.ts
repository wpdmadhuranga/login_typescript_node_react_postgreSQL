import express, { Request, Response } from 'express';
import { SuccessResponse } from '../../core/ApiResponse';
import asyncHandler from '../../helpers/asyncHandler';
import { authenticate } from '../../middleware/auth';
import { UserRepository } from '../../database/repository/UserRepository';

const router = express.Router();

// Get current user profile (protected route)
router.get(
  '/profile',
  authenticate,
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserRepository.findById(parseInt(req.userId!));
    
    return new SuccessResponse('Profile retrieved successfully', {
      user: {
        id: user?.id,
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
  asyncHandler(async (req: Request, res: Response) => {
    const { name } = req.body;
    
    const updatedUser = await UserRepository.updateById(parseInt(req.userId!), { name });
    
    return new SuccessResponse('Profile updated successfully', {
      user: {
        id: updatedUser?.id,
        name: updatedUser?.name,
        email: updatedUser?.email,
        updatedAt: updatedUser?.updatedAt
      }
    }).send(res);
  })
);

export default router;
