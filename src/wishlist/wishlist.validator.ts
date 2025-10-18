import { Injectable } from '@nestjs/common';
import { WishlistRepository } from './wishlist.repository';

@Injectable()
export class WishlistValidator {
  constructor(private readonly repository: WishlistRepository) {}

  async wishlistRecordExists(
    userId: number,
    recordId: number,
  ): Promise<boolean> {
    const userWithId = await this.repository.findById(userId, recordId);

    return userWithId != null;
  }
}
