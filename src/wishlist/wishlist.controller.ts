import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

@Controller('wishlist')
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
