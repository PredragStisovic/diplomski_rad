import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { WishlistRepository } from './wishlist.repository';
import { WishlistValidator } from './wishlist.validator';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [WishlistController],
  providers: [WishlistService, WishlistRepository, WishlistValidator],
})
export class WishlistModule {}
