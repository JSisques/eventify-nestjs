import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

/**
 * Guard that implements JWT authentication using Passport strategy
 * @class JwtAuthGuard
 * @extends {AuthGuard}
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
