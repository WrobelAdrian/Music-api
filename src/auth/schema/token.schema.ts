import * as mongoose from 'mongoose';

export const TokenSchema = new mongoose.Schema({
  id: String,
  userId: String,
  token: String,
});
