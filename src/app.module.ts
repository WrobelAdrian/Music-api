import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RequestContextMiddleware } from './_middlewares/request-context.middleware';
import { EventsModule } from './events/events.module';
import { AppLogger } from './app.logger';
import { MusicModule } from './music/music.module';

@Module({
  imports: [UserModule, AuthModule, EventsModule, MusicModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  private logger = new AppLogger(AppModule.name);

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestContextMiddleware)
      .forRoutes({path: '*', method: RequestMethod.ALL});
  }
}
