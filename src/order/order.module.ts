import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OrderFilterProcessor } from './order-filter-processor';
import { OrderHelper } from './order.helper';

@Module({
  imports: [PrismaModule],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository, OrderFilterProcessor, OrderHelper],
})
export class OrderModule {}
