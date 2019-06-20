import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { userProviders } from './user.providers';
import { DatabaseModule } from '../database/database.module';
import { phoneNumberProviders } from '../_decorators/phone-decorator.providers';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, ...userProviders, ...phoneNumberProviders],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
