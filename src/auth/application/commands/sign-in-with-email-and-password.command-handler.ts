import { CommandHandler, EventBus } from '@nestjs/cqrs';
import { SignInWithEmailAndPasswordCommand } from './sign-in-with-email-and-password.command';
import { AuthPort } from '../ports/auth.port';
import { Logger } from '@nestjs/common';
import { SignInEvent } from 'src/auth/domain/events/sign-in.event';

@CommandHandler(SignInWithEmailAndPasswordCommand)
export class SignInWithEmailAndPasswordCommandHandler {
  private readonly logger = new Logger(
    SignInWithEmailAndPasswordCommandHandler.name,
  );

  constructor(
    private readonly authPort: AuthPort,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: SignInWithEmailAndPasswordCommand) {
    this.logger.log(`Signing in user with email: ${command.email}`);

    const token = await this.authPort.signInWithEmailAndPassword(
      command.email,
      command.password,
    );

    this.eventBus.publish(new SignInEvent(token));

    return token;
  }
}
