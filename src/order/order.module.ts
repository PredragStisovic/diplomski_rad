import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OrderFilterProcessor } from './order-filter-processor';
import { OrderHelper } from './order.helper';
import { SendgridService } from 'src/sendgrid/sendgrid.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [PrismaModule],
  controllers: [OrderController],
  providers: [
    OrderService,
    OrderRepository,
    OrderFilterProcessor,
    OrderHelper,
    SendgridService,
    ConfigService,
  ],
})
export class OrderModule {}
