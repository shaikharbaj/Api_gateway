// src/common/filters/graphql-exceptions.filter.ts
import { Catch, ArgumentsHost, HttpStatus, HttpException } from '@nestjs/common';
import { GqlExceptionFilter, GqlArgumentsHost } from '@nestjs/graphql';

@Catch()
export class GraphqlExceptionFilter implements GqlExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const ctx = gqlHost.getContext();

    // Determine HTTP status code
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Extract error message
    const message =
      exception.message || exception.response.message || 'Internal server error';

    // Format error response for GraphQL
    return {
      statusCode: status,
      message,
      path: ctx.req.url,
    };
  }
}
