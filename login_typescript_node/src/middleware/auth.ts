import { Request, Response, NextFunction } from 'express';
import { JWT } from '../core/JWT';
import { AuthFailureError, BadTokenError, TokenExpiredError } from '../core/ApiError';
import { UserRepository } from '../database/repository/UserRepository';
import asyncHandler from '../helpers/asyncHandler';

// Extend Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
      userId?: string;
    }
  }
}

export const authenticate = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AuthFailureError('Access token is required');
  }

  const token = authHeader.substring(7); // Remove 'Bearer ' prefix

  try {
    const payload = JWT.verify(token);
    
    // Find user
    const user = await UserRepository.findById(parseInt(payload.userId));
    if (!user) {
      throw new AuthFailureError('User not found');
    }

    // Add user info to request
    req.user = user;
    req.userId = user.id.toString();
    
    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      throw new TokenExpiredError('Token has expired');
    } else if (error.name === 'JsonWebTokenError') {
      throw new BadTokenError('Invalid token');
    } else {
      throw error;
    }
  }
});

export default authenticate;
