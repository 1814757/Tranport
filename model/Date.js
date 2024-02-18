import mongoose from 'mongoose'

const DateSchem = new mongoose.Schema(
  {
    date: {
      required: [true, 'Please provide date'],
      type: Date,
      default: Date.now(),
    },
    time: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

export default mongoose.model('Moving', DateSchem)
