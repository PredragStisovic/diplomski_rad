import { StatusEnum } from '@prisma/client';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateOrderItemDto } from 'src/order-item/dto/create-order-item.dto';
import { OrderItemForCreate } from '../types/orderItemForCreate';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  totalAmount: number;

  @IsNotEmpty()
  status: StatusEnum;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsNumber()
  postalCode: number;

  @IsNotEmpty()
  @IsString()
  street: string;

  @IsNotEmpty()
  @IsString()
  streetNumber: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  OrderItems: OrderItemForCreate[];
}
