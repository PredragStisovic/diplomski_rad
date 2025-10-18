import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateWishlistDto {
  @IsNotEmpty()
  @IsNumber()
  recordId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
