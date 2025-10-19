import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './user.repository';
import { UsersHelpers } from './users.helper';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { User } from '@prisma/client';
const bcrypt = require('bcrypt');

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private usersHelper: UsersHelpers,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (await this.usersHelper.userWithEmailExists(createUserDto.email)) {
      throw new HttpException(
        `User with email: ${createUserDto.email} already exists.`,
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    return this.usersRepository.createUser(createUserDto);
  }

  async findOne(id: number) {
    const user = await this.usersRepository.getUserById(id);

    if (!user) {
      throw new HttpException(
        `User with id: ${id} doesn't exists.`,
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  async findOneByEmail(email: string) {
    let user = await this.cacheManager.get<User | null>(email);
    if (!user) {
      user = await this.usersRepository.getUserByEmail(email);
      this.cacheManager.set(email, user);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (!(await this.usersHelper.userWithIdExists(id))) {
      throw new HttpException(
        `User with id: ${id} doesn't exists.`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.usersRepository.updateUserById(id, updateUserDto);
  }

  async remove(id: number) {
    if (!(await this.usersHelper.userWithIdExists(id))) {
      throw new HttpException(
        `User with id: ${id} doesn't exists.`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.usersRepository.deleteUserById(id);
  }
}
