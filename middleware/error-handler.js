import { StatusCodes } from 'http-status-codes'
const errorHandler = (err, req, res, next) => {
  const defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong, try again later',
  }
  //Missing Field Error
  if (err.name === 'ValidationError') {
    defaultError.statusCode = StatusCodes.BAD_REQUEST
    //defaultError.msg = err.message
    defaultError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(', ')
  }
  //Unique Field Error
  if (err.code && err.code === 11000) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST
    defaultError.msg = `${Object.keys(err.keyValue)} field hat to be unique`
  }
  if (err.name === 'CastError') {
    defaultError.msg = `No item found with id : ${err.value}`
    defaultError.statusCode = 404
  }
  res.status(defaultError.statusCode).json({ msg: defaultError.msg })
}

export default errorHandler
