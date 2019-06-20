import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    id: String,
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    token: String,
    password: String,
});
