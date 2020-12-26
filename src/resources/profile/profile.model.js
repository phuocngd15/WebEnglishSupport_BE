import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'account',
      required: true
    },
    fullname: {
      type: String,
      required: true,
      trim: true
    },
    gender: {
      type: String,
      default: ''
    },
    phone: {
      type: String,
      default: ''
    },
    level: {
      type: String,
      default: 'Cấp độ 1'
    },
    state: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export const Profile = mongoose.model('profile', profileSchema);
