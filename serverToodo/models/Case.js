import mongoose from 'mongoose';
const CaseShema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: 100,
    },
    category: {
      type: String,
      default: 'new',
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Items',
      },
    ],
  },
  { timestamps: true }
);
export default mongoose.model('Case', CaseShema);
