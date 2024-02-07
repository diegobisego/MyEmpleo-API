import { Injectable, BadRequestException, UploadedFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { saveProfileImage } from '../utils/functions/savePhoto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(@UploadedFile() file: Express.Multer.File, createUserDto: CreateUserDto) {
    try {
      // Validar el DTO usando class-validator
      const validationErrors = await validate(createUserDto);
      if (validationErrors.length > 0) {
        throw new BadRequestException(validationErrors);
      }

      // Crear una instancia de User con los datos del DTO
      const userToCreate = this.userRepository.create(createUserDto);

      // Verificar si la imagen está presente en la carga de archivos y guardarla
      if (file) {
        // Aquí puedes manejar la carga del archivo con Multer
        // y guardar la ruta en tu directorio o base de datos
        const imagePath = saveProfileImage(file.buffer, userToCreate.id);
        // Guardar la ruta de la imagen en el campo de la base de datos
        userToCreate.profileImage = imagePath;
      }

      // Guardar el usuario en la base de datos
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
