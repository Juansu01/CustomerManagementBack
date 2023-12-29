import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Customer } from './customer.entity';
import { Repository } from 'typeorm';
import { NewCustomerDto } from './dtos/new-customer.dto';
import { UserService } from '../user/user.service';
import { Management } from '../management/management.entity';
import { ContactType } from '../management/enums/contact-type.enum';
import { NewManagementDto } from '../management/dtos/new-management.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly userService: UserService,
    @InjectRepository(Management)
    private readonly managementRepository: Repository<Management>,
  ) {}

  public async findAll(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  public async findByCC(identification: string): Promise<Customer> {
    const customer = await this.customerRepository.findOne({
      where: { identification: identification },
      relations: {
        user: true,
        managements: true,
      },
      order: {
        managements: {
          id: 'DESC',
        },
      },
    });

    if (!customer)
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);

    return customer;
  }

  public async createNewCustomer(
    customer: NewCustomerDto,
    userCc: string,
  ): Promise<Customer> {
    const user = await this.userService.findByCC(userCc);

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const newCustomer = this.customerRepository.create({
      ...customer,
      user: user,
    });

    const management = await this.addFirstManagement(newCustomer);

    newCustomer.managements = [management];
    return this.customerRepository.save(newCustomer);
  }

  private async addFirstManagement(customer: Customer) {
    const management = this.managementRepository.create({
      customer: customer,
    });

    await management.save();
    return management;
  }

  public async addManagement(
    identification: string,
    newManagementDto: NewManagementDto,
  ): Promise<Management> {
    const customer = await this.findByCC(identification);
    const newManagement = this.managementRepository.create({
      ...newManagementDto,
      customer: customer,
    });
    return this.managementRepository.save(newManagement);
  }
}
