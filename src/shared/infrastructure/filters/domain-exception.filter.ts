import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { InvalidEmailException } from 'src/users/domain/exceptions/invalid-email.exception';
import { InvalidPasswordException } from 'src/users/domain/exceptions/invalid-password.exception';
import { InvalidUserIdException } from 'src/users/domain/exceptions/invalid-user-id.exception';
import { UserAlreadyExistsException } from 'src/users/domain/exceptions/user-already-exists.exception';
import { UserNotFoundException } from 'src/users/domain/exceptions/user-not-found.exception';

@Catch(
  UserAlreadyExistsException,
  UserNotFoundException,
  InvalidEmailException,
  InvalidPasswordException,
  InvalidUserIdException,
)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.BAD_REQUEST;
    let message = exception.message;

    if (exception instanceof UserNotFoundException) {
      status = HttpStatus.NOT_FOUND;
    } else if (exception instanceof UserAlreadyExistsException) {
      status = HttpStatus.CONFLICT;
    } else if (exception instanceof InvalidEmailException) {
      status = HttpStatus.BAD_REQUEST;
    } else if (exception instanceof InvalidPasswordException) {
      status = HttpStatus.BAD_REQUEST;
    } else if (exception instanceof InvalidUserIdException) {
      status = HttpStatus.BAD_REQUEST;
    }

    response.status(status).json({
      statusCode: status,
      message: message,
      error: exception.name,
      timestamp: new Date().toISOString(),
    });
  }
}
