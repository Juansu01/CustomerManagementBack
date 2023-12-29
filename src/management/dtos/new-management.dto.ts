import { IsEnum, IsString, IsOptional, IsDateString } from 'class-validator';

import { ContactType } from '../enums/contact-type.enum';
import { CustomerStatus } from '../enums/client-status.enum';

export class NewManagementDto {
  @IsEnum(ContactType)
  contactType: ContactType;

  @IsEnum(CustomerStatus)
  customerStatus: CustomerStatus;

  @IsString()
  @IsOptional()
  observations: string;

  @IsDateString()
  nextContact: string;
}
