import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'Please provide firstname'],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 5,
    select: false,
  },
  lastname: {
    type: String,
    required: [true, 'Please provide lastname'],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email',
    },
    unique: true,
  },
  status: {
    required: true,
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    enum: ['privatkunde', 'geschäftskunde'],
    default: 'privatkunde',
  },
})
UserSchema.pre('save', async function () {
  // console.log(this.modifiedPaths())
  if (!this.isModified('password')) return
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function (tokenUser) {
  return jwt.sign(
    { userId: tokenUser.userId, role: tokenUser.role, name: tokenUser.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  )
}

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}
export default mongoose.model('User', UserSchema)
