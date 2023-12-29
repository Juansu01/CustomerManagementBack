import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from '../shared/entities/base.entity';
import { PaymentMethod } from './enums/payment-method.enum';

@Entity()
export class Quotation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float' })
  discount: number;

  @Column({ enum: PaymentMethod, type: 'enum', nullable: true })
  paymentMethod: string;

  @Column()
  product: string;

  @Column()
  quantity: number;

  @Column({ type: 'float' })
  totalPrice: number;
}
