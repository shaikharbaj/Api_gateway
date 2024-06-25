import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { TransformInterceptor } from './interceptor/transform.interceptor';
// import { AppExceptionFilter } from './exception/app.exception.filter';
import { ValidationPipe } from '@nestjs/common';
// import { GraphqlExceptionFilter } from './exception/graphql.exception-filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { AppExceptionFilter } from './exception/app.exception.filter';
import { RpcException } from '@nestjs/microservices';
// import { ValidationPipe } from '@nestjs/common';
// import { AllExceptionsFilter } from './exception/graphql.exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AppExceptionFilter(httpAdapter));
  app.enableCors({
    origin: 'http://localhost:3000', // Your Next.js application URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  // app.useGlobalPipes(new ValidationPipe())
  // app.useGlobalFilters(new GraphqlExceptionFilter());
  // app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Remove unknown parameter from payload
      forbidNonWhitelisted: false, //Display error if we have some unknown parameter in request payload
      transform: true,
      forbidUnknownValues: false,
      disableErrorMessages: false,
      validateCustomDecorators: true,
      exceptionFactory: (errors) => {
        return new RpcException({
          statusCode: 422,
          error: 'Unprocessable Entity',
          message: errors.reduce(
            (acc, e) => ({
              ...acc,
              [e.property]: Object.values(e.constraints),
            }),
            {},
          ),
        });
      },
    }),
  );
  await app.listen(8000);
}
bootstrap();
