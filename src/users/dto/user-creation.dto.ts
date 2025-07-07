import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export enum Role {
  ENGINEER = 'ENGINEER',
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsEmail({}, { message: 'Must be valid email' })
  email?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsEnum(Role, {
    message: 'Valid role required',
  })
  role: Role;
}
