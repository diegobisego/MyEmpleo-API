import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { validate } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      // Validar el DTO usando class-validator
      const validationErrors = await validate(createUserDto);
      if (validationErrors.length > 0) {
        throw new BadRequestException(validationErrors);
      }

      // Crear una instancia de Lote con los datos del DTO
      const userToCreate = this.userRepository.create(createUserDto);

      // Guardar el lote en la base de datos
      const createdUser = await this.userRepository.save(userToCreate);

      if (createdUser) {
        return createdUser;
      } else {
        throw new BadRequestException('Error al intentar crear el Usuario');
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
