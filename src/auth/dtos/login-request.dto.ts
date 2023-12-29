import { IsNotEmpty } from 'class-validator';

export class LoginRequestDto {
  @IsNotEmpty()
  cc: string;

  @IsNotEmpty()
  password: string;
}
