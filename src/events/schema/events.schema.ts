import * as mongoose from 'mongoose';

export const EventSchema = new mongoose.Schema({
  id: String,
  title: String,
  date: String,
  description: String,
  type: String,
  createdAt: {
    type: String,
    default: Date.now,
  },
});
