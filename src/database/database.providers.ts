import { config } from '../config';
import { EVENT_DB_TOKEN, TOKEN_DB_TOKEN, USER_DB_TOKEN } from '../_common/constants';
import * as mongoose from 'mongoose';
import { Connection } from 'mongoose';

export const databaseProviders = [
  {
    provide: USER_DB_TOKEN,
    useFactory: async (): Promise<Connection> =>
      await mongoose.createConnection(config.mongo.uri, {useNewUrlParser: true}),
  },
  {
    provide: TOKEN_DB_TOKEN,
    useFactory: async (): Promise<Connection> =>
      await mongoose.createConnection(config.mongo.uri, {useNewUrlParser: true}),
  },
  {
    provide: EVENT_DB_TOKEN,
    useFactory: async (): Promise<Connection> =>
      await mongoose.createConnection(config.mongo.uri, {useNewUrlParser: true}),
  },
];
