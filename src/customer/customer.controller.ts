import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
  Param,
} from '@nestjs/common';

import { CustomerService } from './customer.service';
import { NewCustomerDto } from './dtos/new-customer.dto';
import { UserRequest } from '../shared/types/user-request.type';
import { AuthGuard } from '../auth/auth.guard';
import { NewManagementDto } from '../management/dtos/new-management.dto';

@Controller('customers')
@UseGuards(AuthGuard)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}
  @Get('')
  getAll() {
    return this.customerService.findAll();
  }

  @Get(':cc')
  getCustomerById(@Param('cc') cc: string) {
    return this.customerService.findByCC(cc);
  }

  @Post()
  createCustomer(
    @Body() customer: NewCustomerDto,
    @Request() req: UserRequest,
  ) {
    return this.customerService.createNewCustomer(customer, req.user.cc);
  }

  @Post(':cc/management')
  addManagement(@Param('cc') cc: string, @Body() management: NewManagementDto) {
    return this.customerService.addManagement(cc, management);
  }
}
