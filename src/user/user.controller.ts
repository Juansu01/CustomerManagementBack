import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  Request,
} from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserRequest } from '../shared/types/user-request.type';

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AdminGuard)
  async getAll() {
    return this.userService.getAll();
  }

  @Post()
  @UseGuards(AdminGuard)
  async create(@Body() user: CreateUserDto) {
    return this.userService.createNewUser(user);
  }

  @Get('agenda')
  getAgenda(@Request() req: UserRequest) {
    return this.userService.getAgenda(req.user.cc);
  }

  @Get('my-customers')
  getMyCustomers(@Request() req: UserRequest) {
    return this.userService.getMyCustomers(req.user.cc);
  }
}
