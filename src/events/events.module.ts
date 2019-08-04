import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { eventProviders } from './events.providers';
import { EventService } from './services/event.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [EventsGateway, ...eventProviders, EventService],
})
export class EventsModule {
}
