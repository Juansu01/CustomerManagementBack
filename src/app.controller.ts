import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';

import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/guards/admin.guard';

@Controller()
@UseGuards(AuthGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AdminGuard)
  getHello(): string {
    return this.appService.getHello();
  }
}
