import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QuotationService } from './quotation.service';
import { Quotation } from './quotation.entity';

@Module({
  providers: [QuotationService],
  imports: [TypeOrmModule.forFeature([Quotation])],
})
export class QuotationModule {}
