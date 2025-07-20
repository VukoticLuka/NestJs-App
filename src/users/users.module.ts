import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModal } from './entities/user.entity';
import { PasswordHashService } from './password-hash.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserModal])],
  controllers: [UsersController],
  providers: [UsersService, PasswordHashService],
  exports: [PasswordHashService],
})
export class UsersModule {}
