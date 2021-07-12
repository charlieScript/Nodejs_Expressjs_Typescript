import mongoose, { HookNextFunction } from "mongoose";
import bcrypt from 'bcrypt';
// 

// The model interfce it shows the shape the of the schema and the model
export interface UserInterface extends mongoose.Document {
  name: string;
  password: string;
  comparePassword(password: string): Promise<boolean>; // usermethod should return a promise with true/false
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre<UserInterface>('save', function (next: HookNextFunction) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
  next();
});

userSchema.methods.comparePassword = function (password: string) {
  const user = this as UserInterface;

  return bcrypt.compare(password, user.password);
};

const User = mongoose.model<UserInterface>('User', userSchema)

export default User
