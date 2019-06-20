import { Connection } from 'mongoose';
import { TokenSchema } from './schema/token.schema';
import { TOKEN_DB_TOKEN, TOKEN_TOKEN } from '../_common/constants';

export const authProviders = [
  {
    provide: TOKEN_TOKEN,
    useFactory: (connection: Connection) => connection.model('Token', TokenSchema),
    inject: [TOKEN_DB_TOKEN],
  },
];
