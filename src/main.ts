import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { AppExceptionFilter } from './exception/app.exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './exception/graphql.exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const httpAdapter = app.get(HttpAdapterHost);
  // app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AppExceptionFilter(httpAdapter));
  app.enableCors({
    origin: 'http://localhost:3000', // Your Next.js application URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  // app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transform payload to DTO instance
      exceptionFactory: (errors) => {
        // Customize error response here if needed
        return new Error(errors.toString());
      },
    }),
  );
  await app.listen(8000);
}
bootstrap();
