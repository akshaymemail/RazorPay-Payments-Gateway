import express from 'express'
import { createOrder } from '../../controllers/orders/orders.js'

const Orders = express.Router()

Orders.post('/order/create', createOrder)

export default Orders
