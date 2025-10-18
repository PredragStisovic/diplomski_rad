import { RoleEnum } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  refreshToken = '';

  @IsNotEmpty()
  dateOfBirth: Date;

  @IsNotEmpty()
  role: RoleEnum;
}
