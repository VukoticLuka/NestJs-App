import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { UserModal } from 'src/users/entities/user.entity';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DB_NAME || 'test_db',
      entities: [UserModal],
      synchronize: true,
      logging: process.env.TYPE === 'DEV' ? true : false,
    }),
  ],
})
export class DatabaseModule {}
