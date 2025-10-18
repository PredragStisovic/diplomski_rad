import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseRepository } from 'src/base-classes/base-repository';
import { PrismaServiceTransaction } from 'src/types/prisma-transaction';

@Injectable()
export class UsersRepository extends BaseRepository {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  async createUser(
    createUserDto: CreateUserDto,
    tx: PrismaServiceTransaction = this.prisma,
  ): Promise<User> {
    return tx.user.create({ data: createUserDto });
  }

  async createManyUsers(
    createUserDto: CreateUserDto[],
    tx: PrismaServiceTransaction = this.prisma,
  ): Promise<Prisma.BatchPayload> {
    return tx.user.createMany({ data: createUserDto });
  }

  async getUser(
    params: {
      where: Prisma.UserWhereUniqueInput;
      select?: Prisma.UserSelect;
    },
    tx: PrismaServiceTransaction = this.prisma,
  ): Promise<User | null> {
    return tx.user.findUnique(params);
  }

  async getUsers(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.UserWhereUniqueInput;
      where?: Prisma.UserWhereInput;
      orderBy?: Prisma.UserOrderByWithRelationInput;
    },
    tx: PrismaServiceTransaction = this.prisma,
  ): Promise<User[]> {
    return tx.user.findMany(params);
  }

  async updateUser(
    params: {
      where: Prisma.UserWhereUniqueInput;
      data: UpdateUserDto;
    },
    tx: PrismaServiceTransaction = this.prisma,
  ): Promise<User> {
    return tx.user.update(params);
  }

  async deleteUser(
    params: {
      where: Prisma.UserWhereUniqueInput;
    },
    tx: PrismaServiceTransaction = this.prisma,
  ): Promise<User> {
    return tx.user.delete(params);
  }

  async getUserByEmail(email: string, transaction?: PrismaServiceTransaction) {
    return await this.prisma.user.findFirst({ where: { email } });
  }

  async getUserById(id: number, transaction?: PrismaServiceTransaction) {
    return this.getUser(
      {
        where: { id },
      },
      transaction,
    );
  }

  async updateUserById(
    id: number,
    updateUserDto: UpdateUserDto,
    transaction?: PrismaServiceTransaction,
  ) {
    return this.updateUser(
      {
        where: { id },
        data: updateUserDto,
      },
      transaction,
    );
  }

  async deleteUserById(id: number, transaction?: PrismaServiceTransaction) {
    return this.deleteUser(
      {
        where: { id },
      },
      transaction,
    );
  }
}
