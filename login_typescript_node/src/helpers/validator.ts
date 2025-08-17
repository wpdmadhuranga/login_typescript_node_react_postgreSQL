import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../core/ApiError';

export enum ValidationSource {
  BODY = 'body',
  HEADER = 'headers',
  QUERY = 'query',
  PARAM = 'params'
}

// Custom Joi validator for MongoDB ObjectId
export const JoiObjectId = () =>
  Joi.string().custom((value: string, helpers) => {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
      return helpers.error('any.invalid');
    }
    return value;
  }, 'Object Id Validation');

// Email validation
export const JoiEmail = () =>
  Joi.string().email().lowercase().trim();

// Password validation
export const JoiPassword = () =>
  Joi.string().min(6).max(128);

// Name validation
export const JoiName = () =>
  Joi.string().min(2).max(100).trim();

// Validation middleware
export default (
  schema: Joi.AnySchema,
  source: ValidationSource = ValidationSource.BODY
) => (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = schema.validate(req[source]);

    if (!error) return next();

    const { details } = error;
    const message = details
      .map((i) => i.message.replace(/['"]+/g, ''))
      .join(', ');

    next(new BadRequestError(message));
  } catch (error) {
    next(error);
  }
};
