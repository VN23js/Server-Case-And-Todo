import mongoose from 'mongoose';

const RouletteSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    caseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Case', // ← вот здесь Case
      required: true,
    },
    itemsOrder: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Items',
      },
    ],
    winIndex: {
      type: String,
      default: null,
    },
    isSpinned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('RouletteSession', RouletteSessionSchema);
