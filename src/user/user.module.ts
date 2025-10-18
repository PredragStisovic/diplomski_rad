import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersRepository } from './user.repository';
import { UsersHelpers } from './users.helper';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UsersService, UsersRepository, UsersHelpers],
  exports: [UsersService],
})
export class UserModule {}
