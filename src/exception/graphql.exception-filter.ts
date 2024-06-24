import { Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { Request, Response } from 'express'; // Import Request and Response types

@Catch()
export class AllExceptionsFilter implements GqlExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>(); // Ensure correct response type

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const message = exception.message || 'Internal Server Error';
      response.status(status).json({
        statusCode: status,
        message,
        timestamp: new Date().toISOString(),
        path: ctx.getRequest<Request>().url,
      });
    } else {
      // Handle unexpected errors
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
        timestamp: new Date().toISOString(),
        path: ctx.getRequest<Request>().url,
      });
    }
  }
}
