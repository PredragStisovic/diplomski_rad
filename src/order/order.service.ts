import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './order.repository';
import { FilterDto } from 'src/dto/filter.dto';
import { OrderHelper } from './order.helper';
import { OrderItemForCreate } from './types/orderItemForCreate';
import { SendgridService } from 'src/sendgrid/sendgrid.service';
import { generateOrderEmail } from 'src/util/generate-email';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly helper: OrderHelper,
    private readonly sendgridService: SendgridService,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    await this.helper.calculateTotal(createOrderDto);
    const createdOrder = await this.orderRepository.createOrder(createOrderDto);

    const generatedHtml = generateOrderEmail(createdOrder);

    if (createOrderDto.sendTo) {
      await this.sendgridService.sendEmail(
        createOrderDto.sendTo,
        'Uspešno kreirana porudžbina',
        'Detalji porudžbine:',
        generatedHtml,
      );
    }
    return createdOrder;
  }

  findAll() {
    return this.orderRepository.findAll();
  }

  findOne(id: number) {
    return this.orderRepository.findById(id);
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.orderRepository.update(id, updateOrderDto);
  }

  remove(id: number) {
    return this.orderRepository.delete(id);
  }

  async filterAll(filter: FilterDto) {
    return this.orderRepository.executeTransaction(async (transaction) => {
      const data = await this.orderRepository.filterOrders(filter, transaction);
      const totalCount = await this.orderRepository.countOrders(
        filter,
        transaction,
      );

      return { data, totalCount };
    });
  }
}
