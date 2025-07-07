import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModal } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserModal])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
