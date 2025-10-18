import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/base-classes/base-repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaServiceTransaction } from 'src/types/prisma-transaction';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';

@Injectable()
export class OrderItemRepository extends BaseRepository {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  async createOrderItem(
    createOrderItemDto: CreateOrderItemDto,
    tx: PrismaServiceTransaction = this.prisma,
  ) {
    return tx.orderItem.create({
      data: createOrderItemDto,
    });
  }

  findAllByOrderId(orderId: number) {
    return this.prisma.orderItem.findMany({
      where: {
        orderId,
      },
    });
  }

  update(
    orderId: number,
    recordId: number,
    updateOrderItemDto: UpdateOrderItemDto,
  ) {
    return this.prisma.orderItem.update({
      where: { recordId_orderId: { orderId, recordId } },
      data: updateOrderItemDto,
    });
  }

  delete(orderId: number, recordId: number) {
    return this.prisma.orderItem.delete({
      where: { recordId_orderId: { orderId, recordId } },
    });
  }
}
