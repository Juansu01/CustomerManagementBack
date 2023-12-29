import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../shared/entities/base.entity';
import { ContactType } from './enums/contact-type.enum';
import { CustomerStatus } from './enums/client-status.enum';
import { Customer } from '../customer/customer.entity';

@Entity()
export class Management extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ContactType })
  contactType: ContactType;

  @Column({
    type: 'enum',
    enum: CustomerStatus,
    nullable: true,
    default: CustomerStatus.PENDING_FIRST_CONTACT,
  })
  customerStatus: CustomerStatus;

  @Column({ nullable: true })
  observations: string;

  @Column({ type: 'date', nullable: true })
  nextContact: Date;

  @ManyToOne(() => Customer, (customer) => customer.managements, {
    nullable: true,
  })
  customer: Customer;
}
