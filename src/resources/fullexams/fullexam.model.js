import mongoose, { Schema } from 'mongoose';

const fullExamSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true // chuan hoa title
    },
    description: {
      type: String,
      default: 'Chưa cập nhật'
    },
    state: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

// *    2. Options Object
// *       ref: Model name for Child collection
// *       localField: Key for reference id, stored on Child Doc, as named on Parent Doc.
// *       foreignField: Key name that holds localField value on Child Document
fullExamSchema.set('toObject', { virtuals: true });
fullExamSchema.set('toJSON', { virtuals: true });
fullExamSchema.virtual('examRef', {
  ref: 'exam', // model to use
  localField: '_id', // find in model, where localField
  foreignField: 'full_exam' // is equal to foreignField
});

export const fullExam = mongoose.model('full-exam', fullExamSchema);
