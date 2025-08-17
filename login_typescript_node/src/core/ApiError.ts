// API Error Types
export enum ErrorType {
  BAD_TOKEN = 'BAD_TOKEN',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  UNAUTHORIZED = 'UNAUTHORIZED',
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  INTERNAL = 'INTERNAL',
  NOT_FOUND = 'NOT_FOUND',
  BAD_REQUEST = 'BAD_REQUEST',
  FORBIDDEN = 'FORBIDDEN'
}

export abstract class ApiError extends Error {
  constructor(
    public type: ErrorType,
    public message: string = 'error',
    public statusCode: number = 500
  ) {
    super(type);
  }

  public static handle(err: ApiError, res: any): any {
    switch (err.type) {
      case ErrorType.BAD_TOKEN:
      case ErrorType.TOKEN_EXPIRED:
      case ErrorType.UNAUTHORIZED:
        return res.status(401).json({
          statusCode: '10001',
          message: err.message
        });
      case ErrorType.ACCESS_TOKEN:
        return res.status(401).json({
          statusCode: '10002',
          message: err.message
        });
      case ErrorType.INTERNAL:
        return res.status(500).json({
          statusCode: '10003',
          message: err.message
        });
      case ErrorType.NOT_FOUND:
        return res.status(404).json({
          statusCode: '10004',
          message: err.message
        });
      case ErrorType.BAD_REQUEST:
        return res.status(400).json({
          statusCode: '10005',
          message: err.message
        });
      case ErrorType.FORBIDDEN:
        return res.status(403).json({
          statusCode: '10006',
          message: err.message
        });
      default:
        return res.status(500).json({
          statusCode: '10007',
          message: 'Something went wrong'
        });
    }
  }
}

export class AuthFailureError extends ApiError {
  constructor(message = 'Authentication Failure') {
    super(ErrorType.UNAUTHORIZED, message, 401);
  }
}

export class InternalError extends ApiError {
  constructor(message = 'Internal error') {
    super(ErrorType.INTERNAL, message, 500);
  }
}

export class BadRequestError extends ApiError {
  constructor(message = 'Bad Request') {
    super(ErrorType.BAD_REQUEST, message, 400);
  }
}

export class NotFoundError extends ApiError {
  constructor(message = 'Not Found') {
    super(ErrorType.NOT_FOUND, message, 404);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = 'Permission denied') {
    super(ErrorType.FORBIDDEN, message, 403);
  }
}

export class BadTokenError extends ApiError {
  constructor(message = 'Token is not valid') {
    super(ErrorType.BAD_TOKEN, message, 401);
  }
}

export class TokenExpiredError extends ApiError {
  constructor(message = 'Token is expired') {
    super(ErrorType.TOKEN_EXPIRED, message, 401);
  }
}
