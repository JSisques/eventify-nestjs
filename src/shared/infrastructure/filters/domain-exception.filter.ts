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

/**
 * Filter that catches and handles domain exceptions thrown by the application
 * Maps domain exceptions to appropriate HTTP status codes and formats error responses
 */
@Catch()
export class DomainExceptionFilter implements ExceptionFilter {
  /**
   * Map of domain exceptions to their corresponding HTTP status codes
   */
  private readonly exceptionMap = new Map<Function, HttpStatus>([
    [UserNotFoundException, HttpStatus.NOT_FOUND],
    [UserAlreadyExistsException, HttpStatus.CONFLICT],
    [InvalidEmailException, HttpStatus.BAD_REQUEST],
    [InvalidPasswordException, HttpStatus.BAD_REQUEST],
    [InvalidUserIdException, HttpStatus.BAD_REQUEST],
  ]);

  /**
   * Catches and handles exceptions by converting them to HTTP responses
   * @param exception - The caught exception
   * @param host - The arguments host providing access to the underlying platform-specific request/response
   */
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      this.exceptionMap.get(exception.constructor) || HttpStatus.BAD_REQUEST;
    const message = exception.message;

    response.status(status).json({
      statusCode: status,
      message: message,
      error: exception.name,
      timestamp: new Date().toISOString(),
    });
  }
}
