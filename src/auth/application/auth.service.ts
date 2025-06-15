import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SignInWithEmailAndPasswordCommand } from './commands/sign-in-with-email-and-password.command';
import { SignUpWithEmailAndPasswordCommand } from './commands/sign-up-with-email-and-password.command';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async signInWithEmailAndPassword(
    signInWithEmailAndPasswordCommand: SignInWithEmailAndPasswordCommand,
  ) {
    this.logger.log(
      `Signing in user with email: ${signInWithEmailAndPasswordCommand.email}`,
    );
    return this.commandBus.execute(signInWithEmailAndPasswordCommand);
  }

  async signUpWithEmailAndPassword(
    signUpWithEmailAndPasswordCommand: SignUpWithEmailAndPasswordCommand,
  ) {
    this.logger.log(
      `Signing up user with email: ${signUpWithEmailAndPasswordCommand.email}`,
    );
    return this.commandBus.execute(signUpWithEmailAndPasswordCommand);
  }
}
