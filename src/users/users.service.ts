import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/user-update.dto';
import { CreateUserDto } from './dto/user-creation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModal } from './entities/user.entity';
import { Repository } from 'typeorm';
import { PasswordHashService } from './password-hash.service';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserModal)
    private readonly userRepository: Repository<UserModal>,
    private readonly passwordHashService: PasswordHashService
  ) {}

  async findAll(): Promise<UserModal[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<UserModal | null> {
    return this.userRepository.findOneBy({ id });
  }

  async create(user: CreateUserDto) {
    const hashedPassword = await this.passwordHashService.hashPassword(user.password);
    const newUser = this.userRepository.create({
      ...user,
      password: hashedPassword,
    });
    const savedUser = await this.userRepository.save(newUser);
    return plainToInstance(UserResponseDto, savedUser);
  }

  async delete(id: number): Promise<UserModal> {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with id=${id} not found`);
    }

    await this.userRepository.delete({ id });
    return user;
  }

  async update(id: number, updatedUser: UpdateUserDto): Promise<UserModal> {
    const user = await this.userRepository.preload({
      id,
      ...updatedUser,
    });

    if (!user) {
      throw new NotFoundException(`User with id=${id} not found`);
    }

    return await this.userRepository.save(user);
  }
}
