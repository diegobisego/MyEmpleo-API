import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { saveProfileImage } from '../utils/functions/savePhoto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto,profileImageBuffer?: Buffer): Promise<User> {

    const userToCreate = this.userRepository.create(createUserDto);

    if (profileImageBuffer) {
      // Procesar y guardar la imagen según tus necesidades
      const imagePath = saveProfileImage(profileImageBuffer, userToCreate.id);
      userToCreate.profileImage = imagePath;
    }

    return await this.userRepository.save(userToCreate);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({ where: { id } });

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Actualizar campos del usuario según el DTO
    this.userRepository.merge(existingUser, updateUserDto);

    return await this.userRepository.save(existingUser);
  }

  async getUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }
}
