import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderHelper {
  constructor() {}

  async calculateTotal(createOrderDto: CreateOrderDto) {
    for (const orderItem of createOrderDto.OrderItems) {
      createOrderDto.totalAmount += orderItem.quantity * orderItem.unitPrice;
    }
  }
}
