import mongoose from 'mongoose'

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    }
  },
  { timestamps: true }
)

cardSchema.index({ name: 1 }, { unique: true })

export const Card = mongoose.model('card', cardSchema)
