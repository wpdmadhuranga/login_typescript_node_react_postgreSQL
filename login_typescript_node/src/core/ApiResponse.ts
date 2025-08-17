import { Response } from 'express';


// Success Response
export class SuccessResponse {
  constructor(
    public message: string,
    public data?: any,
    public statusCode: string = '10000'
  ) {}

  public send(res: Response): Response {
    return res.status(200).json({
      statusCode: this.statusCode,
      message: this.message,
      data: this.data
    });
  }
}

// Success Response with data
export class DataSuccessResponse extends SuccessResponse {
  constructor(message: string, data: any) {
    super(message, data);
  }
}

// Success Response without data
export class MessageSuccessResponse extends SuccessResponse {
  constructor(message: string) {
    super(message);
  }
}

// Created Response
export class CreatedResponse extends SuccessResponse {
  constructor(message: string, data?: any) {
    super(message, data, '10001');
  }

  public send(res: Response): Response {
    return res.status(201).json({
      statusCode: this.statusCode,
      message: this.message,
      data: this.data
    });
  }
}
