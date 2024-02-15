import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConstants } from '../auth/constants';
import { JwtModule } from '@nestjs/jwt';

// entidades
import { User } from './entities/user.entity';
import { Job } from './entities/job.entity';
import { TaxCondicion } from './entities/taxCondition.entity';
import { Auth } from './entities/auth.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Job, TaxCondicion, Auth]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
