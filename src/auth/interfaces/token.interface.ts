import {Document} from 'mongoose';

export interface TokenInterface extends Document {
  readonly id: string;
  readonly userId: string;
  readonly token: string;
}
