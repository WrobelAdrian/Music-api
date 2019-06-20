import { USER_DB_TOKEN, USER_TOKEN } from '../_common/constants';
import {Connection} from 'mongoose';
import { UserSchema } from './schema/user.schema';

export const userProviders = [
  {
    provide: USER_TOKEN,
    useFactory: (connection: Connection) => connection.model('User', UserSchema),
    inject: [USER_DB_TOKEN],
  },
];
