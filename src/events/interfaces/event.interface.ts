import {Document} from 'mongoose';

export interface EventInterface extends Document {
  readonly id: string;
  readonly title: string;
  readonly date: string;
  readonly description: string;
  readonly type: string;
  readonly createdAt: string;
}
