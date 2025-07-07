import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './user-creation.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
