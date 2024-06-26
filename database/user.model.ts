import { Schema, models, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  joinedAt: Date;
}

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  joinedAt: { type: Date, default: Date.now },
});

const User = models.User || model("User", UserSchema);

export default User;
