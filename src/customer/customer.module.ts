import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Customer } from './customer.entity';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { Management } from '../management/management.entity';

@Module({
  controllers: [CustomerController],
  imports: [
    TypeOrmModule.forFeature([Customer, Management]),
    UserModule,
    AuthModule,
  ],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}
