// src/common/filters/graphql-exception.filter.ts

import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';

@Catch()
export class GraphqlExceptionFilter implements GqlExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const ctx = gqlHost.getContext();
    const response = ctx.res;
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    const errorResponse = {
      errors: [
        {
          message: exception.message || 'Internal server error',
          locations: exception.locations,
          path: exception.path,
        },
      ],
    };

    response.status(status).json(errorResponse);
  }
}
