import { Module } from '@nestjs/common';

import { ManagementService } from './management.service';

@Module({
  providers: [ManagementService],
})
export class ManagementModule {}
