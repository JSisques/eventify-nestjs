import { CommandHandler } from '@nestjs/cqrs';
import { AuthPort } from '../ports/auth.port';
import { Logger } from '@nestjs/common';
import { SignUpWithEmailAndPasswordCommand } from './sign-up-with-email-and-password.command';

@CommandHandler(SignUpWithEmailAndPasswordCommand)
export class SignUpWithEmailAndPasswordCommandHandler {
  private readonly logger = new Logger(
    SignUpWithEmailAndPasswordCommandHandler.name,
  );

  constructor(private readonly authPort: AuthPort) {}

  async execute(command: SignUpWithEmailAndPasswordCommand) {
    this.logger.log(`Signing up user with email: ${command.email}`);

    return this.authPort.signUpWithEmailAndPassword(
      command.email,
      command.password,
    );
  }
}
