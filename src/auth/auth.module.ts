import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports : [UserModule, PassportModule, ConfigModule,
    JwtModule.registerAsync({
      imports : [ConfigModule],
      useFactory : async (configService : ConfigService) =>({
        secret : configService.get<string>('JWT_SECRET'),
        signOptions:{
          expiresIn : '30d'
        }
      }),
      inject : [ConfigService]
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports : [AuthService, JwtModule]
})
export class AuthModule {}
