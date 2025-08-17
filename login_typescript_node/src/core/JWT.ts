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
    return jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn
    });
  }

  public static verify(token: string): JWTPayload {
    return jwt.verify(token, config.jwt.secret) as JWTPayload;
  }

  public static decode(token: string): JWTPayload | null {
    return jwt.decode(token) as JWTPayload | null;
  }

  public static signRefresh(payload: JWTPayload): string {
    return jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.refreshExpiresIn
    });
  }
}
