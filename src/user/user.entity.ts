import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { BaseEntity } from '../shared/entities/base.entity';
import { UserRole } from './enums/user-role.enum';
import { Customer } from '../customer/customer.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  identification: string;

  @Column({ select: false })
  password: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column()
  phone: string;

  @OneToMany(() => Customer, (customer) => customer.user)
  customers: Customer[];
}
