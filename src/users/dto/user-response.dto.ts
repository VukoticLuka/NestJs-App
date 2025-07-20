import { Exclude } from 'class-transformer';
import { CreateUserDto, Role } from './user-creation.dto';
import { OmitType } from '@nestjs/mapped-types';

export class UserResponseDto extends OmitType(CreateUserDto, ["password" as const]){
  @Exclude()
  password?: string;
}