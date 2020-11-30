import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    }
  },
  { timestamps: true }
);

accountSchema.index({ name: 1 }, { unique: true });

export const Account = mongoose.model('Account', accountSchema);
