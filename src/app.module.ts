import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { createTypeormOptions } from './db-config/db-config';
import { ManagementModule } from './management/management.module';
import { QuotationModule } from './quotation/quotation.module';
import { ProductModule } from './product/product.module';
import { AuthGuard } from './auth/auth.guard';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ManagementModule,
    QuotationModule,
    ProductModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => await createTypeormOptions(),
    }),
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthGuard],
})
export class AppModule {}
