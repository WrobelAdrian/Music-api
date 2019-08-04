import { EVENT_TOKEN, USER_DB_TOKEN } from '../_common/constants';
import {Connection} from 'mongoose';
import { EventSchema } from './schema/events.schema';

export const eventProviders = [
  {
    provide: EVENT_TOKEN,
    useFactory: (connection: Connection) => connection.model('Event', EventSchema),
    inject: [USER_DB_TOKEN],
  },
];
