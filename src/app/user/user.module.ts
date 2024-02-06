import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

// entidades
import { User } from './entities/user.entity';
import { Job } from './entities/job.entity';
import { TaxCondicion } from './entities/taxCondition.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User, Job, TaxCondicion])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
