import { SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import {Server, Client} from 'socket.io';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@WebSocketGateway(3001, {namespace: 'events'})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  findAll(client: Client, data: any): Observable<WsResponse<any>> {
    console.log(data);
    return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  }
}
