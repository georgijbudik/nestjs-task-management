import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { Catch } from '@nestjs/common';
import { Response, Request } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errorDetails = exception.getResponse();

    response.status(status).json({
      errorDetails,
    });
  }
}
