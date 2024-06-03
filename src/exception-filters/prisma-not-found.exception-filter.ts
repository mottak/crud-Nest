import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { Response } from "express";

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    const messageError = exception.meta?.cause ?? exception.message

    if (exception.code === 'P2025') {
      response.status(404).json({
        statusCode: 404,
        message: messageError,
      });
    //   message: exception.meta && exception.meta.cause ? exception.meta.cause : exception.message
    } else {
        response.status(500).json({
            statusCode: 500,
            message: messageError,
          })
    }
  }
}