import mongoose, { Schema } from 'mongoose';

const examSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: 'No name',
      required: true,
      trim: true // chuan hoa title
    },
    type: {
      type: String,
      required: true
    },
    pdf_path: {
      type: String,
      required: true
    },
    audio_path: {
      type: String,
      default: 'Chưa cập nhật'
    },
    full_exam: {
      type: Schema.Types.ObjectId,
      ref: 'full-exam',
      required:true
    },
    duration: {
      type: String
    },
    dapan: {type:Array},
    state: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export const Exam = mongoose.model('exam', examSchema);
