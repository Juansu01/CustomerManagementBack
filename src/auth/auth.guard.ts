import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authToken = request.headers.authorization;

    if (!authToken)
      throw new HttpException('No Auth token found', HttpStatus.NOT_FOUND);

    if (authToken.split(' ')[0] !== 'Bearer')
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);

    const isValidUser = await this.authService.validateUser(
      authToken.split(' ')[1],
      request,
    );

    return isValidUser;
  }
}
