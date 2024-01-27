import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exception-filters/http-exception.filter';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  const PORT = 3000;
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(PORT);
  logger.log(`Application listening on port ${PORT}`);
}
bootstrap();
