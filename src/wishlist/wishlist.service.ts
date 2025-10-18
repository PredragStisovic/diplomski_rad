import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { WishlistRepository } from './wishlist.repository';
import { WishlistValidator } from './wishlist.validator';

@Injectable()
export class WishlistService {
  constructor(
    private readonly wishlistRepository: WishlistRepository,
    private readonly validator: WishlistValidator,
  ) {}
  create(createWishlistDto: CreateWishlistDto) {
    return this.wishlistRepository.create(createWishlistDto);
  }

  findAllForUser(userId: number) {
    return this.wishlistRepository.findAllForUser(userId);
  }

  remove(userId: number, recordId: number) {
    if (!this.validator.wishlistRecordExists(userId, recordId)) {
      throw new HttpException(
        'Ne postoji stavka u listi zelja',
        HttpStatus.NOT_FOUND,
      );
    }
    return this.wishlistRepository.delete(userId, recordId);
  }
}
