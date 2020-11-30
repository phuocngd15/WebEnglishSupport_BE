import mongoose from 'mongoose';

const cardSoundSchema = new mongoose.Schema(
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

cardSoundSchema.index({ name: 1 }, { unique: true });

export const Card = mongoose.model('cardSound', cardSoundSchema);
