import { Module } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItemController } from './order-item.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OrderItemRepository } from './order-item.repository';

@Module({
  imports: [PrismaModule],
  controllers: [OrderItemController],
  providers: [OrderItemService, OrderItemRepository],
})
export class OrderItemModule {}
