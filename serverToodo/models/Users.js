import mongoose from 'mongoose';

const UserShema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model('User', UserShema);
