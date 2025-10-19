import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { JWTAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('wishlist')
@UseGuards(JWTAuthGuard)
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post()
  create(@Body() createWishlistDto: CreateWishlistDto) {
    return this.wishlistService.create(createWishlistDto);
  }

  @Get(':userId')
  findAllForUser(@Param('userId') userId: string) {
    return this.wishlistService.findAllForUser(+userId);
  }

  @Delete(':userId/:recordId')
  remove(@Param('userId') userId: string, @Param('recordId') recordId: string) {
    return this.wishlistService.remove(+userId, +recordId);
  }
}
