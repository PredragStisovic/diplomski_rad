import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderItemDto {
  @IsNotEmpty()
  @IsInt()
  recordId: number;

  @IsNotEmpty()
  @IsInt()
  orderId: number;

  @IsNotEmpty()
  @IsNumber()
  unitPrice: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
