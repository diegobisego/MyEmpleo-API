import { Controller, Post, Body, HttpException, HttpStatus, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('postUser')
  @UseInterceptors(FileInterceptor('file'))
  async postUser( @Body() createUserDto: CreateUserDto,@UploadedFile() file: Express.Multer.File): Promise<User> {
    try {
      const user = await this.userService.createUser(file, createUserDto);
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
