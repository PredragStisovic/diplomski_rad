import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/base-classes/base-repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';

@Injectable()
export class WishlistRepository extends BaseRepository {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  create(createWishlistDto: CreateWishlistDto) {
    return this.prisma.wishlist.create({
      data: {
        userId: createWishlistDto.userId,
        recordId: createWishlistDto.recordId,
      },
    });
  }

  findById(userId: number, recordId: number) {
    return this.prisma.wishlist.findFirst({
      where: {
        userId,
        recordId,
      },
    });
  }

  findAllForUser(userId: number) {
    return this.prisma.wishlist.findMany({
      where: {
        userId,
      },
      include: {
        Record: true,
      },
    });
  }

  delete(userId: number, recordId: number) {
    return this.prisma.wishlist.delete({
      where: {
        userId_recordId: { userId, recordId },
      },
    });
  }
}
