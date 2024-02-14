import { Controller, Post, Body, HttpException, HttpStatus, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs/promises';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuarios')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
}
