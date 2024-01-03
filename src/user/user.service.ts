import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { Customer } from '../customer/customer.entity';
import { CustomerStatus } from '../management/enums/client-status.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    private dataSource: DataSource,
  ) {}

  async getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findByCC(cc: string): Promise<User> {
    return this.userRepository.findOne({ where: { identification: cc } });
  }

  async createNewUser(user: CreateUserDto): Promise<User> {
    const isCCTaken = await this.checkIfUserExists(user.cc);

    if (isCCTaken)
      throw new HttpException('CC already taken', HttpStatus.CONFLICT);

    const newUser = this.userRepository.create({
      ...user,
      identification: user.cc,
    });

    return this.userRepository.save(newUser);
  }

  async checkIfUserExists(cc: string): Promise<boolean> {
    const user = await this.findByCC(cc);
    return !!user;
  }

  async getAgenda(userIdentification: string): Promise<Customer[]> {
    const queryBuilder = this.dataSource.createQueryBuilder(
      Customer,
      'customer',
    );

    const customers = await queryBuilder
      .innerJoin('customer.user', 'user')
      .leftJoinAndSelect('customer.managements', 'management')
      .where('user.identification = :identification', {
        identification: userIdentification,
      })
      .andWhere((qb) => {
        const subQuery = qb
          .subQuery()
          .select('1')
          .from('management', 'm')
          .where('m.customer_id = customer.id')
          .andWhere('m.customer_status IN (:...statuses)', {
            statuses: [CustomerStatus.THIRD_CALL],
          })
          .getQuery();

        return `NOT EXISTS ${subQuery}`;
      })
      .getMany();

    return customers;
  }

  async getMyCustomers(userIdentification: string): Promise<Customer[]> {
    const user = await this.findByCC(userIdentification);

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const customers = await this.customerRepository.find({
      where: {
        user: {
          identification: userIdentification,
        },
      },
    });
    return customers;
  }

  async getMyInfo(userIdentification: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { identification: userIdentification },
      select: ['identification', 'role'],
    });

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return user;
  }
}
