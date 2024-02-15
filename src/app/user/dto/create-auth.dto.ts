import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsUrl, IsObject, IsNumber } from 'class-validator';


export class CreateAuthDto {


    @IsString({ message: 'El campo user debe ser un String' })
    @IsNotEmpty()
    @ApiProperty({description: 'Hace referencia al mail' , example:'correo@mail.com' })
    user:string

    @IsString({ message: 'El campo password debe ser un String' })
    @IsNotEmpty()
    @ApiProperty({description: 'Hace referencia al password del usuario' , example:'Password1' })
    password:string

}
