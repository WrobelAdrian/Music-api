import {Document} from 'mongoose';

export interface UserInterface extends Document {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly phoneNumber: string;
  readonly password: string;
}
