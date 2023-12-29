import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { AuthService } from '../auth.service';
import { UserRequest } from '../../shared/types/user-request.type';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authToken = request.headers.authorization;

    const isAdmin = this.authService.validateAdmin(authToken.split(' ')[1]);

    return isAdmin;
  }
}
