import mongoose from 'mongoose';

const examHistorySchema = new mongoose.Schema(
  {
    point: { type: Array },
    fullexamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'fullexam',
      required: true
    },
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'account',
      required: true
    }
  },
  { timestamps: true }
);

export const examHistory = mongoose.model('examHistory', examHistorySchema);
