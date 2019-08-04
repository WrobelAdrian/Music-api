import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import {Server, Client} from 'socket.io';
import { AppLogger } from '../app.logger';
import { EventModelDto } from './dto/event-model.dto';
import { EventService } from './services/event.service';
import { Inject } from '@nestjs/common';
import { EVENT_TOKEN } from '../_common/constants';
import { Model } from 'mongoose';
import { EventInterface as EventEntity } from './interfaces/event.interface';

@WebSocketGateway(3005, {namespace: 'events'})
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger = new AppLogger(EventsGateway.name);

  constructor(private eventService: EventService,
              @Inject(EVENT_TOKEN) private readonly eventModel: Model<EventEntity>) {
    this.eventListener();
  }

  @WebSocketServer()
  server: Server;

  afterInit(server: Server): void {
    this.logger.log('[afterInit] Websocket initialized.');
  }

  handleConnection(client: Client): void {
    this.logger.log(`[handleConnection] Client connected: ${client.id}`);
  }

  handleDisconnect(client: Client): void {
    this.logger.log(`[handleDisconnect] Client disconnect: ${client.id}.`);
  }

  @SubscribeMessage('event-create')
  createEvent(client: Client, event: EventModelDto): {[key: string]: any} {
    return {event: 'events', data: this.eventService.create(event)};
  }

  @SubscribeMessage('identity')
  async identity(client: Client, data: number): Promise<number> {
    return data;
  }

  public eventListener() {
    const changeStream = this.eventModel.watch();
    changeStream.on('change', data => this.server.emit('events', data));
  }
}
