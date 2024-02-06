import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('Usuarios')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // CREAR UN USUARIO

  @ApiOperation({
    summary: 'Creacion del user',
    description: 'Crea un usuario en la base de datos',
  })
  @ApiResponse({ status: 201, description: 'Usuario creado con éxito' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  @Post('postUser')
  async postUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.userService.createUser(createUserDto);
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
