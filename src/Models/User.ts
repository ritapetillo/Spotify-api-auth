import mongoose from "mongoose";
import bcypt from "bcryptjs";
import { IUser } from "../services/interfaces/user";
const schema = mongoose.Schema;

// export interface UserInterface extends mongoose.Document {
//   email?: string;
//   password: string;
//   name?: string;
//   lastName?: string;
//   comparePassword(password: string): boolean;
// }

const UserSchema = new schema({
  spotify_id: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  profileUrl: {
    type: String,
  },
  photo: {
    type: String,
  },
  username: {
    type: String,
  },
  refreshToken:String
});

// UserSchema.pre<IUser>("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   const salt: string = await bcypt.genSalt();
//   this.password = await bcypt.hash(this.password, salt);
// });

// UserSchema.method("comparePassword", async function (password) {
//   const user: any = this;
//   const isValid = await bcypt.compare(password, user.password);
//   if (isValid) return true;
//   return false;
// });

// UserSchema.methods.toJSON = function () {
//   const user: any = this.toObject();
//   const { password, ...rest } = user;
//   return { ...rest };
// };
export default mongoose.model<IUser>("users", UserSchema);
