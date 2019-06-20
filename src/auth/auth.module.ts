import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { config } from '../config';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { authProviders } from './auth.providers';
import { AuthController } from './auth.controller';
import { phoneNumberProviders } from '../_decorators/phone-decorator.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    JwtModule.register({
      secret: config.jwt.secretKey,
      signOptions: {
          expiresIn: config.jwt.expiresIn,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, ...authProviders, ...phoneNumberProviders],
  exports: [AuthService],
})
export class AuthModule {}
