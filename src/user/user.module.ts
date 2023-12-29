import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthModule } from '../auth/auth.module';
import { Customer } from '../customer/customer.entity';

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User, Customer]), AuthModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
