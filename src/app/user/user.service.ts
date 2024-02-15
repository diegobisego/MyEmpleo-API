import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { saveProfileImage } from '../utils/functions/savePhoto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Auth } from './entities/auth.entity';
import { JwtService } from '@nestjs/jwt';
import * as validator from 'validator';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    private jwtService: JwtService,
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
    profileImageBuffer?: Buffer,
  ): Promise<User> {
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

  async registerUser(createAuthDto: CreateAuthDto): Promise<any> {
    try {
      const { user } = createAuthDto;

      const isValidEmail = validator.isEmail(user);

      if (!isValidEmail) {
        return {
          stats: false,
          payload: 'correo electronico no valido',
        };
      }

      const exist = await this.authRepository.findOne({ where: { user } });

      if (exist) {
        return {
          stats: false,
          payload: 'Usuario ya registrado, redirigir al login',
        };
      }

      const result = this.authRepository.create(createAuthDto);
      const saveUser = await this.authRepository.save(result);

      // Convertir a un objeto plano
      const plainUser = Object.assign({}, saveUser);
      return {
        access_token: await this.jwtService.signAsync(plainUser),
        idUser: saveUser.id
      };
    } catch (error) {
      console.error(error);
      return {
        stats: false,
        payload: `Error al intentar crear el usuario: ${error}`,
      };
    }
  }
}
