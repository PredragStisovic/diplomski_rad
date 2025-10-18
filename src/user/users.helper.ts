import { Injectable } from '@nestjs/common';
import { UsersRepository } from './user.repository';

@Injectable()
export class UsersHelpers {
  constructor(private readonly repository: UsersRepository) {}

  async userWithIdExists(id: number): Promise<boolean> {
    const userWithId = await this.repository.getUser({
      where: { id },
    });

    return userWithId != null;
  }

  async userWithEmailExists(email: string): Promise<boolean> {
    const userWithEmail = await this.repository.getUserByEmail(email);

    return userWithEmail != null;
  }
}
