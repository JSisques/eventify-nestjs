import { CommandHandler } from '@nestjs/cqrs';
import { SignInWithEmailAndPasswordCommand } from './sign-in-with-email-and-password.command';
import { AuthPort } from '../ports/auth.port';
import { Logger } from '@nestjs/common';

@CommandHandler(SignInWithEmailAndPasswordCommand)
export class SignInWithEmailAndPasswordCommandHandler {
  private readonly logger = new Logger(
    SignInWithEmailAndPasswordCommandHandler.name,
  );

  constructor(private readonly authPort: AuthPort) {}

  async execute(command: SignInWithEmailAndPasswordCommand) {
    this.logger.log(`Signing in user with email: ${command.email}`);

    return this.authPort.signInWithEmailAndPassword(
      command.email,
      command.password,
    );
  }
}
