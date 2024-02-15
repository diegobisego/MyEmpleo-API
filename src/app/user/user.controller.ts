import { Controller, Post, Body, HttpException, HttpStatus, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs/promises';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAuthDto } from './dto/create-auth.dto';

@ApiTags('Usuarios')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}



  // CREACION DE USUARIO
  @ApiOperation({
    summary: 'Creacion de Usuarios',
    description: 'Crea un usuario en la base de datos',
  })
  @ApiResponse({ status: 201, description: 'Usuario creado con éxito' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  @Post('postUser')
  @UseInterceptors(FileInterceptor('file'))
  async postUser(@Body() createUserDto: CreateUserDto, @UploadedFile() file: Express.Multer.File): Promise<User> {
    try {
      let profileImageBuffer: Buffer | undefined;

      if (file) {
        // Lee el contenido del archivo y conviértelo a Buffer
        profileImageBuffer = await fs.readFile(file.path);
      }

      const user = await this.userService.createUser(createUserDto, profileImageBuffer);
      return user;
    } catch (error) {
      throw new HttpException(
        `Error al intentar crear el usuario: ${
          error.message || 'Error interno del servidor'
        }`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }


// REGISTRO DE USUARIO
  @ApiOperation({
    summary: 'Registro de Usuarios',
    description: 'Registro del usuario, se devolvera el id del usuario y un token asociado',
  })
  @ApiResponse({ status: 201, description: 'Usuario creado con éxito' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  @Post('registerUser')
  async postRegisterUser(@Body() createAuthDto: CreateAuthDto): Promise<any> {
    try {
      const register = await this.userService.registerUser(createAuthDto)
      return register;
    } catch (error) {
      throw new HttpException(
        `Error al intentar registrar el usuario: ${
          error.message || 'Error interno del servidor'
        }`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }







}
