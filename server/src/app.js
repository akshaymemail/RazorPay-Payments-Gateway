import env from 'dotenv'
env.config()
import express from 'express'
import Orders from './api/routes/orders/orders.js'
import cors from 'cors'

// creating express app
const app = express()

// port
const PORT = process.env.PORT || 5000

// middleware
app.use(cors())
app.use(express.json())

// routes
app.use('/apiv1', Orders)

// home route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is up and running...' })
})

// listen to the server
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`)
})
