import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/user-update.dto';
import { CreateUserDto } from './dto/user-creation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModal } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserModal)
    private readonly userRepository: Repository<UserModal>,
  ) {}
//   private users = [
//     {
//       id: 1,
//       name: 'Luka',
//       role: 'ENGINEER',
//     },
//     {
//       id: 2,
//       name: 'Marija',
//       role: 'ADMIN',
//     },
//     {
//       id: 3,
//       name: 'Milos',
//       role: 'USER',
//     },
//   ];

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async create(user: CreateUserDto) {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async delete(id: number) {
    const user = await this.findOne(id);

    if(!user){
        throw new NotFoundException(`User with id=${id} not found`)
    }

    await this.userRepository.delete({ id });
    return user; 
    
  }

  async update(
    id: number,
    updatedUser: UpdateUserDto,
  ) {
    const user = await this.userRepository.preload({
        id,
        ...updatedUser
    });

    if(!user){
        throw new NotFoundException(`User with id=${id} not found`);
    }

    return await this.userRepository.save(user);
  }
    
}
