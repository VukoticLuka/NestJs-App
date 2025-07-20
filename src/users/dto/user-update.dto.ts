import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './user-creation.dto';
import { Exclude } from 'class-transformer';

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ["password"] as const)) {
    @Exclude()
    password?: string;
}
