import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { getDatabaseConfig } from 'src/config/dbConfig'; 

import appConfig from 'src/config/app.config';  
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer'; 


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Importa ConfigModule para manejar la configuración
      useFactory: getDatabaseConfig, // Usa la función de configuración de la base de datos
      inject: [ConfigService], // Inyecta ConfigService
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads', // directorio donde se guardarán las imágenes
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, file.fieldname + '-' + uniqueSuffix);
        },
      }),
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
