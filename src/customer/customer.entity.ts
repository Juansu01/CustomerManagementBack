import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { BaseEntity } from '../shared/entities/base.entity';
import { CustomerState } from './enums/customer-state.enum';
import { User } from '../user/user.entity';
import { Management } from '../management/management.entity';

@Entity()
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  identification: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  product: string;

  @Column({
    type: 'enum',
    enum: CustomerState,
    default: CustomerState.ACTIVE,
  })
  state: CustomerState;

  @Column()
  purchaseProjection: number;

  @ManyToOne(() => User, (user) => user.customers, { nullable: true })
  user: User;

  @OneToMany(() => Management, (management) => management.customer)
  managements: Management[];
}
