import { IsString, IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export class NewCustomerDto {
  @IsString()
  @IsNotEmpty()
  identification: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsNotEmpty()
  product: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsInt()
  @IsOptional()
  purchaseProjection: number;
}
