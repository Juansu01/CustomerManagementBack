import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { User } from '../user/user.entity';
import { Customer } from '../customer/customer.entity';
import { Product } from '../product/product.entity';
import { Quotation } from '../quotation/quotation.entity';
import { Management } from '../management/management.entity';

export async function createTypeormOptions(): Promise<TypeOrmModuleOptions> {
  const options: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    entities: [User, Customer, Product, Quotation, Management],
    namingStrategy: new SnakeNamingStrategy(),
  };
  return options;
}
