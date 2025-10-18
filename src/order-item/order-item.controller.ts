import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';

@Controller('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post()
  create(@Body() createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemService.create(createOrderItemDto);
  }

  @Get(':orderId')
  findAll(@Param('orderId') orderId: number) {
    return this.orderItemService.findAllByOrderId(orderId);
  }

  @Patch(':orderId/:recordId')
  update(
    @Param('orderId') orderId: string,
    @Param('recordId') recordId: string,
    @Body() updateOrderItemDto: UpdateOrderItemDto,
  ) {
    return this.orderItemService.update(
      +orderId,
      +recordId,
      updateOrderItemDto,
    );
  }

  @Delete(':id')
  remove(
    @Param('orderId') orderId: string,
    @Param('recordId') recordId: string,
  ) {
    return this.orderItemService.remove(+orderId, +recordId);
  }
}
