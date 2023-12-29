import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

import { User } from '../user/user.entity';
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [AuthService, AuthGuard, AdminGuard],
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  exports: [AuthService, AuthGuard, AdminGuard],
})
export class AuthModule {}
