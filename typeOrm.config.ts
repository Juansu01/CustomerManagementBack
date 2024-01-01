import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { Customer } from './src/customer/customer.entity';
import { Management } from './src/management/management.entity';
import { Product } from './src/product/product.entity';
import { Quotation } from './src/quotation/quotation.entity';
import { User } from './src/user/user.entity';

config();
const dataSourceOptions = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Customer, Product, Quotation, Management],
  migrations: ['migrations/**'],
  migrationsTableName: 'migrations_typeorm',
});

export default dataSourceOptions;
