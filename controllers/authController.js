import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from '../errors/index.js'
import User from '../model/User.js'
import { StatusCodes } from 'http-status-codes'

const register = async (req, res) => {
  console.log(req.body)

  const user = await User.create({ ...req.body })
  const tokenUser = {
    name: user.name,
    userId: user._id,
    role: user.role,
    position: user.position,
  }
  const token = user.createJWT(tokenUser)
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
      token,
    },
  })
}

const login = async (req, res) => {
  console.log(req.body)

  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }
  const user = await User.findOne({ email }).select('+ password')
  if (!user) {
    throw new UnauthenticatedError('No user found')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Password is incorrect')
  }

  // compare password
  const tokenUser = {
    name: user.name,
    userId: user._id,
    role: user.role,
    position: user.position,
  }
  const token = user.createJWT(tokenUser)
  res.status(StatusCodes.OK).json({ user, token })
}

export { login, register }
