import mongoose from 'mongoose';

const historyExamRecord = new mongoose.Schema(
  {
    score: { type: Number },
    /*  fullExamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'fullexam',
      required: true
    }, */
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'account',
      required: true
    },
    fullExamId: {
      type: String
    }
  },
  { timestamps: true }
);

export const HistoryExamRecord = mongoose.model(
  'HistoryExamRecord',
  historyExamRecord
);
