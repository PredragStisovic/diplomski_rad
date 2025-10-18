import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/base-classes/base-repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaServiceTransaction } from 'src/types/prisma-transaction';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from '@prisma/client';
import { FilterDto } from 'src/dto/filter.dto';
import { OrderFilterProcessor } from './order-filter-processor';
import { OrderItemForCreate } from './types/orderItemForCreate';

@Injectable()
export class OrderRepository extends BaseRepository {
  constructor(
    prisma: PrismaService,
    private readonly filterProcessor: OrderFilterProcessor,
  ) {
    super(prisma);
  }

  async createOrder(
    createOrderDto: CreateOrderDto,
    tx: PrismaServiceTransaction = this.prisma,
  ) {
    return tx.order.create({
      data: {
        totalAmount: createOrderDto.totalAmount,
        status: createOrderDto.status,
        city: createOrderDto.city,
        postalCode: createOrderDto.postalCode,
        street: createOrderDto.street,
        streetNumber: createOrderDto.streetNumber,
        User: {
          connect: { id: createOrderDto.userId },
        },
        OrderItems: {
          create: createOrderDto.OrderItems.map((item) => ({
            recordId: item.recordId,
            unitPrice: item.unitPrice,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        OrderItems: {
          include: {
            Record: true,
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.order.findMany({
      include: {
        OrderItems: true,
      },
    });
  }

  findById(id: number) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        OrderItems: {
          include: {
            Record: true,
          },
        },
      },
    });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.prisma.order.update({
      where: { id },
      data: {},
    });
  }

  delete(id: number) {
    return this.prisma.order.delete({
      where: { id },
    });
  }

  async filterOrders(
    filter: FilterDto,
    tx: PrismaServiceTransaction = this.prisma,
  ): Promise<Order[]> {
    const query = await this.filterProcessor.generateQuery(filter);
    return tx.order.findMany(query);
  }

  async countOrders(
    filter: FilterDto,
    tx: PrismaServiceTransaction = this.prisma,
  ): Promise<number> {
    const query = await this.filterProcessor.generateQuery(filter);
    delete query.take;
    delete query.skip;
    delete query.include;
    return tx.order.count(query);
  }
}
