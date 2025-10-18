import { Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItemRepository } from './order-item.repository';

@Injectable()
export class OrderItemService {
  constructor(private readonly orderItemRepository: OrderItemRepository) {}
  create(createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemRepository.createOrderItem(createOrderItemDto);
  }

  findAllByOrderId(orderId: number) {
    return this.orderItemRepository.findAllByOrderId(orderId);
  }

  update(
    orderId: number,
    recordId: number,
    updateOrderItemDto: UpdateOrderItemDto,
  ) {
    return this.orderItemRepository.update(
      orderId,
      recordId,
      updateOrderItemDto,
    );
  }

  remove(orderId: number, recordId: number) {
    return this.orderItemRepository.delete(orderId, recordId);
  }
}
