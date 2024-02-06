import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsUrl, IsObject, IsNumber } from 'class-validator';


export class CreateUserDto {

    @IsOptional()
    @IsString({ message: 'El campo photo debe ser una cadena que representa una URL' })
    @IsUrl({}, { message: 'El campo photo debe ser una URL válida' })
    @ApiProperty({ type: 'string', format: 'binary' ,description: 'URL de la foto de perfil', example: 'https://tu-servidor.com/uploads/profile_1.jpg' })
    profileImage?: any;

    @IsString({ message: 'El campo userName debe ser un String' })
    @IsNotEmpty()
    @ApiProperty({description: 'Hace referencia a el nombre del usuario' , example:'UsuarioNombre 1' })
    userName:string

    @IsString({ message: 'El campo userLastName debe ser un String' })
    @IsNotEmpty()
    @ApiProperty({description: 'Hace referencia al apellido del usuario' , example:'UsuarioApellido 1' })
    userLastName:string

    @IsString({ message: 'El campo country debe ser un String' })
    @IsNotEmpty()
    @ApiProperty({description: 'Hace referencia al Pais del usuario' , example:'Argentina' })
    country:string


    @IsString({ message: 'El campo province debe ser un String' })
    @IsNotEmpty()
    @ApiProperty({description: 'Hace referencia a la provincia del usuario' , example:'Cordoba' })
    province:string


    @IsString({ message: 'El campo city debe ser un String' })
    @IsNotEmpty()
    @ApiProperty({description: 'Hace referencia a la ciudad del usuario' , example:'Villa Maria' })
    city:string

    @IsString({ message: 'El campo email debe ser un String' })
    @IsNotEmpty()
    @ApiProperty({description: 'Hace referencia al email del usuario' , example:'correo@mail.com' })
    email:string

    @IsString({ message: 'El campo dniCuit debe ser un String' })
    @IsNotEmpty()
    @ApiProperty({description: 'Hace referencia al dniCuit del usuario' , example:'20123456780' })
    dniCuit:string


    @IsObject({ message: 'El campo idJob debe ser un objeto' })
    @IsNotEmpty()
    @ApiProperty({ description:'Id de del Job, debe ser un objeto con id', example:'{"id": 2}' })
    idJob: object;

    @IsObject({ message: 'El campo idTaxCondition debe ser un objeto' })
    @IsNotEmpty()
    @ApiProperty({ description:'Id de de idTaxCondition, debe ser un Objeto con id', example:'{"id": 2}' })
    idTaxCondition: object;

    @IsNumber({maxDecimalPlaces: 2},{ message: 'El campo serviceCost debe ser un numero' })
    @IsNotEmpty()
    @ApiProperty({description: 'Hace referencia al costo del servicio por hora' , example:'1500' })
    serviceCost:number

    @IsOptional()
    @IsString({ message: 'El campo businessName debe ser un string' })
    @IsNotEmpty()
    @ApiProperty({description: 'Hace referencia al nombre de la empresa' , example:'La Empresa SRL' })
    businessName?:string

}
