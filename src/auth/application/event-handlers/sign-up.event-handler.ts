import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SignInEvent } from '../../domain/events/sign-in.event';
import { Logger } from '@nestjs/common';
import { SignUpEvent } from 'src/auth/domain/events/sign-up.event';

@EventsHandler(SignUpEvent)
export class SignUpEventHandler implements IEventHandler<SignUpEvent> {
  private readonly logger = new Logger(SignUpEventHandler.name);

  handle(event: SignUpEvent) {
    this.logger.log(`SignInEvent: ${event.token}`);
  }
}
