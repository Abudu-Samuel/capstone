import { model, Schema } from 'mongoose';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    required: [true, 'Username is required'],
    minlength: [3, 'Username length is too short'],
    maxlength: [20, 'Username length is too long']
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, 'Email is required'],
    minlength: [3, 'Username length is too short']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password strength is not strong']
  }
});

UserSchema.methods.generateHashedPassord = password => hashSync(password, genSaltSync(8));
UserSchema.methods.validatePassword = (password, dbPassowrd) => compareSync(password, dbPassowrd);

export default model('User', UserSchema);
