import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
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

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message : "Password must be at least 8 characters"})
  password: string;

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
