import 'express-async-errors'
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './db/connect.js'
import authRouter from './routes/authRouter.js'
import cors from 'cors'

import notFoundMiddleware from './middleware/not-found.js'
import errorHandler from './middleware/error-handler.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1/auth', authRouter)

app.get('/api/v1/test', (req, res) => {
  res.json({ msg: 'test' })
})

app.use(notFoundMiddleware)
app.use(errorHandler)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
