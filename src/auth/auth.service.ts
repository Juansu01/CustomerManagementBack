import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus } from '@nestjs/common';
import { JsonWebTokenError } from 'jsonwebtoken';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { JwtPayload } from './types/jwt-payload.type';
import { UserRequest } from '../shared/types/user-request.type';
import { User } from '../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(cc: string, password: string): Promise<Object> {
    const user = await this.userRepository.findOne({
      where: { identification: cc },
      select: ['identification', 'password', 'role'],
    });

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword)
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

    const payload = { cc: user.identification, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      role: user.role,
      identification: user.identification,
    };
  }

  async validateUser(token: string, request: UserRequest): Promise<boolean> {
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token);
      request.user = payload;

      return true;
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
      }
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public validateAdmin(token: string): boolean {
    const payload = this.jwtService.decode<JwtPayload>(token);
    return payload.role === 'admin';
  }
}
