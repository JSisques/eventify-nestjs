import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SignInEvent } from '../../domain/events/sign-in.event';
import { Logger } from '@nestjs/common';

@EventsHandler(SignInEvent)
export class SignInEventHandler implements IEventHandler<SignInEvent> {
  private readonly logger = new Logger(SignInEventHandler.name);

  handle(event: SignInEvent) {
    this.logger.log(`SignInEvent: ${event.token}`);
  }
}
