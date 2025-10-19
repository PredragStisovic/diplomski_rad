import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { RecordModule } from './record/record.module';
import { FileModule } from './file/file.module';
import { RecordFileModule } from './record-file/record-file.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';
import { SendgridService } from './sendgrid/sendgrid.service';
import { ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    AuthModule,
    RecordModule,
    FileModule,
    RecordFileModule,
    WishlistModule,
    OrderModule,
    OrderItemModule,
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, SendgridService, ConfigService],
})
export class AppModule {}
