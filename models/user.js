import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name!"],
    },
    email: {
      type: String,
      required: [true, "Please add a name!"],
    },
    password: {
      type: String,
      required: [true, "Please add a name!"],
    }
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model('User',userSchema)
export default User