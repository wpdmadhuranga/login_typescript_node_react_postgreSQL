import jwt from 'jsonwebtoken';
import { config } from '../config';

export interface JWTPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

export class JWT {
  public static sign(payload: JWTPayload): string {
    return jwt.sign(
      { userId: payload.userId, email: payload.email }, 
      config.jwt.secret as string, 
      { expiresIn: config.jwt.expiresIn as string }
    );
  }

  public static verify(token: string): JWTPayload {
    return jwt.verify(token, config.jwt.secret as string) as JWTPayload;
  }

  public static decode(token: string): JWTPayload | null {
    return jwt.decode(token) as JWTPayload | null;
  }

  public static signRefresh(payload: JWTPayload): string {
    return jwt.sign(
      { userId: payload.userId, email: payload.email }, 
      config.jwt.secret as string, 
      { expiresIn: config.jwt.refreshExpiresIn as string }
    );
  }
}
